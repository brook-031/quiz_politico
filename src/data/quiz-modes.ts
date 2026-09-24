import quizDb from "./quiz_db.json";
import { Question } from "@/lib/match-engine";

/**
 * Modo Rápido / Equilibrado: Exatamente 24 perguntas.
 * Divisão Perfeita dos 4 Pilares: 6 em Economia, 6 em Segurança, 6 em Trabalho e 6 em Sociedade.
 * Todos os 13 candidatos possuem posicionamento calibrado nas 24 perguntas, garantindo equidade matemática.
 */
export const QUESTOES_EXPRESS_IDS = [
  // EIXO 1: Economia & Estado (6)
  "q147", // Privatização ampla de estatais federais (Petrobras, Correios, bancos)
  "q131", // Elevar isenção do IRPF para até 5 salários mínimos
  "q12",  // Perseguir meta de déficit público zero e desvincular gastos federais
  "q25",  // Estatizar sistema bancário e criar Banco dos Trabalhadores
  "q58",  // Imposto Único de 3,5% sobre todas as transações financeiras
  "q82",  // Reduzir número de municípios em até 70% por fusão forçada

  // EIXO 2: Segurança Pública & Justiça (6)
  "q36",  // Reduzir a maioridade penal para 16 anos em crimes graves
  "q37",  // Instituir a castração química para condenados por estupro
  "q52",  // Desmilitarizar a PM e unificar as polícias sob comando civil
  "q97",  // Novo crime de enriquecimento incompatível e confisco de bens de facções
  "q141", // Prisão preventiva obrigatória na audiência de custódia para reincidentes
  "q110", // Extinguir o STF e instituir eleição popular de juízes e promotores

  // EIXO 3: Trabalho & Previdência (6)
  "q71",  // Reduzir jornada para 40h semanais e extinguir escala 6x1 sem corte salarial
  "q118", // Aumento imediato de 100% no salário mínimo nacional
  "q72",  // Regulamentar trabalho em plataformas e aplicativos com direitos CLT
  "q45",  // Prevalência do negociado sobre o legislado e veto a imposto sindical
  "q114", // Revogar reformas previdenciárias e garantir aposentadoria integral
  "q133", // Zerar contribuição patronal da previdência sobre a folha salarial

  // EIXO 4: Sociedade, Educação & Meio Ambiente (6)
  "q1",   // Ensino de inteligência socioemocional obrigatório nas escolas
  "q148", // Vouchers educacionais financiados pelo Estado para escolas privadas
  "q129", // Legalizar o aborto voluntário seguro e gratuito pelo SUS
  "q76",  // Regular redes sociais e plataformas para combater desinformação e ódio
  "q135", // SUS Animal com esterilização gratuita e hospitais veterinários públicos
  "q80",  // Regulamentar o mercado nacional de carbono e transição ecológica
];

/**
 * Modo Aprofundado: Exatamente 48 perguntas.
 * 12 de Economia, 12 de Segurança, 12 de Trabalho e 12 de Sociedade/Educação.
 * Ampla imersão com 100% de paridade temática e denominador balanceado.
 */
export const QUESTOES_APROFUNDADO_IDS = [
  ...QUESTOES_EXPRESS_IDS,

  // Economia (+6 = 12 total)
  "q4",   // 10 mil Escolas de Empreendedorismo
  "q11",  // Revisar partilha tributária e aumentar fatia de estados e municípios
  "q26",  // Reestatizar todas as estatais e Petrobras 100% pública operária
  "q44",  // Reduzir ministérios e retomar Programa Nacional de Desestatização
  "q84",  // Desindexar benefícios da seguridade social do salário mínimo
  "q107", // Cancelar todas as privatizações realizadas no país

  // Segurança (+6 = 12 total)
  "q3",   // Programa Mulheres Vivas e tornozeleira em agressores
  "q17",  // Monitoramento integral de fronteiras com drones e sensores remotos
  "q38",  // Cumprimento de 100% da pena em regime fechado para crimes hediondos
  "q95",  // Tipificar grandes facções como terrorismo doméstico (pena de 45 anos)
  "q100", // Cumprimento de 90% da pena em regime fechado para feminicidas
  "q144", // Extinguir o foro privilegiado para quase todas as autoridades

  // Trabalho (+6 = 12 total)
  "q27",  // Reduzir jornada para 30h semanais e abolir escala 6x1
  "q48",  // Reduzir jornada para 36h semanais sem corte salarial
  "q51",  // Reconhecer vínculo empregatício e criar fundo para trabalhadores por app
  "q63",  // Limitar taxa cobrada por apps de corrida a no máximo 3,5%
  "q109", // Reduzir jornada máxima para 35h semanais
  "q120", // Frentes Emergenciais Públicas de Trabalho para pleno emprego

  // Sociedade, Educação & Meio Ambiente (+6 = 12 total)
  "q2",   // Programa Brasil Neuroinclusivo (autismo e TDAH nas escolas)
  "q5",   // Projeto Brasil Oásis (dessalinização massiva no Semiárido)
  "q46",  // Proteção integral da vida humana desde a concepção (veto ao aborto)
  "q56",  // Legalizar aborto seguro e gratuito no SUS sem interferência estatal
  "q79",  // Expandir exploração de novas reservas de petróleo pela Petrobras
  "q134", // Modelo de Saúde Única (One Health) integrando saúde e animais
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
      return filtradas.length > 0 ? filtradas : todas.slice(0, 24);
    }
    if (modo === "aprofundado") {
      const mapa = new Map(todas.map((q) => [q.id, q]));
      const filtradas = QUESTOES_APROFUNDADO_IDS.map((id) => mapa.get(id)).filter(Boolean) as Question[];
      return filtradas.length > 0 ? filtradas : todas.slice(0, 48);
    }
    return todas;
  }

  // Filtrado por categoria temática
  const filtradasCat = filtrarPorCategoria(todas, categoria);
  if (modo === "express") {
    return filtradasCat.slice(0, Math.min(24, filtradasCat.length));
  }
  if (modo === "aprofundado") {
    return filtradasCat.slice(0, Math.min(48, filtradasCat.length));
  }
  return filtradasCat;
}
