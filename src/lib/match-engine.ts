export interface Candidate {
  id: string;
  nome: string;
  partido?: string;
  avatar?: string;
  color?: string;
  bio?: string;
}

export interface Question {
  id: string;
  candidato_origem_id?: string;
  texto: string;
  categoria: string;
  pesos_candidatos: Record<string, number>;
}

export interface QuizDatabase {
  candidatos: Candidate[];
  questoes: Question[];
}

export interface SetorScore {
  score: number;
  maxScore: number;
}

export interface CandidateMatchResult {
  candidateId: string;
  nome: string;
  partido?: string;
  match: number; // 0 a 100
  score: number;
  maxScore: number;
  concordancias: Array<{ id: string; texto: string; categoria: string }>;
  divergencias: Array<{ id: string; texto: string; categoria: string }>;
  neutros: number;
  setores: {
    economia: number; // 0 a 100
    seguranca: number; // 0 a 100
    trabalho: number; // 0 a 100
    sociedade: number; // 0 a 100
  };
}

function identificarSetor(categoria: string): "economia" | "seguranca" | "trabalho" | "sociedade" {
  const cat = (categoria || "").toLowerCase();
  if (/economia|tributa|imposto|finan|sistema financeiro|dívida|desestatiza|indústria|petróleo|bancário|fiscal/.test(cat)) {
    return "economia";
  }
  if (/segurança|crime|prisional|penal|políci|armamento|judiciário|stf|maioridade|fronteira|facç|feminicídio|corrupção|foro/.test(cat)) {
    return "seguranca";
  }
  if (/trabalho|salário|jornada|previdência|renda|habitação|mobilidade|transporte/.test(cat)) {
    return "trabalho";
  }
  return "sociedade";
}

/**
 * Motor de Cálculo de Afinidade (Match Político 2026)
 * 
 * Regra:
 * - Resposta do usuário: 1 (Concordo), -1 (Discordo), 0 (Pular/Neutro)
 * - score = Somatório de (Resposta * Peso do Candidato)
 * - maxScore = Somatório do valor absoluto dos pesos (nas questões respondidas com resposta != 0)
 * - Match % = ((score / maxScore) + 1) * 50
 * - Afinidade por eixo setorial (Economia, Segurança, Trabalho e Sociedade)
 */
export function calcularAfinidade(
  respostasUsuario: Record<string, number>,
  candidatos: Candidate[],
  questoes: Question[]
): CandidateMatchResult[] {
  const mapQuestoes = new Map<string, Question>();
  questoes.forEach(q => mapQuestoes.set(q.id, q));

  const placar: Record<string, {
    score: number;
    maxScore: number;
    concordancias: Array<{ id: string; texto: string; categoria: string }>;
    divergencias: Array<{ id: string; texto: string; categoria: string }>;
    neutros: number;
    setores: Record<"economia" | "seguranca" | "trabalho" | "sociedade", SetorScore>;
  }> = {};

  candidatos.forEach(c => {
    placar[c.id] = {
      score: 0,
      maxScore: 0,
      concordancias: [],
      divergencias: [],
      neutros: 0,
      setores: {
        economia: { score: 0, maxScore: 0 },
        seguranca: { score: 0, maxScore: 0 },
        trabalho: { score: 0, maxScore: 0 },
        sociedade: { score: 0, maxScore: 0 },
      }
    };
  });

  // Percorre todas as respostas fornecidas
  for (const [questaoId, resposta] of Object.entries(respostasUsuario)) {
    const questao = mapQuestoes.get(questaoId);
    if (!questao) continue;

    // Se o usuário pulou ou respondeu neutro (0), registra neutro e não pontua
    if (resposta === 0 || resposta === undefined || resposta === null) {
      candidatos.forEach(c => {
        if ((questao.pesos_candidatos[c.id] ?? 0) !== 0) {
          placar[c.id].neutros += 1;
        }
      });
      continue;
    }

    const setor = identificarSetor(questao.categoria);

    for (const c of candidatos) {
      const peso = questao.pesos_candidatos[c.id] ?? 0;
      if (peso === 0) continue; // Candidato sem posicionamento nessa proposta

      const ponto = resposta * peso;
      placar[c.id].score += ponto;
      placar[c.id].maxScore += Math.abs(peso);

      // Pontuação setorial
      placar[c.id].setores[setor].score += ponto;
      placar[c.id].setores[setor].maxScore += Math.abs(peso);

      if (ponto > 0) {
        placar[c.id].concordancias.push({
          id: questao.id,
          texto: questao.texto,
          categoria: questao.categoria
        });
      } else if (ponto < 0) {
        placar[c.id].divergencias.push({
          id: questao.id,
          texto: questao.texto,
          categoria: questao.categoria
        });
      }
    }
  }

  // Gera ranking final normalizado de 0% a 100%
  const ranking: CandidateMatchResult[] = candidatos.map(c => {
    const dados = placar[c.id];

    let matchPercent = 50; // Se não houve respostas sobre o candidato, neutralidade
    if (dados.maxScore > 0) {
      // Suavização estatística para proteção contra amostras minúsculas (< 8 pontos de peso)
      // Garante que nenhum candidato vença com 100% tendo apenas 1 ou 2 propostas respondidas
      const shrinkage = dados.maxScore < 8 ? (8 - dados.maxScore) * 0.25 : 0;
      const normalizer = dados.maxScore + shrinkage;
      const calculo = ((dados.score / normalizer) + 1) * 50;
      matchPercent = Math.min(100, Math.max(0, Math.round(calculo)));
    }

    const calcSetor = (s: SetorScore) => {
      if (s.maxScore > 0) {
        const shrinkage = s.maxScore < 3 ? (3 - s.maxScore) * 0.3 : 0;
        const val = ((s.score / (s.maxScore + shrinkage)) + 1) * 50;
        return Math.min(100, Math.max(0, Math.round(val)));
      }
      return matchPercent;
    };

    return {
      candidateId: c.id,
      nome: c.nome,
      partido: c.partido,
      match: matchPercent,
      score: dados.score,
      maxScore: dados.maxScore,
      concordancias: dados.concordancias,
      divergencias: dados.divergencias,
      neutros: dados.neutros,
      setores: {
        economia: calcSetor(dados.setores.economia),
        seguranca: calcSetor(dados.setores.seguranca),
        trabalho: calcSetor(dados.setores.trabalho),
        sociedade: calcSetor(dados.setores.sociedade),
      }
    };
  });

  // Ordena por maior afinidade percentual;
  // Desempate: mais concordâncias -> maior cobertura de temas (maxScore)
  return ranking.sort((a, b) => {
    if (b.match !== a.match) return b.match - a.match;
    if (b.concordancias.length !== a.concordancias.length) {
      return b.concordancias.length - a.concordancias.length;
    }
    return b.maxScore - a.maxScore;
  });
}
