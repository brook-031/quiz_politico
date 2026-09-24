import quizDb from "./quiz_db.json";
import { Question } from "@/lib/match-engine";

/**
 * Modo Rápido / Equilibrado: Exatamente 26 perguntas (2 de cada um dos 13 candidatos).
 * 100% simétrico, democrático e justo: nenhum candidato fica com mais ou menos perguntas.
 */
export const QUESTOES_EXPRESS_IDS = [
  // 1. Augusto Cury (2)
  "q1",   // Ensino de inteligência socioemocional obrigatório nas escolas
  "q5",   // Projeto Brasil Oásis (dessalinização massiva no Semiárido)

  // 2. Clariana Barão (2)
  "q14",  // Vincular repasses voluntários da União ao cumprimento de metas públicas
  "q17",  // Monitoramento integral de fronteiras com drones e sensores remotos

  // 3. Edmilson Costa (2)
  "q24",  // Extinguir o Senado e substituí-lo por Parlamento Unicameral popular
  "q25",  // Estatizar todo o sistema bancário e financeiro (Banco dos Trabalhadores)

  // 4. Flávio Bolsonaro (2)
  "q36",  // Reduzir a maioridade penal para 16 anos
  "q37",  // Instituir a castração química para condenados por estupro

  // 5. Hertz Dias (2)
  "q48",  // Reduzir a jornada para 36 horas semanais sem corte salarial
  "q52",  // Desmilitarizar a PM e unificar as polícias sob controle civil

  // 6. Leonardo Avalanche (2)
  "q58",  // Imposto Único de 3,5% na fonte sobre todas as transações
  "q63",  // Limitar taxa cobrada por apps de corrida (Uber, 99) a no máximo 3,5%

  // 7. Lula (2)
  "q71",  // Reduzir a jornada para 40h semanais e extinguir escala 6x1 sem redução salarial
  "q76",  // Regular redes sociais e plataformas para combater desinformação e ódio

  // 8. Renan Santos (2)
  "q82",  // Reduzir o número de municípios no país em até 70% por fusão forçada
  "q83",  // Substituir Bolsa Família por trabalho comunitário nas Frentes Cidadãs

  // 9. Ronaldo Caiado (2)
  "q95",  // Tipificar facções como terrorismo doméstico (pena mínima de 45 anos)
  "q97",  // Novo crime de enriquecimento incompatível (pena de até 40 anos)

  // 10. Rui Costa Pimenta (2)
  "q107", // Reestatizar sem indenização todas as privatizações realizadas
  "q110", // Extinguir o STF e instituir eleição popular de todos os juízes

  // 11. Samara (2)
  "q118", // Aumento imediato de 100% no salário mínimo nacional
  "q129", // Legalizar o aborto seguro e 100% gratuito através da rede do SUS

  // 12. Wilson Grassi (2)
  "q131", // Elevar a faixa de isenção do IRPF para 5 salários mínimos mensais
  "q133", // Zerar a contribuição patronal da previdência sobre a folha salarial

  // 13. Romeu Zema (2)
  "q141", // Prisão preventiva obrigatória na 3ª audiência de custódia
  "q147", // Ampla privatização de empresas estatais (Petrobras, Correios, bancos)
];

/**
 * Modo Aprofundado: Exatamente 52 perguntas (4 de cada um dos 13 candidatos).
 * Para quem deseja uma imersão completa e rigorosa em cada programa de governo.
 */
export const QUESTOES_APROFUNDADO_IDS = [
  ...QUESTOES_EXPRESS_IDS,

  // Augusto Cury (+2)
  "q2",   // Brasil Neuroinclusivo: suporte escolar a autistas e TDAH
  "q3",   // Programa Mulheres Vivas: monitoramento de agressores com tornozeleira

  // Clariana Barão (+2)
  "q13",  // Central integrada de proteção a mulheres e foco na Primeira Infância
  "q16",  // Princípio de pedir dados uma única vez no serviço público (identidade digital)

  // Edmilson Costa (+2)
  "q26",  // Reestatizar todas as estatais e Petrobras 100% pública operária
  "q27",  // Reduzir jornada para 30h semanais e abolir escala 6x1

  // Flávio Bolsonaro (+2)
  "q41",  // Vouchers educacionais e creche para escolas particulares
  "q46",  // Proteção integral da vida desde a concepção (veto a aborto)

  // Hertz Dias (+2)
  "q50",  // Suspender pagamento da dívida pública aos grandes bancos
  "q56",  // Legalizar aborto seguro e gratuito no SUS

  // Leonardo Avalanche (+2)
  "q59",  // iPhone e internet grátis para formados em empreendedorismo digital
  "q64",  // IPVA com valor fixo nacional de R$ 50/mês para carros de passeio

  // Lula (+2)
  "q72",  // Regulamentar trabalho em plataformas e aplicativos com direitos
  "q79",  // Expandir exploração de novas reservas de petróleo pela Petrobras

  // Renan Santos (+2)
  "q84",  // Desindexar BPC do salário mínimo e desvincular gastos obrigatórios
  "q85",  // Direito Penal do Inimigo e emprego das Forças Armadas com armamento pesado

  // Ronaldo Caiado (+2)
  "q100", // Assassinos de mulheres cumprem 90% em regime fechado e perdem bens
  "q102", // Pronta resposta policial contra invasão de fazendas produtivas

  // Rui Costa Pimenta (+2)
  "q108", // Petrobras 100% estatal e gasolina cortada pela metade
  "q111", // Dissolver a PM e armamento da população trabalhadora para autodefesa

  // Samara (+2)
  "q120", // Frentes Emergenciais Públicas de Trabalho para pleno emprego
  "q123", // Tarifa zero e estatização integral do transporte coletivo

  // Wilson Grassi (+2)
  "q134", // Saúde Única (One Health) integrando saúde humana, animal e saneamento
  "q135", // Hospitais veterinários públicos e castração gratuita de cães e gatos

  // Romeu Zema (+2)
  "q144", // Extinguir foro privilegiado exceto para o Presidente da República
  "q149", // Demissão de servidores públicos por insuficiência de rendimento
];

