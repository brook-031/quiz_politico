/**
 * Facilitador de Propostas: Tradução de "politiquês" e termos técnicos
 * para linguagem simples, direta e acessível para qualquer cidadão brasileiro.
 *
 * Mapeamento completo e estritamente auditado de 1 a 150 (q1 a q150)
 * baseado nos textos exatos de quiz_db.json.
 */

export const EXPLICACOES_PROPOSTAS: Record<string, string> = {
  // Augusto Cury (q1 a q12)
  q1: "As escolas públicas teriam aulas obrigatórias ensinando crianças e adolescentes a lidar com ansiedade, inteligência emocional e estresse.",
  q2: "Garante que alunos autistas ou com TDAH tenham diagnóstico rápido pelo SUS e acompanhamento com cuidadores e psicólogos na escola.",
  q3: "Homens que agredirem mulheres serão obrigados a usar tornozeleira eletrônica com alarme que avisa a polícia caso se aproximem da vítima.",
  q4: "O governo criará 10 mil escolas de negócios e um banco público focado em emprestar dinheiro com juros baixos para quem quer abrir pequenas empresas.",
  q5: "Instalar grandes usinas que tiram o sal da água do mar para irrigar plantações no sertão e semiárido do Nordeste.",
  q6: "Construir estradas, ferrovias e portos no Norte e Nordeste para baratear o transporte de alimentos e produtos para a Europa e EUA.",
  q7: "Pacientes da rede pública poderão se consultar com médicos especialistas por chamada de vídeo, reduzindo a fila de espera presencial no SUS.",
  q8: "Comprar novos aceleradores lineares e equipamentos modernos de radioterapia para iniciar o tratamento de câncer em no máximo 30 dias após o diagnóstico.",
  q9: "Estimular a extração e o processamento de minérios raros usados em baterias de carros elétricos e energia solar dentro do Brasil.",
  q10: "Integrar as câmeras e bancos de dados das polícias estaduais em um sistema nacional que reconhece placas de carros roubados e rostos de foragidos.",
  q11: "Aumentar a fatia dos impostos federais que é entregue diretamente para as prefeituras gastarem na saúde e escolas dos seus municípios.",
  q12: "Cortar gastos administrativos do governo federal para que o país gaste apenas o que arrecada, evitando o aumento da dívida pública.",

  // Clariana Barão (q13 a q23)
  q13: "Criar uma central nacional 24 horas para socorrer mulheres vítimas de violência e priorizar recursos federais para creches e crianças de 0 a 6 anos.",
  q14: "Prefeitos e governadores só receberão verbas extras do governo federal se baterem metas comprovadas de melhora na saúde e notas dos alunos.",
  q15: "Cortar incentivos fiscais para empresas e encerrar programas do governo que custam caro e não mostram benefícios reais para a população.",
  q16: "O cidadão só precisará cadastrar seus documentos uma única vez; órgãos públicos não poderão mais exigir certidões e cópias repetidas.",
  q17: "Colocar drones, radares e sensores térmicos ao longo de toda a fronteira do Brasil para flagrar o tráfico de fuzis e drogas.",
  q18: "Focar na apreensão rápida de mansões, carros de luxo e contas bancárias de chefes do tráfico antes mesmo do fim do processo judicial.",
  q19: "Consultas médicas por vídeo e uso de inteligência artificial para organizar a fila do SUS e chamar mais rápido quem tem risco grave.",
  q20: "Remédios e tratamentos de saúde novos só serão oferecidos pelo SUS se comprovarem alta eficácia científica e custo justo.",
  q21: "Priorizar o dinheiro da educação federal para ensinar todas as crianças a ler e escrever até o 2º ano do ensino fundamental.",
  q22: "Fazer parcerias com indústrias e empresas para que os estudantes terminem o ensino médio já formados em uma profissão técnica.",
  q23: "Repassar a administração de rodovias, ferrovias e portos para empresas privadas em troca de obras, cobrança de pedágios e metas de qualidade.",

  // Edmilson Costa (q24 a q35)
  q24: "Acabar com o Senado e fazer com que todas as leis sejam votadas por um parlamento único de trabalhadores eleitos, que podem ser demitidos a qualquer hora.",
  q25: "Estatizar todos os bancos privados do país e criar o Banco dos Trabalhadores para controlar o dinheiro, juros e previdência.",
  q26: "O governo toma de volta todas as empresas que foram privatizadas (como Vale e Eletrobras) e coloca a Petrobras sob controle dos funcionários.",
  q27: "Reduzir a jornada para 30 horas semanais (6 horas por dia) sem cortar salários e acabar com a escala de 6 dias trabalhados por 1 de folga.",
  q28: "Proibir que empresas demitam funcionários sem justa causa comprovada e dar estabilidade no emprego para quem tem mais de 5 anos de casa.",
  q29: "Motoristas e entregadores de app terão carteira assinada pela CLT com salário fixo, e o governo criará um aplicativo público estatal de transporte.",
  q30: "O governo toma sem pagar indenização todas as grandes fazendas que não produzem ou que utilizarem trabalho escravo para entregar a agricultores.",
  q31: "Acabar com a Polícia Militar transformando-a em polícia civil unificada e revogar leis antiterroristas usadas contra movimentos sociais.",
  q32: "Parar de pagar a dívida pública aos bancos para fazer uma investigação detalhada e revogar o teto e regras que limitam os gastos sociais.",
  q33: "Acabar com o vestibular nas universidades federais para que qualquer pessoa entre direto e transformar faculdades particulares em públicas gratuitas.",
  q34: "Reservar 54% das vagas de universidades federais para pessoas negras e criar cotas de acesso obrigatórias para pessoas trans.",
  q35: "Criar redes sociais públicas brasileiras e impor regras duras para empresas estrangeiras como Google, Meta e TikTok operarem no país.",

  // Flávio Bolsonaro (q36 a q47)
  q36: "Jovens a partir de 16 anos que cometerem crimes passarão a ser julgados como adultos pela Justiça e poderão cumprir pena em presídios comuns.",
  q37: "Pessoas condenadas por estupro e crimes sexuais receberão medicamentos para inibir e bloquear o desejo sexual, como condição de punição judicial.",
  q38: "Condenados por crimes hediondos (como latrocínio ou estupro) terão que cumprir 100% da pena trancados no presídio, sem ir para o semiaberto.",
  q39: "Um ministro sozinho do STF não poderá mais suspender uma lei que já foi debatida, votada e aprovada pelos deputados e senadores no Congresso.",
  q40: "Escolas públicas terão gestão compartilhada com policiais ou militares para impor maior ordem, disciplina, civismo e uniformes.",
  q41: "O governo paga um vale/bolsa para o estudante estudar em escola ou creche particular caso não haja vaga na rede pública do bairro.",
  q42: "Ensino focado na sonoridade das letras para alfabetizar crianças e proibição de professores abordarem temas de ideologia política em sala.",
  q43: "Permitir a extração de gás do subsolo através de jatos de água em alta pressão (fracking) e acelerar leilões de exploração de petróleo.",
  q44: "Fechar e fundir ministérios em Brasília para cortar despesas e vender empresas estatais federais para investidores privados.",
  q45: "O que for acordado diretamente entre funcionário e patrão vale mais que a CLT, e fica proibida qualquer cobrança de taxa sindical obrigatória.",
  q46: "Proibição total de qualquer ampliação do aborto no país, defendendo a proteção da vida desde o primeiro instante da fecundação.",
  q47: "Invasões de propriedades e fazendas produtivas serão punidas como crime hediondo com ação policial imediata de desocupação.",

  // Hertz Dias (q48 a q57)
  q48: "Reduzir a jornada para 36 horas por semana sem diminuir salários e dobrar o valor do salário mínimo nacional imediatamente.",
  q49: "O governo estatiza sem indenização grandes multinacionais e toma de volta estatais privatizadas como Vale e Petrobras sob controle dos trabalhadores.",
  q50: "Parar de pagar juros da dívida pública para grandes bancos e investidores e revogar regras que travam gastos sociais do governo.",
  q51: "Garantir carteira assinada e direitos aos trabalhadores de app e criar aplicativos públicos de transporte geridos pelos próprios motoristas.",
  q52: "Acabar com a Polícia Militar, unificando as polícias sob comando civil e com comandantes eleitos pelo voto da população nos bairros.",
  q53: "Legalizar e descriminalizar o uso e comércio de drogas, tratando a questão como saúde e tirando o lucro do narcotráfico.",
  q54: "O governo toma imóveis e prédios abandonados para abrigar quem não tem teto e zera a tarifa de ônibus, trens e metrôs em todo o país.",
  q55: "Tomar sem indenização as terras do agronegócio para reforma agrária e proibir perfurações de petróleo na foz do Amazonas (Margem Equatorial).",
  q56: "Legalizar o aborto seguro e 100% gratuito através do SUS, garantindo atendimento médico sem julgamento moral ou religioso.",
  q57: "Confiscar o patrimônio de famílias bilionárias que enriqueceram com a escravidão histórica para financiar reparações à população negra.",

  // Leonardo Avalanche (q58 a q68)
  q58: "Extinguir todos os impostos atuais (ICMS, IRPF, ISS, PIS) e cobrar um imposto único de 3,5% debitado automaticamente em cada transação financeira.",
  q59: "Todo cidadão que concluir um curso oficial de negócios digitais do governo ganha um celular iPhone e pacote de internet para trabalhar.",
  q60: "Cortar a publicidade oficial em grandes emissoras de TV aberta e repassar o dinheiro para criadores de conteúdo e canais da internet.",
  q61: "O governo paga clínicas e hospitais particulares para realizarem exames e cirurgias de quem está esperando na fila do SUS.",
  q62: "Financiamento público sem impostos e com juros subsidiados para que motoristas de aplicativo comprem seu carro próprio.",
  q63: "Uber e 99 serão proibidos por lei de cobrar mais de 3,5% de comissão por corrida, deixando o restante do valor com o motorista.",
  q64: "O IPVA de qualquer veículo de passeio comum passará a ter um valor nacional fixo de apenas R$ 50 por mês.",
  q65: "Incentivos fiscais gigantes para fabricar chips, processadores e soluções de inteligência artificial dentro do território nacional.",
  q66: "Policiamento pesado nas ruas e penas duras sem benefícios para membros de facções criminosas e abusadores sexuais.",
  q67: "Comprar armamentos modernos para as Forças Armadas e criar uma estrutura militar avançada contra ataques cibernéticos.",
  q68: "Criar uma fábrica nacional de automóveis com incentivo do Estado e produzir fertilizantes internamente para não depender de outros países.",

  // Lula (q69 a q81)
  q69: "Criar impostos maiores sobre rendimentos de bilionários, contas bancárias no exterior (offshores) e fundos exclusivos de investimento.",
  q70: "Zerar os impostos de arroz, feijão e itens básicos da alimentação e devolver parte dos impostos pagos na compra para famílias pobres (cashback).",
  q71: "Reduzir a jornada padrão para 40 horas semanais e acabar com a escala de 6 dias trabalhados por 1 de descanso sem diminuir salários.",
  q72: "Criar uma lei que garanta previdência do INSS, remuneração mínima por hora e cobertura em acidentes para motoristas e entregadores de app.",
  q73: "Empresas serão fiscalizadas e multadas se não pagarem salários exatamente iguais para homens e mulheres que exercem a mesma função.",
  q74: "Criar um ministério exclusivo para combater o crime organizado em nível federal e reorganizar o papel das polícias e guardas municipais.",
  q75: "Manter regras rígidas que dificultam o acesso a armas de fogo e aumentar a fiscalização sobre clubes de tiro e CACs.",
  q76: "Criar leis obrigando redes como Instagram, WhatsApp e TikTok a removerem rapidamente conteúdos criminosos, desinformação e discurso de ódio.",
  q77: "Obrigar plataformas de streaming (como Netflix e Spotify) e empresas de inteligência artificial a pagarem direitos autorais a artistas brasileiros.",
  q78: "Acabar com as emendas parlamentares sem transparência (orçamento secreto), obrigando deputados a prestar contas de cada centavo público.",
  q79: "Acelerar a busca e perfuração de novos poços de petróleo pela Petrobras no litoral brasileiro para garantir combustíveis nacionais.",
  q80: "Criar regras onde empresas poluentes pagam multas e projetos que preservam a floresta ganham créditos negociáveis no mercado financeiro.",
  q81: "Construir universidades públicas federais dedicadas especialmente à formação superior de estudantes indígenas e atletas profissionais.",

  // Renan Santos (q82 a q94)
  q82: "Municípios muito pequenos que não arrecadam o suficiente para pagar suas contas serão fundidos à força com cidades vizinhas maiores.",
  q83: "Beneficiários do Bolsa Família que têm capacidade física para trabalhar serão obrigados a prestar serviços comunitários para manter o benefício.",
  q84: "Retirar a obrigação de gastos mínimos fixos do orçamento federal em saúde e educação e desvincular o reajuste do BPC do salário mínimo.",
  q85: "Autorizar o Exército a entrar com blindados e armas de guerra em áreas dominadas pelo crime e confiscar bens de suspeitos antes da condenação.",
  q86: "Construir penitenciárias de segurança máxima em locais isolados no deserto ou floresta, mantendo chefes do tráfico sem celular ou visitas normais.",
  q87: "Derrubar ocupações irregulares novas em até 48 horas e implementar plano para urbanizar ou remover favelas no prazo de 10 anos.",
  q88: "Substituir cotas raciais em vestibulares por bolsas de estudo baseadas em mérito e notas, priorizando verbas para engenharia e exatas.",
  q89: "Colocar policiais para administrar escolas públicas em áreas violentas e aplicar regras de disciplina rígida com suspensões e punições aos alunos.",
  q90: "Revisar livros didáticos escolares para retirar conteúdos anti-agronegócio e ensinar a importância da produção rural nas salas de aula.",
  q91: "Liberar a exploração e mineração de minerais raros e estratégicos dentro de reservas e terras indígenas com pagamento de compensação.",
  q92: "Acabar com a fila do SUS por ordem de chegada: pacientes mais graves passam à frente imediatamente, mesmo se tiverem chegado depois.",
  q93: "Partidos políticos só receberão dinheiro público do Fundo Partidário se os seus prefeitos cumprirem metas rígidas de corte de gastos e gestão.",
  q94: "O Brasil deve dominar o enriquecimento de urânio para produzir reatores e desenvolver armas de dissuasão militar para proteger seu território.",

  // Ronaldo Caiado (q95 a q105)
  q95: "Facções criminosas como PCC e Comando Vermelho serão legalmente enquadradas como grupos terroristas, com pena mínima de 45 anos para chefes.",
  q96: "Líderes de facção ficarão trancados em celas individuais, sem direito a visita íntima com mulheres e com todas as conversas com advogados gravadas.",
  q97: "Se um criminoso tiver bens caros (mansões, carros) sem comprovar renda lícita, o patrimônio é tomado imediatamente pelo Estado antes do julgamento.",
  q98: "Criar o Ministério da Segurança Pública e colocar o Exército e Marinha de forma fixa patrulhando as fronteiras contra o narcotráfico.",
  q99: "Criar uma polícia internacional sul-americana (SULPOL) para rastrear e bloquear o tráfico internacional de armas pesadas e drogas.",
  q100: "Assassinos de mulheres (feminicídio) terão que cumprir 90% da pena em regime fechado e perderão todos os bens para indenizar os filhos da vítima.",
  q101: "Réus condenados por tribunal de 2ª instância vão direto para a cadeia cumprir pena, sem poder aguardar recursos soltos no STJ ou STF.",
  q102: "Tolerância zero contra invasões de fazendas: a polícia agirá com força imediata para expulsar invasores e proteger produtores rurais.",
  q103: "Fiscalização dura contra o desmatamento ilegal na Amazônia combinada ao pagamento de dinheiro para quem mantém a mata nativa em pé.",
  q104: "Proibir indicações políticas em diretorias de empresas estatais federais, exigindo currículo técnico comprovado e metas de gestão.",
  q105: "Criar uma lista única e transparente de cirurgias no SUS, e os hospitais recebem mais verba conforme a rapidez e sucesso das operações.",

  // Rui Costa Pimenta (q106 a q117)
  q106: "Todos os bancos privados do país são estatizados e o governo cancela as dívidas financeiras cobradas dos trabalhadores e do Estado.",
  q107: "O governo anula todas as privatizações já feitas no país (como Vale, Eletrobras e telefonia) e toma as empresas de volta sem pagar nada a investidores.",
  q108: "Petrobras 100% pública sob gestão de funcionários, fim da cotação em dólar e corte imediato de 50% no preço da gasolina e diesel nos postos.",
  q109: "Jornada máxima de trabalho reduzida para 35 horas semanais sem corte de salário e aumento geral imediato de 50% em todos os salários.",
  q110: "Acabar com o STF; juízes, desembargadores e procuradores passam a ser eleitos pelo voto da população e podem perder o cargo pelo voto popular.",
  q111: "Fim da Polícia Militar e garantia do direito para qualquer trabalhador da cidade ou do campo comprar, ter e portar armas para sua defesa.",
  q112: "Cassar as licenças de emissoras como TV Globo e grandes redes de comunicação privada, transformando-as em canais públicos geridos pelo povo.",
  q113: "Estatizar todas as faculdades particulares pagas, acabar com os vestibulares e garantir matrícula gratuita em faculdades federais a todos.",
  q114: "Mulheres se aposentam com 25 anos de trabalho e homens com 30 anos, recebendo 100% do salário que ganhavam na ativa.",
  q115: "O governo toma prédios e apartamentos vazios de imobiliárias e especuladores para dar a famílias pobres e proíbe despejos em todo o país.",
  q116: "Tomar todas as grandes fazendas improdutivas sem pagar indenização e demarcar imediatamente todas as terras reivindicadas por indígenas.",
  q117: "Romper relações com Estados Unidos e países ricos, apoiar a causa da Palestina e países sob sanções como Cuba e Venezuela.",

  // Samara (q118 a q129)
  q118: "Dobrar imediatamente o valor do salário mínimo nacional para restaurar o poder de compra e o padrão de vida de quem trabalha.",
  q119: "Extinguir imediatamente a escala de 6 dias trabalhados para 1 de folga (6x1) e reduzir a jornada sem nenhuma redução de salário.",
  q120: "O governo contrata diretamente trabalhadores desempregados para frentes públicas de obras em saneamento, asfalto e escolas nos bairros.",
  q121: "Suspender os pagamentos de juros da dívida pública para os grandes bancos e fazer uma auditoria popular para verificar a legitimidade da dívida.",
  q122: "Criar impostos pesados sobre fortunas de bilionários, grandes heranças de família e os lucros recordes dos bancos privados.",
  q123: "O governo assume a operação dos ônibus, trens e metrôs e a população passa a andar no transporte público de graça, com Tarifa Zero.",
  q124: "Estatizar grandes empresas privadas que controlam a produção de remédios, eletricidade e minérios para garantir preços populares.",
  q125: "Acabar com o vestibular: qualquer jovem tem direito automático e gratuito de entrar nas universidades públicas federais.",
  q126: "A polícia deixa de ser militarizada e passa a ser uma instituição civil com foco comunitário, e policiais que cometerem crimes respondem na Justiça comum.",
  q127: "Extinguir os grandes latifúndios rurais privados e redistribuir as terras para assentamento de famílias de pequenos agricultores sem-terra.",
  q128: "Desapropriar prédios e terrenos abandonados nos centros das grandes cidades para construir moradia popular para quem não tem onde morar.",
  q129: "Mulheres que decidirem interromper a gravidez poderão realizar o aborto de forma segura, humanizada e 100% gratuita através do SUS.",

  // Wilson Grassi (q130 a q139)
  q130: "Extinguir impostos federais (PIS, Cofins, IPI, CSLL) e criar uma taxa única debitada automaticamente na movimentação bancária.",
  q131: "Quem ganha até 5 salários mínimos (cerca de R$ 8.100 por mês) fica totalmente isento de pagar Imposto de Renda de Pessoa Física.",
  q132: "Reduzir o imposto cobrado sobre os lucros das empresas de 34% para 25% para estimular a abertura de novas empresas e fábricas no país.",
  q133: "Zerar os tributos patronais que as empresas pagam sobre a folha salarial dos funcionários para baratear a contratação com carteira assinada.",
  q134: "Implantar a Saúde Única (One Health), tratando a saúde humana, a vacinação de animais e a limpeza ambiental de forma integrada no SUS.",
  q135: "Criar hospitais veterinários públicos gratuitos, mutirões de castração de cães e gatos em castramóveis e punições duras contra maus-tratos.",
  q136: "Instalar bloqueadores de sinal de celular de alta tecnologia em todos os presídios para cortar o contato de líderes de facções com as ruas.",
  q137: "Eliminar a papelada burocrática exigida de empresas e cidadãos, unificando os cadastros e dados federais em um sistema digital único.",
  q138: "Dar autonomia para quem recebe subsídio habitacional escolher onde quer morar, perto do trabalho ou transporte, em vez de projetos distantes.",
  q139: "Qualquer lei ou benefício proposto no Congresso terá que comprovar de onde sairá o dinheiro antes de ser aprovada, para não estourar as contas.",

  // Romeu Zema (q140 a q150)
  q140: "Grandes facções do tráfico (como PCC e CV) serão enquadradas como grupos terroristas, permitindo o Exército nas ruas e prisão sem regalias.",
  q141: "O suspeito que for preso em flagrante pela terceira vez vai obrigatoriamente para a prisão preventiva, acabando com a soltura na audiência de custódia.",
  q142: "Jovens a partir de 16 anos responderão criminalmente como adultos perante a lei, inclusive para menores em casos graves de assassinato ou estupro.",
  q143: "Cada estado brasileiro terá permissão constitucional para criar suas próprias leis penais e endurecer penas de acordo com a sua realidade.",
  q144: "Políticos, juízes e deputados perdem o foro privilegiado e passam a responder na Justiça comum de primeira instância, exceto o Presidente.",
  q145: "Condenados por roubar ou desviar dinheiro público só terão direito a sair da cadeia ou progredir de pena se devolverem 100% do valor roubado.",
  q146: "Cortar bônus, auxílios e penduricalhos de juízes e servidores do alto escalão para que ninguém no país ganhe acima do teto constitucional.",
  q147: "Vender para a iniciativa privada empresas estatais federais como Petrobras, Correios e bancos públicos, usando o dinheiro para reduzir a dívida.",
  q148: "O governo entrega um voucher/bolsa escolar para que os pais de baixa renda possam matricular seus filhos em escolas particulares de sua escolha.",
  q149: "Criar avaliações regulares de metas e desempenho para funcionários públicos, permitindo a demissão de quem tiver baixo rendimento comprovado.",
  q150: "Ministros do STF terão mandatos com tempo fixo determinado (deixando de ser vitalício) e ficarão proibidos de derrubar leis sozinhos."
};

