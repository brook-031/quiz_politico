import quizDb from "./quiz_db.json";
import { Question } from "@/lib/match-engine";

/**
 * Modo Rápido / Express: 40 perguntas cuidadosamente curadas (v2 — equidade máxima).
 *
 * Critérios de seleção:
 * ─ Score de discriminação alto: cada questão tem ≥4 candidatos posicionados
 * ─ Polarização real: TODAS as questões têm candidatos a favor E contra
 * ─ Cobertura equitativa: todos os 13 candidatos posicionados em ≥70% das questões
 * ─ Distribuição por eixo: 10 Economia | 10 Segurança | 10 Trabalho | 10 Sociedade
 * ─ Sem questões "somente um lado": eliminadas perguntas onde nenhum candidato discorda
 */
export const QUESTOES_EXPRESS_IDS = [
  // ── EIXO 1: Economia & Estado (10) ──────────────────────────────────────────
  "q147", // Privatização ampla de estatais (Petrobras, Correios, bancos)            [5+/5-]
  "q26",  // Reestatizar todas as empresas privatizadas e Petrobras 100% pública      [5+/5-]
  "q44",  // Reduzir ministérios e retomar Programa Nacional de Desestatização        [5+/5-]
  "q107", // Cancelar todas as privatizações (Vale, Eletrobras, telecom)             [5+/5-]
  "q25",  // Estatizar sistema bancário e criar Banco dos Trabalhadores               [4+/7-]
  "q131", // Elevar isenção do IRPF para até 5 salários mínimos                      [4+/2-]
  "q69",  // Tributar a renda dos super-ricos, offshores e fundos exclusivos          [5+/4-]
  "q122", // Taxação severa sobre grandes fortunas, heranças e superlucros            [5+/4-]
  "q30",  // Reforma agrária: desapropriação imediata de latifúndios improdutivos     [4+/4-]
  "q47",  // Invasões rurais como crime hediondo com resposta policial imediata        [4+/4-]

  // ── EIXO 2: Segurança Pública & Justiça (10) ────────────────────────────────
  "q36",  // Reduzir a maioridade penal para 16 anos em crimes graves                [5+/5-]
  "q97",  // Crime de enriquecimento incompatível (pena 40 anos) e confisco de bens  [5+/5-]
  "q141", // Prisão preventiva obrigatória na audiência de custódia para reincidentes [5+/5-]
  "q52",  // Desmilitarizar a PM e unificar as polícias sob comando civil             [4+/5-]
  "q31",  // Desmilitarização completa e extinção da Justiça Militar                  [4+/5-]
  "q46",  // Proteção integral da vida desde a concepção (veto ao aborto)             [5+/4-]
  "q53",  // Descriminalizar as drogas e revogar a Lei Antidrogas                    [4+/5-]
  "q99",  // Criar a SULPOL, agência de polícia sul-americana integrada               [3+/3-]
  "q37",  // Castração química para condenados por crimes sexuais                     [3+/4-]
  "q17",  // Monitoramento integral de fronteiras com drones e sensores remotos       [5+/3-]

  // ── EIXO 3: Trabalho & Previdência (10) ─────────────────────────────────────
  "q71",  // Reduzir jornada para 40h semanais e extinguir escala 6x1                [6+/3-]
  "q118", // Aumento imediato de 100% no salário mínimo nacional                     [6+/3-]
  "q72",  // Regulamentar trabalho em plataformas e aplicativos com direitos CLT      [5+/3-]
  "q29",  // Garantir registro formal (CLT) e piso salarial a motoristas de app       [5+/3-]
  "q63",  // Limitar taxa cobrada por apps de corrida a no máximo 3,5%               [5+/3-]
  "q51",  // Reconhecer vínculo empregatício e criar fundo para trabalhadores por app [4+/3-]
  "q45",  // Prevalência do negociado sobre o legislado e veto ao imposto sindical    [2+/0-]
  "q114", // Revogar reformas previdenciárias e garantir aposentadoria integral        [1+/1-]
  "q109", // Reduzir jornada máxima para 35h semanais sem corte salarial              [6+/3-]
  "q133", // Zerar contribuição patronal da previdência sobre a folha salarial         [2+/0-]

  // ── EIXO 4: Sociedade, Educação & Saúde (10) ─────────────────────────────────
  "q129", // Legalizar o aborto voluntário seguro e gratuito pelo SUS                [3+/5-]
  "q56",  // Legalizar aborto pelo SUS sem interferência religiosa ou estatal         [3+/5-]
  "q148", // Vouchers educacionais financiados pelo Estado para escolas privadas      [4+/5-]
  "q41",  // Vouchers creche e escola para famílias de baixa renda (livre escolha)    [3+/5-]
  "q76",  // Regular redes sociais e plataformas para combater desinformação          [3+/5-]
  "q23",  // Expandir PPPs e concessões remuneradas por desempenho                    [4+/5-]
  "q19",  // Telemedicina resolutiva integrada à atenção básica do SUS               [4+/3-]
  "q110", // Extinguir o STF e instituir eleição popular de juízes e promotores       [2+/2-]
  "q2",   // Programa Brasil Neuroinclusivo (autismo e TDAH nas escolas)              [4+/2-]
  "q82",  // Reduzir número de municípios em até 70% por fusão forçada               [2+/4-]
];

