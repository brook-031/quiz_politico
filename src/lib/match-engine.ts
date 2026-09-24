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
}

/**
 * Motor de Cálculo de Afinidade (Match Político)
 * 
 * Regra:
 * - Resposta do usuário: 1 (Concordo), -1 (Discordo), 0 (Pular/Neutro)
 * - score = Somatório de (Resposta * Peso do Candidato)
 * - maxScore = Somatório do valor absoluto dos pesos (nas questões respondidas com resposta != 0)
 * - Match % = ((score / maxScore) + 1) * 50
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
  }> = {};

  candidatos.forEach(c => {
    placar[c.id] = {
      score: 0,
      maxScore: 0,
      concordancias: [],
      divergencias: [],
      neutros: 0
    };
  });

  // Percorre todas as respostas fornecidas
  for (const [questaoId, resposta] of Object.entries(respostasUsuario)) {
    const questao = mapQuestoes.get(questaoId);
    if (!questao) continue;

    // Se o usuário pulou ou respondeu neutro (0), não entra no maxScore
    if (resposta === 0 || resposta === undefined || resposta === null) {
      candidatos.forEach(c => {
        if (questao.pesos_candidatos[c.id] !== 0) {
          placar[c.id].neutros += 1;
        }
      });
      continue;
    }

    for (const c of candidatos) {
      const peso = questao.pesos_candidatos[c.id] ?? 0;
      if (peso === 0) continue; // Candidato sem posicionamento nessa proposta

      const ponto = resposta * peso;
      placar[c.id].score += ponto;
      placar[c.id].maxScore += Math.abs(peso);

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
      const calculo = ((dados.score / dados.maxScore) + 1) * 50;
      matchPercent = Math.min(100, Math.max(0, Math.round(calculo)));
    }

    return {
      candidateId: c.id,
      nome: c.nome,
      partido: c.partido,
      match: matchPercent,
      score: dados.score,
      maxScore: dados.maxScore,
      concordancias: dados.concordancias,
      divergencias: dados.divergencias,
      neutros: dados.neutros
    };
  });

  // Ordena por maior afinidade percentual; desempate por maior número de concordâncias
  return ranking.sort((a, b) => {
    if (b.match !== a.match) return b.match - a.match;
    return b.concordancias.length - a.concordancias.length;
  });
}