/**
 * Retorna uma explicação simples, fiel e acessível da proposta.
 */
export function getExplicacaoSimples(questaoId: string, textoProposta: string): string {
  if (EXPLICACOES_PROPOSTAS[questaoId]) {
    return EXPLICACOES_PROPOSTAS[questaoId];
  }

  // Fallback inteligente caso surja alguma questão dinâmica
  if (textoProposta.toLowerCase().includes("castraç")) {
    return "Propõe o uso de medicamentos hormonais para bloquear o apetite sexual de pessoas condenadas por crimes sexuais.";
  }
  if (textoProposta.toLowerCase().includes("maioridade")) {
    return "Propõe responsabilizar jovens criminalmente a partir de 16 anos para que respondam como adultos.";
  }
  if (textoProposta.toLowerCase().includes("privatiz")) {
    return "Propõe transferir o controle ou serviços de empresas estatais para empresas privadas.";
  }
  if (textoProposta.toLowerCase().includes("estatiz") || textoProposta.toLowerCase().includes("reestatiz")) {
    return "Propõe que o governo reassuma ou controle empresas e serviços fundamentais para a população.";
  }
  if (textoProposta.toLowerCase().includes("imposto") || textoProposta.toLowerCase().includes("tribut")) {
    return "Muda a forma ou a quantidade de impostos que cidadãos e empresas pagam no dia a dia.";
  }
  if (textoProposta.toLowerCase().includes("salário") || textoProposta.toLowerCase().includes("jornada")) {
    return "Altera regras trabalhistas sobre remuneração ou a quantidade de dias e horas de trabalho.";
  }
  if (textoProposta.toLowerCase().includes("segurança") || textoProposta.toLowerCase().includes("pena")) {
    return "Altera as leis penais ou regras de atuação policial para combater crimes no país.";
  }

  return "Esta medida estabelece uma regra prática sobre como o governo federal deve agir nesta área.";
}