export type QuizModeType = "express" | "aprofundado" | "completo";
export type QuizCategoryType = "all" | "economia" | "seguranca" | "trabalho" | "direitos";

export interface CategoryInfo {
  id: QuizCategoryType;
  nome: string;
  descricao: string;
  iconName: string;
  count: number;
}

export const CATEGORIAS_QUIZ: CategoryInfo[] = [
  {
    id: "all",
    nome: "Todos os Temas",
    descricao: "Visão equilibrada de todas as áreas de governo",
    iconName: "Globe",
    count: 150,
  },
  {
    id: "economia",
    nome: "Economia & Tributação",
    descricao: "Impostos, privatizações, teto de gastos, bancos e estatais",
    iconName: "TrendingUp",
    count: 29,
  },
  {
    id: "seguranca",
    nome: "Segurança & Justiça",
    descricao: "Penas criminais, facções, maioridade, polícias e STF",
    iconName: "Shield",
    count: 30,
  },
  {
    id: "trabalho",
    nome: "Trabalho & Social",
    descricao: "Escala 6x1, CLT, salário mínimo, previdência e apps",
    iconName: "Briefcase",
    count: 23,
  },
  {
    id: "direitos",
    nome: "Educação & Sociedade",
    descricao: "Saúde, aborto, meio ambiente, gênero e liberdades civis",
    iconName: "BookOpen",
    count: 40,
  },
];

export function filtrarPorCategoria(questoes: Question[], categoria: QuizCategoryType): Question[] {
  if (categoria === "all") return questoes;

  return questoes.filter((q) => {
    const cat = q.categoria.toLowerCase();
    if (categoria === "economia") {
      return /economia|tributa|imposto|finan|sistema financeiro|dívida|desestatiza|indústria|petróleo|bancário|fiscal/.test(cat);
    }
    if (categoria === "seguranca") {
      return /segurança|crime|prisional|penal|políci|armamento|judiciário|stf|maioridade|fronteira|facç|feminicídio|corrupção|foro/.test(cat);
    }
    if (categoria === "trabalho") {
      return /trabalho|salário|jornada|previdência|renda|habitação|mobilidade|transporte/.test(cat);
    }
    if (categoria === "direitos") {
      return /educação|saúde|mulher|direito|meio ambiente|inclusão|neurodiversidade|república|agrária|cultura|relação|animal/.test(cat);
    }
    return true;
  });
}

export function obterQuestoesPorModo(modo: QuizModeType, categoria: QuizCategoryType = "all"): Question[] {
  const todas = quizDb.questoes as Question[];

  if (categoria === "all") {
    if (modo === "express") {
      const mapa = new Map(todas.map((q) => [q.id, q]));
      const filtradas = QUESTOES_EXPRESS_IDS.map((id) => mapa.get(id)).filter(Boolean) as Question[];
      return filtradas.length > 0 ? filtradas : todas.slice(0, 26);
    }
    if (modo === "aprofundado") {
      const mapa = new Map(todas.map((q) => [q.id, q]));
      const filtradas = QUESTOES_APROFUNDADO_IDS.map((id) => mapa.get(id)).filter(Boolean) as Question[];
      return filtradas.length > 0 ? filtradas : todas.slice(0, 52);
    }
    return todas;
  }

  // Filtrado por categoria temática
  const filtradasCat = filtrarPorCategoria(todas, categoria);
  if (modo === "express") {
    return filtradasCat.slice(0, Math.min(26, filtradasCat.length));
  }
  if (modo === "aprofundado") {
    return filtradasCat.slice(0, Math.min(52, filtradasCat.length));
  }
  return filtradasCat;
}
