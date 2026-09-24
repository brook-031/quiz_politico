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
 * Regra base:
 * - Resposta do usuário: 1 (Concordo), -1 (Discordo), 0 (Pular/Neutro)
 * - score = Somatório de (Resposta * Peso do Candidato)
 * - maxScore = Somatório do valor absoluto dos pesos (nas questões respondidas)
 * - Match % = ((score / maxScore) + 1) * 50
 *
 * Proteções anti-viés:
 * 1. Bias Correction: candidatos com pesos majoritariamente positivos recebem
 *    um desconto proporcional ao desequilíbrio entre somaPositivos e somaNegativos.
 *    Sem isso, um candidato com 80% de propostas "+1" e 20% "-1" ganha vantagem
 *    estrutural contra qualquer usuário que concorde com a maioria das propostas.
 * 2. Coverage Penalty: candidatos com baixa cobertura (< 30% das questões respondidas
 *    com posicionamento não-zero) recebem penalidade de até 8pp para evitar inflação
 *    artificial pelo efeito do shrinkage.
 * 3. Shrinkage: amostras minúsculas (< 8 pontos de peso total) são suavizadas para
 *    evitar que 1-2 respostas gerem 100% de match.
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
    somaPositivos: number;  // Soma dos pesos positivos nas questões respondidas
    somaNegativos: number;  // Soma dos valores absolutos dos pesos negativos
    questoesComPosicionamento: number; // Questões onde candidato tem peso != 0
    concordancias: Array<{ id: string; texto: string; categoria: string }>;
    divergencias: Array<{ id: string; texto: string; categoria: string }>;
    neutros: number;
    setores: Record<"economia" | "seguranca" | "trabalho" | "sociedade", SetorScore>;
  }> = {};

  candidatos.forEach(c => {
    placar[c.id] = {
      score: 0,
      maxScore: 0,
      somaPositivos: 0,
      somaNegativos: 0,
      questoesComPosicionamento: 0,
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
      placar[c.id].questoesComPosicionamento += 1;

      // Rastreia assimetria de pesos para bias correction
      if (peso > 0) placar[c.id].somaPositivos += peso;
      else placar[c.id].somaNegativos += Math.abs(peso);

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

  // Total de questões efetivamente respondidas (resposta != 0)
  const totalRespondidas = Object.values(respostasUsuario).filter(r => r !== 0).length;

  // Gera ranking final normalizado de 0% a 100%
  const ranking: CandidateMatchResult[] = candidatos.map(c => {
    const dados = placar[c.id];

    let matchPercent = 50; // Se não houve respostas sobre o candidato, neutralidade
    if (dados.maxScore > 0) {
      // ── 1. BIAS CORRECTION ──────────────────────────────────────────────────
      // Candidatos com pesos majoritariamente positivos ganham vantagem estrutural:
      // qualquer usuário que concorde com a maioria das questões tende a se alinhar
      // mais com eles, independentemente do conteúdo real das propostas.
      //
      // Correção: descontamos do score bruto metade do desequilíbrio entre
      // somaPositivos e somaNegativos. Isso centraliza o match em 50% quando o
      // usuário não tem preferência clara, sem inverter candidatos bem alinhados.
      //
      // bias = somaPositivos - somaNegativos (> 0 = candidato é mais "pró-concordar")
      // scoreCorrected = score - bias * 0.5
      const bias = dados.somaPositivos - dados.somaNegativos;
      const scoreCorrected = dados.score - bias * 0.5;

      // ── 2. SHRINKAGE ────────────────────────────────────────────────────────
      // Amostras minúsculas (< 8 pontos de peso) são suavizadas para evitar que
      // 1-2 respostas gerem match extremo (100% ou 0%).
      const shrinkage = dados.maxScore < 8 ? (8 - dados.maxScore) * 0.25 : 0;
      const normalizer = dados.maxScore + shrinkage;
      const calculo = ((scoreCorrected / normalizer) + 1) * 50;

      // ── 3. COVERAGE PENALTY ─────────────────────────────────────────────────
      // Candidatos com posicionamento em menos de 30% das questões respondidas
      // recebem penalidade crescente: dados insuficientes não devem inflar match.
      const coberturaRatio = totalRespondidas > 0
        ? dados.questoesComPosicionamento / totalRespondidas
        : 1;
      const coveragePenalty = coberturaRatio < 0.3
        ? (0.3 - coberturaRatio) * 25  // Máximo ~7.5pp de penalidade
        : 0;

      matchPercent = Math.min(100, Math.max(0, Math.round(calculo - coveragePenalty)));
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