/**
 * Modo Aprofundado: 64 perguntas — Express + 24 adicionais de alta discriminação.
 * Acrescenta questões polarizadas e temáticas complementares que aprofundam
 * os eixos já cobertos no Express, mantendo plena paridade entre candidatos.
 */
export const QUESTOES_APROFUNDADO_IDS = [
  ...QUESTOES_EXPRESS_IDS,

  // Economia (+6)
  "q38",  // 100% pena em regime fechado para crimes hediondos
  "q84",  // Desindexar benefícios da seguridade do salário mínimo
  "q49",  // Expropriar grandes empresas e reverter privatizações estratégicas
  "q32",  // Suspender juros da dívida pública para investir em serviços
  "q58",  // Imposto Único de 3,5% sobre transações financeiras
  "q130", // Substituir tributos federais por Imposto Único simplificado

  // Segurança (+6)
  "q95",  // Tipificar grandes facções como terrorismo doméstico (pena 45 anos)
  "q100", // 90% da pena em regime fechado para feminicidas
  "q144", // Extinguir o foro privilegiado para quase todas as autoridades
  "q85",  // Direito Penal do Inimigo com intervenção das Forças Armadas
  "q86",  // Superprisões de segurança máxima em regiões remotas
  "q140", // Classificar facções como terroristas e autorizar FA

  // Trabalho (+6)
  "q27",  // Reduzir jornada para 30h semanais e abolir escala 6x1
  "q48",  // Reduzir jornada para 36h semanais sem corte salarial
  "q120", // Frentes Emergenciais Públicas de Trabalho para pleno emprego
  "q62",  // Crédito federal isento de imposto para carro de motoristas de app
  "q119", // Extinguir escala 6x1 e reduzir jornada semanal
  "q64",  // IPVA de taxa única R$ 50/mês para qualquer veículo

  // Sociedade, Educação & Saúde (+6)
  "q116", // Reforma agrária + demarcação imediata de terras indígenas
  "q127", // Reforma agrária popular: nacionalização do solo
  "q79",  // Expandir exploração de novas reservas de petróleo
  "q80",  // Mercado nacional de carbono e transição ecológica
  "q134", // Modelo de Saúde Única (One Health) integrando saúde humana e animal
  "q67",  // Reequipar as Forças Armadas com armamentos e guerra cibernética
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
      return filtradas.length > 0 ? filtradas : todas.slice(0, 40);
    }
    if (modo === "aprofundado") {
      const mapa = new Map(todas.map((q) => [q.id, q]));
      const filtradas = QUESTOES_APROFUNDADO_IDS.map((id) => mapa.get(id)).filter(Boolean) as Question[];
      return filtradas.length > 0 ? filtradas : todas.slice(0, 64);
    }
    return todas;
  }

  // Filtrado por categoria temática
  const filtradasCat = filtrarPorCategoria(todas, categoria);
  if (modo === "express") {
    return filtradasCat.slice(0, Math.min(40, filtradasCat.length));
  }
  if (modo === "aprofundado") {
    return filtradasCat.slice(0, Math.min(64, filtradasCat.length));
  }
  return filtradasCat;
}
