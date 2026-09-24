export interface CandidateMeta {
  id: string;
  nome: string;
  partido: string;
  iniciais: string;
  espectro: string;
  foto: string;
  badgeBg: string;
  badgeText: string;
  visaoPais: string;
  perfilResumido: string;
  diferencial: string;
  compass: {
    x: number; // -100 (Estatizante / Socialismo) a +100 (Liberal / Livre Mercado)
    y: number; // -100 (Progressista / Direitos Civis) a +100 (Conservador / Ordem Estrita)
  };
  propostasChave: {
    categoria: string;
    texto: string;
  }[];
}

export const CANDIDATOS_VISUAIS: Record<string, CandidateMeta> = {
  augusto_cury: {
    id: "augusto_cury",
    nome: "Augusto Cury",
    partido: "Independente",
    iniciais: "AC",
    espectro: "Centro-Humanista",
    foto: "/candidates/augusto_cury.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Propõe um modelo de governança centrado na saúde mental, educação socioemocional e superação da polarização ideológica através de políticas preventivas e inovação hídrica no Nordeste.",
    perfilResumido: "Médico psiquiatra, professor e autor best-seller, defende o diálogo suprapartidário, inteligência emocional nas escolas públicas e projetos ambientais tecnológicos.",
    diferencial: "Foco pioneiro em inteligência socioemocional nas escolas e o mega-projeto 'Brasil Oásis' para dessalinização solar no Semiárido.",
    compass: { x: 0, y: -20 },
    propostasChave: [
      { categoria: "Educação", texto: "Ensino de inteligência socioemocional obrigatório nas escolas públicas e privadas." },
      { categoria: "Saúde Mental", texto: "Criação de centros especializados municipais em prevenção ao suicídio e depressão." },
      { categoria: "Infraestrutura", texto: "Projeto Brasil Oásis: usinas de dessalinização solar no Semiárido brasileiro." }
    ]
  },
  clariana_barao: {
    id: "clariana_barao",
    nome: "Clariana Barão",
    partido: "Mobiliza",
    iniciais: "CB",
    espectro: "Centro / Social-Liberal",
    foto: "/candidates/clariana_barao.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Foco estrito em gestão pública auditável baseada em evidências, corte de subsídios corporativos improdutivos e digitalização integrada de serviços públicos.",
    perfilResumido: "Especialista em políticas públicas e inovação governamental, representa a centro-direita pragmática com ênfase em Primeira Infância e vigilância inteligente de fronteiras.",
    diferencial: "Princípio de pedir dados ao cidadão apenas uma vez e repasses federais 100% amarrados a metas comprovadas de saúde e notas escolares.",
    compass: { x: 5, y: 10 },
    propostasChave: [
      { categoria: "Gestão Pública", texto: "Vincular repasses voluntários da União ao cumprimento de metas públicas auditadas." },
      { categoria: "Segurança", texto: "Monitoramento integral de fronteiras com drones e sensores remotos autônomos." },
      { categoria: "Saúde", texto: "Prontuário eletrônico unificado nacional interoperável entre SUS e rede privada." }
    ]
  },
  edmilson_costa: {
    id: "edmilson_costa",
    nome: "Edmilson Costa",
    partido: "PCB",
    iniciais: "EC",
    espectro: "Esquerda Comunista",
    foto: "/candidates/edmilson_costa.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Ruptura radical com a ordem capitalista burguesa, extinção do Senado e instauração do controle dos trabalhadores sobre o sistema financeiro, terras e indústrias.",
    perfilResumido: "Economista e dirigente histórico do Partido Comunista Brasileiro, defende uma república socialista dos trabalhadores e o fim de qualquer forma de privatização.",
    diferencial: "Estatização de 100% dos bancos do país, jornada de 30 horas semanais e parlamento unicameral popular com mandatos revogáveis.",
    compass: { x: -95, y: -60 },
    propostasChave: [
      { categoria: "Economia", texto: "Estatizar todo o sistema bancário e financeiro sob controle dos trabalhadores." },
      { categoria: "Sistema Político", texto: "Extinguir o Senado e substituí-lo por Parlamento Unicameral dos Trabalhadores." },
      { categoria: "Trabalho", texto: "Reduzir a jornada para 30 horas semanais sem qualquer redução de salário." }
    ]
  },
  flavio_bolsonaro: {
    id: "flavio_bolsonaro",
    nome: "Flávio Bolsonaro",
    partido: "PL",
    iniciais: "FB",
    espectro: "Direita Conservadora",
    foto: "/candidates/flavio_bolsonaro.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Pauta conservadora em costumes, livre mercado e desregulamentação, com tolerância zero ao crime violento e endurecimento máximo da legislação penal.",
    perfilResumido: "Senador da República e advogado, lidera a frente liberal-conservadora em defesa da família tradicional, agronegócio, escolas cívico-militares e privatizações.",
    diferencial: "Castração química para condenados por estupro, redução da maioridade penal para 16 anos e vouchers educacionais para a rede particular.",
    compass: { x: 80, y: 85 },
    propostasChave: [
      { categoria: "Segurança", texto: "Reduzir a maioridade penal para 16 anos em crimes hediondos e violentos." },
      { categoria: "Justiça", texto: "Castração química para condenados por crimes sexuais e estupro." },
      { categoria: "Educação", texto: "Vouchers educacionais para financiar vagas em escolas privadas de ensino básico." }
    ]
  },
  hertz_dias: {
    id: "hertz_dias",
    nome: "Hertz Dias",
    partido: "PSTU",
    iniciais: "HD",
    espectro: "Esquerda Socialista",
    foto: "/candidates/hertz_dias.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Socialismo revolucionário com expropriação da burguesia e latifundiários, desmilitarização total da polícia e reparação histórica imediata à população negra.",
    perfilResumido: "Professor da rede pública, ativista do movimento negro e do hip-hop maranhense, propõe a organização da classe trabalhadora em conselhos populares armados.",
    diferencial: "Expropriação de multinacionais, descriminalização de todas as drogas e calote patriótico na dívida pública com banqueiros.",
    compass: { x: -85, y: -75 },
    propostasChave: [
      { categoria: "Segurança", texto: "Desmilitarizar a PM e unificar as polícias sob controle de conselhos civis." },
      { categoria: "Economia", texto: "Suspensão imediata do pagamento da dívida pública e auditoria popular dos títulos." },
      { categoria: "Trabalho", texto: "Estabilidade geral no emprego e proibição de demissões sem justa causa comprovada." }
    ]
  },
  leonardo_avalanche: {
    id: "leonardo_avalanche",
    nome: "Leonardo Avalanche",
    partido: "PRTB",
    iniciais: "LA",
    espectro: "Direita Trabalhista",
    foto: "/candidates/leonardo_avalanche.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Nacionalismo popular voltado à economia digital, desoneração de autônomos, apoio massivo a motoristas de app e substituição do manicômio tributário por imposto único.",
    perfilResumido: "Presidente nacional do PRTB e articulador político, foca no trabalhador informal e pequenos empreendedores urbanos que dependem de tecnologia.",
    diferencial: "Imposto Único de 3,5% na fonte, IPVA fixo de R$ 50/mês e iPhones gratuitos para quem se qualificar em negócios digitais.",
    compass: { x: 35, y: 30 },
    propostasChave: [
      { categoria: "Tributação", texto: "Imposto Único de 3,5% na fonte sobre todas as transações, extinguindo os demais impostos." },
      { categoria: "Trabalho", texto: "Limitar taxa cobrada por apps de corrida (Uber, 99) a no máximo 3,5% por corrida." },
      { categoria: "Tecnologia", texto: "iPhone com 1 ano de internet grátis para quem concluir curso de empreendedorismo." }
    ]
  },
  lula: {
    id: "lula",
    nome: "Luiz Inácio Lula da Silva",
    partido: "PT",
    iniciais: "LS",
    espectro: "Centro-Esquerda",
    foto: "/candidates/lula.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Desenvolvimentismo com justiça social, combate à fome e desigualdade, valorização do salário mínimo e fortalecimento das empresas estatais estratégicas.",
    perfilResumido: "Líder sindical histórico e Presidente da República, articula frente ampla democrática com foco em políticas sociais, direitos trabalhistas e diplomacia multilateral.",
    diferencial: "Extinção da escala 6x1 e redução para 40h semanais sem corte salarial, regulação de plataformas digitais contra o ódio e tributação de super-ricos.",
    compass: { x: -45, y: -35 },
    propostasChave: [
      { categoria: "Trabalho", texto: "Reduzir a jornada para 40h semanais e extinguir escala 6x1 sem redução salarial." },
      { categoria: "Comunicação", texto: "Regular redes sociais e plataformas para impedir desinformação e discurso de ódio." },
      { categoria: "Energia", texto: "Expandir exploração de novas reservas de petróleo onshore e offshore pela Petrobras." }
    ]
  },
  renan_santos: {
    id: "renan_santos",
    nome: "Renan Santos",
    partido: "Missão",
    iniciais: "RS",
    espectro: "Centro-Direita Reformista",
    foto: "/candidates/renan_santos.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Choque institucional de gestão, enxugamento drástico do Estado brasileiro, combate implacável às facções criminosas e soberania nacional estratégica.",
    perfilResumido: "Cofundador do Movimento Brasil Livre (MBL) e presidente do Partido Missão, defende reformas estruturais agressivas contra o clientelismo e a burocracia.",
    diferencial: "Fusão forçada de até 70% dos municípios deficitários, troca de Bolsa Família por trabalho comunitário e Direito Penal do Inimigo com blindados em favelas.",
    compass: { x: 60, y: 25 },
    propostasChave: [
      { categoria: "Pacto Federativo", texto: "Reduzir o número de municípios no país em até 70% por fusão forçada dos deficitários." },
      { categoria: "Assistência Social", texto: "Substituir Bolsa Família por trabalho remunerado comunitário obrigatório." },
      { categoria: "Segurança", texto: "Muralha de drones armados e monitoramento térmico em todas as fronteiras secas." }
    ]
  },
  ronaldo_caiado: {
    id: "ronaldo_caiado",
    nome: "Ronaldo Caiado",
    partido: "PSD",
    iniciais: "RC",
    espectro: "Centro-Direita",
    foto: "/candidates/ronaldo_caiado.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Prioridade absoluta à Segurança Pública com modelo de tolerância zero, defesa irrestrita do agronegócio e resposta imediata contra o crime organizado.",
    perfilResumido: "Médico e Governador de Goiás, com histórico parlamentar na bancada ruralista, consolidou seu nome pela drástica redução de homicídios e controle territorial.",
    diferencial: "Enquadramento de facções criminosas como terrorismo doméstico (pena mínima de 45 anos) e confisco sumário de patrimônio por enriquecimento incompatível.",
    compass: { x: 65, y: 75 },
    propostasChave: [
      { categoria: "Segurança", texto: "Tipificar facções criminosas como terrorismo doméstico com pena mínima de 45 anos." },
      { categoria: "Combate à Corrupção", texto: "Novo crime de enriquecimento ilícito incompatível com pena de até 40 anos." },
      { categoria: "Agronegócio", texto: "Garantia estrita da propriedade privada e repressão severa a invasões no campo." }
    ]
  },
  rui_costa_pimenta: {
    id: "rui_costa_pimenta",
    nome: "Rui Costa Pimenta",
    partido: "PCO",
    iniciais: "RP",
    espectro: "Esquerda Operária",
    foto: "/candidates/rui_costa_pimenta.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Revolução socialista operária, reestatização completa da infraestrutura nacional, liberdade irrestrita de expressão e armamento geral da população trabalhadora.",
    perfilResumido: "Jornalista e presidente nacional do PCO, tem linha de esquerda marxista-trotskista anti-imperialista com forte crítica ao judiciário e ao STF.",
    diferencial: "Extinção imediata do STF com eleição de juízes pelo voto popular, armamento do povo e corte de 50% nos combustíveis na Petrobras sob gestão operária.",
    compass: { x: -90, y: -45 },
    propostasChave: [
      { categoria: "Judiciário", texto: "Extinguir o STF e instituir eleição popular com mandatos revogáveis para todos os juízes." },
      { categoria: "Economia", texto: "Reestatizar sem indenização todas as privatizações realizadas no país." },
      { categoria: "Cidadania", texto: "Direito irrestrito ao porte e posse de armas para toda a população trabalhadora." }
    ]
  },
  samara: {
    id: "samara",
    nome: "Samara Martins",
    partido: "UP",
    iniciais: "SM",
    espectro: "Esquerda Popular",
    foto: "/candidates/samara.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Socialismo popular e comunitário, redistribuição radical da renda, garantia do pleno emprego por obras públicas e direitos reprodutivos irrestritos.",
    perfilResumido: "Jovem militante das periferias urbanas e dirigente da Unidade Popular, representa as lutas das mulheres trabalhadoras, juventude sem-teto e negros.",
    diferencial: "Aumento de 100% no salário mínimo, tarifa zero no transporte coletivo urbano e legalização do aborto 100% gratuito no SUS.",
    compass: { x: -80, y: -80 },
    propostasChave: [
      { categoria: "Saúde", texto: "Legalizar o aborto seguro e 100% gratuito através da rede hospitalar do SUS." },
      { categoria: "Economia", texto: "Aumento imediato de 100% no salário mínimo nacional." },
      { categoria: "Mobilidade", texto: "Tarifa zero e estatização integral do transporte coletivo urbano." }
    ]
  },
  wilson_grassi: {
    id: "wilson_grassi",
    nome: "Wilson Grassi",
    partido: "Democrata",
    iniciais: "WG",
    espectro: "Centro-Liberal",
    foto: "/candidates/wilson_grassi.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Liberalismo sustentável com simplificação radical dos tributos, combate à informalidade via desoneração e proteção à vida animal e ambiental.",
    perfilResumido: "Médico veterinário, ativista dos direitos animais e comunicador, representa a centro-direita ecológica com foco em desburocratização e saúde única.",
    diferencial: "Instituição da 'Saúde Única' (One Health), isenção do IRPF até 5 salários mínimos e zeramento da contribuição patronal sobre a folha.",
    compass: { x: 25, y: -20 },
    propostasChave: [
      { categoria: "Tributação", texto: "Elevar a faixa de isenção do IRPF para até 5 salários mínimos mensais." },
      { categoria: "Saúde", texto: "Instituir a política nacional de Saúde Única (One Health) integrando saúde humana e animal." },
      { categoria: "Economia", texto: "Desoneração gradual da folha de pagamento para empresas verdes e de tecnologia." }
    ]
  },
  zema: {
    id: "zema",
    nome: "Romeu Zema",
    partido: "NOVO",
    iniciais: "RZ",
    espectro: "Direita Liberal",
    foto: "/candidates/zema.jpg",
    badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
    badgeText: "text-zinc-300",
    visaoPais: "Estado Mínimo, privatização ampla de estatais, equilíbrio fiscal rigoroso sem aumento de tributos e tolerância zero com a reincidência criminal.",
    perfilResumido: "Empresário e Governador reeleito de Minas Gerais, principal expoente do Partido NOVO, defende austeridade pública, desregulamentação e livre concorrência.",
    diferencial: "Ampla privatização de estatais federais (Petrobras, Correios e bancos), prisão preventiva automática na 3ª custódia e mandatos com tempo fixo no STF.",
    compass: { x: 90, y: 40 },
    propostasChave: [
      { categoria: "Desestatização", texto: "Ampla privatização de empresas estatais federais (Petrobras, Correios e bancos públicos)." },
      { categoria: "Segurança", texto: "Prisão preventiva obrigatória e automática na 3ª audiência de custódia." },
      { categoria: "Privilégios", texto: "Extinguir o foro privilegiado para todas as autoridades públicas, exceto o Presidente." }
    ]
  }
};
