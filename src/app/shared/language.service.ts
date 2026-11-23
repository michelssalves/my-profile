import { Injectable, signal } from '@angular/core';

export type Language = 'pt' | 'en' | 'es';

const STORAGE_KEY = 'portfolio_lang';
const SUPPORTED_LANGUAGES: Language[] = ['pt', 'en', 'es'];

const translations: Record<Language, Record<string, string>> = {
  pt: {
    'nav.skip': 'Pular para o conteúdo',
    'nav.contact': 'Contato',
    'hero.eyebrow': 'Desenvolvedor Protheus e web',
    'hero.title': 'Protheus, integrações e sites',
    'hero.titleHighlight': 'que funcionam no dia a dia do negócio.',
    'hero.projects': 'Projetos',
    'hero.cv': 'Baixar currículo',
    'hero.cvShort': 'Currículo',
    'hero.photoAlt': 'Foto de Michel Alves',
    'hero.language': 'Idioma',
    'hero.availableTitle': 'Disponível',
    'stack.title': 'Stack',
    'stack.front': 'Front-end',
    'stack.back': 'Back-end',
    'stack.erp': 'ERP',
    'projects.title': 'Projetos',
    'projects.group.client': 'Sites para clientes',
    'projects.group.client.badge': 'Sites publicados',
    'projects.group.client.desc': 'Sites institucionais em produção, entregues do layout ao deploy.',
    'projects.tag.live': 'no ar',
    'projects.group.erp': 'Telas web para o Protheus',
    'projects.group.erp.badge': 'ERP TOTVS Protheus',
    'projects.group.erp.desc': 'Relatórios e dashboards em Angular + PO-UI que rodam dentro do Protheus.',
    'projects.tag.demo': 'dados fictícios',
    'projects.memorial':
      'Site institucional com planos, serviços, galeria do crematório e atendimento direto pelo WhatsApp.',
    'projects.santoanjo':
      'Site one-page com serviços, plano preventivo e canais de atendimento 24h, otimizado para busca local.',
    'projects.confianca':
      'Site institucional seguindo o mesmo modelo dos anteriores, adaptado à identidade da funerária.',
    'projects.mural':
      'Plataforma para funerárias publicarem memoriais online, com homenagens, velas virtuais, moderação e artes para impressão.',
    'projects.zubartez':
      'Portfólio de ilustrador com visual cartoon, orçamento pelo WhatsApp e painel para o artista publicar as próprias obras.',
    'projects.dashboardrh':
      'Painel de indicadores de RH em PO-UI, consumindo dados do Protheus via REST.',
    'projects.invoice':
      'Notas de entrada com impostos retidos e SLA do 3-way à digitação, aberto dentro do Protheus e migrado de REST para WebChannel.',
    'projects.ibscbs':
      'Livro fiscal item a item com CBS e IBS da reforma tributária, CST e cClassTrib, com consulta otimizada no banco.',
    'projects.aprovacoes':
      'Pedidos, notas e solicitações de pagamento parados na alçada, com fluxo por nível, indicadores, gráficos e Excel.',
    'projects.estoque':
      'Painel de custos de estoque e compras no modelo Protheus, em Vue: indicadores, filtros e gráficos de preço.',
    'projects.visit': 'Visitar site',
    'projects.demo': 'Ver demonstração',
    'projects.source': 'Código',
    'projects.newTab': 'abre em nova aba',
    'feat.label': 'Destaques',
    'feat.prev': 'Destaque anterior',
    'feat.next': 'Próximo destaque',
    'feat.car.short': 'Vídeos no Carro',
    'feat.car.badge': 'Novidade · Android Auto',
    'feat.car.title': 'Vídeos no Carro.',
    'feat.car.titleHighlight': 'Chega de “já chegou?”.',
    'feat.car.lead':
      'Drive, YouTube, Disney+, Netflix e Prime Video direto na tela da central multimídia. Você escolhe o que entra; as crianças escolhem o que assistir, com botões grandes feitos para dedinhos.',
    'feat.car.b1': 'Todos os apps numa tela só: Drive, YouTube, Disney+, Netflix e Prime Video.',
    'feat.car.b2':
      'O vídeo nunca para: o episódio segue rodando do começo ao fim, sem travar nem perder a cena.',
    'feat.car.b3':
      'Trava em movimento opcional: você decide nas configurações se a imagem se esconde com o carro andando — o som continua.',
    'feat.car.b4': 'Busca por voz e Compartilhar do YouTube direto para o carro.',
    'feat.car.momentsLabel': 'Feito para aqueles minutos que parecem horas:',
    'feat.car.m1': 'Fila do drive-thru',
    'feat.car.m2': 'Esperando a saída da escola',
    'feat.car.m3': 'Parada na estrada',
    'feat.car.m4': 'Lava-rápido',
    'feat.car.cta': 'Quero no meu carro',
    'feat.car.fineprint':
      'Para celulares Android com Android Auto. Instalação assistida, fora da Play Store.',
    'feat.car.whatsMessage':
      'Olá Michel! Vi o app Vídeos no Carro no seu portfólio e quero ter no meu carro.',
    'feat.car.audioOnly': 'O vídeo segue rodando',
    'feat.car.audioOnlySub': 'trava ligada: só a imagem se esconde',
    'feat.car.lockOptional': 'trava opcional',
    'feat.car.stateStop': 'Parado · tela liberada',
    'feat.car.stateGo': 'Andando · vídeo rodando',
    'feat.trilhas.short': 'Trilhas',
    'feat.trilhas.badge': 'Para professores e palestrantes',
    'feat.trilhas.title': 'Trilhas.',
    'feat.trilhas.titleHighlight': 'Sua aula sem sair dos trilhos.',
    'feat.trilhas.lead':
      'Monte aulas e palestras como um mapa mental: cole o roteiro, organize os tópicos e apresente seguindo a trilha, sem se perder no meio do caminho nem esquecer o ponto principal.',
    'feat.trilhas.b1': 'Cole o roteiro e ele vira cards prontos para organizar.',
    'feat.trilhas.b2': 'Arraste os tópicos no mapa até a sequência ficar redonda.',
    'feat.trilhas.b3': 'Versículos, pontos-chave e imagens no painel de cada tópico.',
    'feat.trilhas.b4': 'Edite e publique em tempo real; entre com a conta Google.',
    'feat.trilhas.cta': 'Montar minha aula',
    'feat.trilhas.center': 'Minha aula',
    'feat.trilhas.n1': 'Abertura',
    'feat.trilhas.n2': 'Contexto',
    'feat.trilhas.n3': 'Exemplos',
    'feat.trilhas.n4': 'Aplicação',
    'feat.margem.short': 'MargemHub',
    'feat.margem.badge': 'Mercado Livre · Lucro de verdade',
    'feat.margem.title': 'MargemHub.',
    'feat.margem.titleHighlight': 'Pare de pagar para vender.',
    'feat.margem.lead':
      'Cada venda no Mercado Livre leva taxa, frete, promoção e imposto. O MargemHub faz essa conta anúncio por anúncio e mostra, na hora, onde você ganha e onde está perdendo dinheiro sem perceber. Controle total da lucratividade: mais ganho, menos prejuízo.',
    'feat.margem.b1':
      'Margem real de cada anúncio, já descontando taxa, frete, promoção e imposto.',
    'feat.margem.b2': 'Filtro por margem mínima: os anúncios no prejuízo aparecem na hora.',
    'feat.margem.b3':
      'Catálogo com o custo e as medidas de cada produto, para a conta fechar certinho.',
    'feat.margem.b4': 'Ajuste preço e anúncio direto no Mercado Livre, sem sair do painel.',
    'feat.margem.cta': 'Quero controlar minhas margens',
    'feat.margem.profit': 'Lucro do mês',
    'feat.margem.p1': 'Fone Bluetooth',
    'feat.margem.p2': 'Garrafa térmica',
    'feat.margem.p3': 'Kit ferramentas',
    'feat.margem.p4': 'Mochila notebook',
    'feat.margem.alert': '1 anúncio vendendo no prejuízo',
    'feat.margem.fixed': 'Preço ajustado: prejuízo virou lucro',
    'feat.english.short': 'Inglês',
    'feat.english.badge': 'Inglês todo dia',
    'feat.english.title': 'Learning English.',
    'feat.english.titleHighlight': 'Ouvir e falar, 10 minutos por dia.',
    'feat.english.lead':
      'Para quem já tentou de tudo e sempre parou no meio: teste de nível, trilha sob medida e prática de fala com o próprio app ouvindo a sua pronúncia.',
    'feat.english.b1': 'Teste de nível que monta a trilha certa para você.',
    'feat.english.b2': 'Fale em voz alta e o app confere a sua pronúncia.',
    'feat.english.b3': 'Meta diária de 5, 10 ou 20 minutos e revisão para não esquecer.',
    'feat.english.b4': 'Instala no celular como app e salva o progresso na nuvem.',
    'feat.english.cta': 'Começar agora',
    'feat.english.streak': '7 dias seguidos',
    'feat.english.score': 'Pronúncia ótima!',
    'feat.bomba.short': 'Quiz da Bomba',
    'feat.bomba.badge': 'Jogo em grupo · Bíblia',
    'feat.bomba.title': 'Quiz Bíblico da Bomba.',
    'feat.bomba.titleHighlight': 'Responda antes que exploda!',
    'feat.bomba.lead':
      'Perguntas bíblicas contra o relógio, com pavio aceso, sons e pódio no final. Perfeito para células, escola bíblica, jovens e noite em família: todo mundo aprende brincando.',
    'feat.bomba.b1': 'Cronômetro de bomba que deixa cada resposta emocionante.',
    'feat.bomba.b2': 'Jogue todo mundo na mesma tela ou mande um convite para cada celular.',
    'feat.bomba.b3': 'Pódio com a classificação no final da partida.',
    'feat.bomba.b4': 'Cadastre, importe e exporte as suas próprias perguntas.',
    'feat.bomba.cta': 'Jogar agora',
    'feat.bomba.q': 'Quem construiu a arca?',
    'feat.bomba.missLabel': 'Erros da rodada',
    'feat.bomba.m1': 'Quantos dias choveu no dilúvio?',
    'feat.bomba.m2': 'Quem derrotou Golias?',
    'feat.bomba.o1': 'Moisés',
    'feat.bomba.o2': 'Noé',
    'feat.bomba.o3': 'Davi',
    'feat.bomba.o4': 'Abraão',
    'exp.title': 'Experiência',
    'exp.tcp.role': 'Programador ADVPL',
    'exp.tcp.period': 'Atual',
    'exp.tcp.desc':
      'Integrações do Protheus com APIs de terceiros, endpoints REST em TLPP, telas PO-UI, relatórios e manutenção evolutiva.',
    'exp.freela.company': 'Freelance',
    'exp.freela.role': 'Desenvolvedor web',
    'exp.freela.period': 'Atual',
    'exp.freela.desc':
      'Sites institucionais e sistemas web para pequenas empresas, do levantamento ao deploy e suporte.',
    'exp.elevacao.role': 'Analista de Suporte Protheus',
    'exp.elevacao.period': 'Anterior',
    'exp.elevacao.desc':
      'Suporte em processos fiscais e operacionais: emissão de nota, importação de XML e rotinas do ERP.',
    'exp.rdp.role': 'Programador PHP',
    'exp.rdp.period': 'Anterior',
    'exp.rdp.desc':
      'Desenvolvimento em PHP e JavaScript, manutenção de sistemas legados, suporte técnico e implantação TOTVS.',
    'exp.education': 'Formação',
    'exp.educationText': 'Análise e Desenvolvimento de Sistemas — Faculdade Camões (2020–2022)',
    'exp.howTitle': 'Como eu trabalho',
    'exp.how1': 'Entendo o processo do negócio antes de escrever código.',
    'exp.how2': 'Entrego em etapas curtas, com algo funcionando para validar.',
    'exp.how3': 'Deixo o projeto documentado e fácil de manter depois.',
    'contact.title': 'Fale comigo',
    'contact.whats': 'Chamar no WhatsApp',
    'contact.whatsMessage': 'Olá Michel, vi seu portfólio e gostaria de conversar.',
    'contact.mailSubject': 'Contato pelo portfólio',
    'contact.mailBody': 'Olá Michel, vi seu portfólio e gostaria de conversar.',
    'footer.text': 'Feito com Angular.'
  },
  en: {
    'nav.skip': 'Skip to content',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Protheus & web developer',
    'hero.title': 'Protheus, integrations and websites',
    'hero.titleHighlight': 'that work in day-to-day business.',
    'hero.projects': 'Projects',
    'hero.cv': 'Download resume',
    'hero.cvShort': 'Resume',
    'hero.photoAlt': 'Photo of Michel Alves',
    'hero.language': 'Language',
    'hero.availableTitle': 'Available',
    'stack.title': 'Stack',
    'stack.front': 'Front-end',
    'stack.back': 'Back-end',
    'stack.erp': 'ERP',
    'projects.title': 'Projects',
    'projects.group.client': 'Client websites',
    'projects.group.client.badge': 'Live websites',
    'projects.group.client.desc': 'Company websites in production, delivered from layout to deploy.',
    'projects.tag.live': 'live',
    'projects.group.erp': 'Web screens for Protheus',
    'projects.group.erp.badge': 'TOTVS Protheus ERP',
    'projects.group.erp.desc': 'Angular + PO-UI reports and dashboards that run inside Protheus.',
    'projects.tag.demo': 'fictitious data',
    'projects.memorial':
      'Business website with plans, services, crematorium gallery and direct WhatsApp support.',
    'projects.santoanjo':
      'One-page website with services, pre-need plan and 24h support channels, optimized for local search.',
    'projects.confianca':
      'Business website following the same model as the previous ones, adapted to the brand identity.',
    'projects.mural':
      'Platform for funeral homes to publish online memorials, with tributes, virtual candles, moderation and printable artwork.',
    'projects.zubartez':
      'Illustrator portfolio with a cartoon look, quotes via WhatsApp and an admin panel for the artist to publish his own work.',
    'projects.dashboardrh':
      'HR KPI dashboard built with PO-UI, consuming Protheus data through REST.',
    'projects.invoice':
      'Incoming invoices with withheld taxes and 3-way-to-entry SLA, running inside Protheus and migrated from REST to WebChannel.',
    'projects.ibscbs':
      'Item-level tax ledger with Brazil’s new CBS and IBS taxes, CST and cClassTrib, backed by a tuned database query.',
    'projects.aprovacoes':
      'Purchase orders, invoices and payment requests waiting for approval, with per-level flow, KPIs, charts and Excel.',
    'projects.estoque':
      'Stock cost and purchasing dashboard following the Protheus model, built in Vue: KPIs, filters and price charts.',
    'projects.visit': 'Visit website',
    'projects.demo': 'View demo',
    'projects.source': 'Source',
    'projects.newTab': 'opens in a new tab',
    'feat.label': 'Highlights',
    'feat.prev': 'Previous highlight',
    'feat.next': 'Next highlight',
    'feat.car.short': 'Car Videos',
    'feat.car.badge': 'New · Android Auto',
    'feat.car.title': 'Car Videos.',
    'feat.car.titleHighlight': 'No more “are we there yet?”.',
    'feat.car.lead':
      'Drive, YouTube, Disney+, Netflix and Prime Video right on the car infotainment screen. You choose what goes in; the kids choose what to watch, with big buttons made for little fingers.',
    'feat.car.b1': 'Every app on one screen: Drive, YouTube, Disney+, Netflix and Prime Video.',
    'feat.car.b2':
      'The video never stops: the episode keeps playing from start to finish, no freezing, no lost scenes.',
    'feat.car.b3':
      'Optional motion lock: you decide in settings whether the picture hides while driving — the sound keeps going.',
    'feat.car.b4': 'Voice search and YouTube Share straight to the car.',
    'feat.car.momentsLabel': 'Made for those minutes that feel like hours:',
    'feat.car.m1': 'Drive-thru line',
    'feat.car.m2': 'Waiting at school pickup',
    'feat.car.m3': 'Road trip stop',
    'feat.car.m4': 'Car wash',
    'feat.car.cta': 'I want it in my car',
    'feat.car.fineprint':
      'For Android phones with Android Auto. Assisted install, outside the Play Store.',
    'feat.car.whatsMessage':
      'Hi Michel! I saw the Car Videos app in your portfolio and I want it in my car.',
    'feat.car.audioOnly': 'The video keeps playing',
    'feat.car.audioOnlySub': 'lock on: only the picture hides',
    'feat.car.lockOptional': 'optional lock',
    'feat.car.stateStop': 'Parked · screen on',
    'feat.car.stateGo': 'Driving · video playing',
    'feat.trilhas.short': 'Trilhas',
    'feat.trilhas.badge': 'For teachers and speakers',
    'feat.trilhas.title': 'Trilhas.',
    'feat.trilhas.titleHighlight': 'Keep your talk on track.',
    'feat.trilhas.lead':
      'Build lessons and talks as a mind map: paste your script, organize the topics and present by following the path, without getting lost or forgetting the main point.',
    'feat.trilhas.b1': 'Paste the script and it turns into cards ready to organize.',
    'feat.trilhas.b2': 'Drag topics around the map until the flow feels right.',
    'feat.trilhas.b3': 'Verses, key points and images in each topic panel.',
    'feat.trilhas.b4': 'Edit and publish in real time; sign in with Google.',
    'feat.trilhas.cta': 'Build my lesson',
    'feat.trilhas.center': 'My lesson',
    'feat.trilhas.n1': 'Opening',
    'feat.trilhas.n2': 'Context',
    'feat.trilhas.n3': 'Examples',
    'feat.trilhas.n4': 'Takeaway',
    'feat.margem.short': 'MargemHub',
    'feat.margem.badge': 'Mercado Livre · Real profit',
    'feat.margem.title': 'MargemHub.',
    'feat.margem.titleHighlight': 'Stop paying to sell.',
    'feat.margem.lead':
      'Every sale on Mercado Livre carries fees, shipping, promotions and taxes. MargemHub does the math listing by listing and shows, right away, where you make money and where you are losing it without noticing. Full control of profitability: more gains, fewer losses.',
    'feat.margem.b1': 'Real margin for every listing, after fees, shipping, promotions and taxes.',
    'feat.margem.b2': 'Minimum-margin filter: listings selling at a loss show up instantly.',
    'feat.margem.b3':
      'Catalog with the cost and dimensions of each product, so the numbers add up.',
    'feat.margem.b4':
      'Adjust price and listing straight on Mercado Livre, without leaving the dashboard.',
    'feat.margem.cta': 'Take control of my margins',
    'feat.margem.profit': 'Monthly profit',
    'feat.margem.p1': 'Bluetooth headset',
    'feat.margem.p2': 'Thermal bottle',
    'feat.margem.p3': 'Tool kit',
    'feat.margem.p4': 'Laptop backpack',
    'feat.margem.alert': '1 listing selling at a loss',
    'feat.margem.fixed': 'Price adjusted: loss turned into profit',
    'feat.english.short': 'English',
    'feat.english.badge': 'English every day',
    'feat.english.title': 'Learning English.',
    'feat.english.titleHighlight': 'Listen and speak, 10 minutes a day.',
    'feat.english.lead':
      'For anyone who tried everything and always quit halfway: placement test, a tailored path and speaking practice with the app listening to your pronunciation.',
    'feat.english.b1': 'Placement test that builds the right path for you.',
    'feat.english.b2': 'Speak out loud and the app checks your pronunciation.',
    'feat.english.b3': 'Daily goal of 5, 10 or 20 minutes and reviews so you don’t forget.',
    'feat.english.b4': 'Installs on your phone like an app and saves progress to the cloud.',
    'feat.english.cta': 'Start now',
    'feat.english.streak': '7-day streak',
    'feat.english.score': 'Great pronunciation!',
    'feat.bomba.short': 'Bomb Quiz',
    'feat.bomba.badge': 'Group game · Bible',
    'feat.bomba.title': 'Bible Bomb Quiz.',
    'feat.bomba.titleHighlight': 'Answer before it blows!',
    'feat.bomba.lead':
      'Bible questions against the clock, with a lit fuse, sounds and a podium at the end. Perfect for small groups, Sunday school, youth nights and family time: everyone learns while playing.',
    'feat.bomba.b1': 'Bomb timer that makes every answer exciting.',
    'feat.bomba.b2': 'Everyone on the same screen or one invite per phone.',
    'feat.bomba.b3': 'Podium with the ranking at the end of the match.',
    'feat.bomba.b4': 'Add, import and export your own questions.',
    'feat.bomba.cta': 'Play now',
    'feat.bomba.q': 'Who built the ark?',
    'feat.bomba.missLabel': 'Missed this round',
    'feat.bomba.m1': 'How many days did it rain in the flood?',
    'feat.bomba.m2': 'Who defeated Goliath?',
    'feat.bomba.o1': 'Moses',
    'feat.bomba.o2': 'Noah',
    'feat.bomba.o3': 'David',
    'feat.bomba.o4': 'Abraham',
    'exp.title': 'Experience',
    'exp.tcp.role': 'ADVPL Programmer',
    'exp.tcp.period': 'Current',
    'exp.tcp.desc':
      'Protheus integrations with third-party APIs, TLPP REST endpoints, PO-UI screens, reports and ongoing improvements.',
    'exp.freela.company': 'Freelance',
    'exp.freela.role': 'Web developer',
    'exp.freela.period': 'Current',
    'exp.freela.desc':
      'Business websites and web systems for small companies, from requirements to deploy and support.',
    'exp.elevacao.role': 'Protheus Support Analyst',
    'exp.elevacao.period': 'Previous',
    'exp.elevacao.desc':
      'Support for fiscal and operational processes: invoice issuing, XML import and ERP routines.',
    'exp.rdp.role': 'PHP Programmer',
    'exp.rdp.period': 'Previous',
    'exp.rdp.desc':
      'PHP and JavaScript development, legacy system maintenance, technical support and TOTVS implementation.',
    'exp.education': 'Education',
    'exp.educationText': 'Systems Analysis and Development — Camões College (2020–2022)',
    'exp.howTitle': 'How I work',
    'exp.how1': 'I understand the business process before writing code.',
    'exp.how2': 'I deliver in short steps, with something working to validate.',
    'exp.how3': 'I leave the project documented and easy to maintain.',
    'contact.title': 'Get in touch',
    'contact.whats': 'Message on WhatsApp',
    'contact.whatsMessage': 'Hi Michel, I saw your portfolio and would like to talk.',
    'contact.mailSubject': 'Contact from portfolio',
    'contact.mailBody': 'Hi Michel, I saw your portfolio and would like to talk.',
    'footer.text': 'Built with Angular.'
  },
  es: {
    'nav.skip': 'Saltar al contenido',
    'nav.contact': 'Contacto',
    'hero.eyebrow': 'Desarrollador Protheus y web',
    'hero.title': 'Protheus, integraciones y sitios',
    'hero.titleHighlight': 'que funcionan en el día a día del negocio.',
    'hero.projects': 'Proyectos',
    'hero.cv': 'Descargar CV',
    'hero.cvShort': 'CV',
    'hero.photoAlt': 'Foto de Michel Alves',
    'hero.language': 'Idioma',
    'hero.availableTitle': 'Disponible',
    'stack.title': 'Stack',
    'stack.front': 'Front-end',
    'stack.back': 'Back-end',
    'stack.erp': 'ERP',
    'projects.title': 'Proyectos',
    'projects.group.client': 'Sitios para clientes',
    'projects.group.client.badge': 'Sitios publicados',
    'projects.group.client.desc': 'Sitios institucionales en producción, entregados del diseño al deploy.',
    'projects.tag.live': 'en línea',
    'projects.group.erp': 'Pantallas web para Protheus',
    'projects.group.erp.badge': 'ERP TOTVS Protheus',
    'projects.group.erp.desc': 'Reportes y dashboards en Angular + PO-UI que se ejecutan dentro de Protheus.',
    'projects.tag.demo': 'datos ficticios',
    'projects.memorial':
      'Sitio institucional con planes, servicios, galería del crematorio y atención directa por WhatsApp.',
    'projects.santoanjo':
      'Sitio one-page con servicios, plan preventivo y canales de atención 24h, optimizado para búsqueda local.',
    'projects.confianca':
      'Sitio institucional con el mismo modelo de los anteriores, adaptado a la identidad de la funeraria.',
    'projects.mural':
      'Plataforma para que funerarias publiquen memoriales online, con homenajes, velas virtuales, moderación y artes para imprimir.',
    'projects.zubartez':
      'Portafolio de ilustrador con estilo cartoon, presupuestos por WhatsApp y panel para que el artista publique sus propias obras.',
    'projects.dashboardrh':
      'Panel de indicadores de RRHH en PO-UI, consumiendo datos de Protheus vía REST.',
    'projects.invoice':
      'Facturas de entrada con impuestos retenidos y SLA del 3-way a la digitación, dentro de Protheus y migrado de REST a WebChannel.',
    'projects.ibscbs':
      'Libro fiscal ítem por ítem con CBS e IBS de la reforma tributaria brasileña, CST y cClassTrib, con consulta optimizada.',
    'projects.aprovacoes':
      'Pedidos, facturas y solicitudes de pago pendientes de aprobación, con flujo por nivel, indicadores, gráficos y Excel.',
    'projects.estoque':
      'Panel de costos de inventario y compras en el modelo Protheus, en Vue: indicadores, filtros y gráficos de precio.',
    'projects.visit': 'Visitar sitio',
    'projects.demo': 'Ver demo',
    'projects.source': 'Código',
    'projects.newTab': 'abre en una nueva pestaña',
    'feat.label': 'Destacados',
    'feat.prev': 'Destacado anterior',
    'feat.next': 'Siguiente destacado',
    'feat.car.short': 'Videos en el Auto',
    'feat.car.badge': 'Novedad · Android Auto',
    'feat.car.title': 'Videos en el Auto.',
    'feat.car.titleHighlight': 'Adiós al “¿ya llegamos?”.',
    'feat.car.lead':
      'Drive, YouTube, Disney+, Netflix y Prime Video directo en la pantalla multimedia del auto. Tú eliges qué entra; los niños eligen qué ver, con botones grandes hechos para deditos.',
    'feat.car.b1':
      'Todas las apps en una sola pantalla: Drive, YouTube, Disney+, Netflix y Prime Video.',
    'feat.car.b2':
      'El video nunca se detiene: el episodio sigue de principio a fin, sin trabarse ni perder la escena.',
    'feat.car.b3':
      'Bloqueo en movimiento opcional: tú decides en la configuración si la imagen se oculta con el auto en marcha; el sonido sigue.',
    'feat.car.b4': 'Búsqueda por voz y Compartir de YouTube directo al auto.',
    'feat.car.momentsLabel': 'Hecho para esos minutos que parecen horas:',
    'feat.car.m1': 'Fila del autoservicio',
    'feat.car.m2': 'Esperando la salida del colegio',
    'feat.car.m3': 'Parada en la ruta',
    'feat.car.m4': 'Lavado de autos',
    'feat.car.cta': 'Lo quiero en mi auto',
    'feat.car.fineprint':
      'Para celulares Android con Android Auto. Instalación asistida, fuera de Play Store.',
    'feat.car.whatsMessage':
      '¡Hola Michel! Vi la app Videos en el Auto en tu portafolio y la quiero en mi auto.',
    'feat.car.audioOnly': 'El video sigue corriendo',
    'feat.car.audioOnlySub': 'bloqueo activo: solo se oculta la imagen',
    'feat.car.lockOptional': 'bloqueo opcional',
    'feat.car.stateStop': 'Detenido · pantalla activa',
    'feat.car.stateGo': 'En marcha · video corriendo',
    'feat.trilhas.short': 'Trilhas',
    'feat.trilhas.badge': 'Para profesores y oradores',
    'feat.trilhas.title': 'Trilhas.',
    'feat.trilhas.titleHighlight': 'Tu clase sin salirte del camino.',
    'feat.trilhas.lead':
      'Arma clases y charlas como un mapa mental: pega el guion, organiza los temas y presenta siguiendo la ruta, sin perderte ni olvidar el punto principal.',
    'feat.trilhas.b1': 'Pega el guion y se convierte en tarjetas listas para organizar.',
    'feat.trilhas.b2': 'Arrastra los temas en el mapa hasta que la secuencia quede redonda.',
    'feat.trilhas.b3': 'Versículos, puntos clave e imágenes en el panel de cada tema.',
    'feat.trilhas.b4': 'Edita y publica en tiempo real; entra con tu cuenta Google.',
    'feat.trilhas.cta': 'Armar mi clase',
    'feat.trilhas.center': 'Mi clase',
    'feat.trilhas.n1': 'Apertura',
    'feat.trilhas.n2': 'Contexto',
    'feat.trilhas.n3': 'Ejemplos',
    'feat.trilhas.n4': 'Aplicación',
    'feat.margem.short': 'MargemHub',
    'feat.margem.badge': 'Mercado Libre · Ganancia real',
    'feat.margem.title': 'MargemHub.',
    'feat.margem.titleHighlight': 'Deja de pagar por vender.',
    'feat.margem.lead':
      'Cada venta en Mercado Libre lleva comisión, envío, promoción e impuestos. MargemHub hace esa cuenta publicación por publicación y muestra al instante dónde ganas y dónde pierdes dinero sin darte cuenta. Control total de la rentabilidad: más ganancia, menos pérdida.',
    'feat.margem.b1':
      'Margen real de cada publicación, ya descontando comisión, envío, promoción e impuestos.',
    'feat.margem.b2':
      'Filtro por margen mínimo: las publicaciones con pérdida aparecen al instante.',
    'feat.margem.b3':
      'Catálogo con el costo y las medidas de cada producto, para que la cuenta cierre.',
    'feat.margem.b4': 'Ajusta precio y publicación directo en Mercado Libre, sin salir del panel.',
    'feat.margem.cta': 'Quiero controlar mis márgenes',
    'feat.margem.profit': 'Ganancia del mes',
    'feat.margem.p1': 'Auricular Bluetooth',
    'feat.margem.p2': 'Botella térmica',
    'feat.margem.p3': 'Kit de herramientas',
    'feat.margem.p4': 'Mochila para notebook',
    'feat.margem.alert': '1 publicación vendiendo con pérdida',
    'feat.margem.fixed': 'Precio ajustado: la pérdida se volvió ganancia',
    'feat.english.short': 'Inglés',
    'feat.english.badge': 'Inglés todos los días',
    'feat.english.title': 'Learning English.',
    'feat.english.titleHighlight': 'Escuchar y hablar, 10 minutos al día.',
    'feat.english.lead':
      'Para quien ya probó de todo y siempre abandonó a la mitad: prueba de nivel, ruta a medida y práctica oral con la app escuchando tu pronunciación.',
    'feat.english.b1': 'Prueba de nivel que arma la ruta correcta para ti.',
    'feat.english.b2': 'Habla en voz alta y la app revisa tu pronunciación.',
    'feat.english.b3': 'Meta diaria de 5, 10 o 20 minutos y repaso para no olvidar.',
    'feat.english.b4': 'Se instala en el celular como app y guarda el progreso en la nube.',
    'feat.english.cta': 'Empezar ahora',
    'feat.english.streak': '7 días seguidos',
    'feat.english.score': '¡Pronunciación excelente!',
    'feat.bomba.short': 'Quiz de la Bomba',
    'feat.bomba.badge': 'Juego en grupo · Biblia',
    'feat.bomba.title': 'Quiz Bíblico de la Bomba.',
    'feat.bomba.titleHighlight': '¡Responde antes de que explote!',
    'feat.bomba.lead':
      'Preguntas bíblicas contra el reloj, con mecha encendida, sonidos y podio al final. Ideal para células, escuela bíblica, jóvenes y noches en familia: todos aprenden jugando.',
    'feat.bomba.b1': 'Cronómetro de bomba que vuelve emocionante cada respuesta.',
    'feat.bomba.b2': 'Todos en la misma pantalla o una invitación para cada celular.',
    'feat.bomba.b3': 'Podio con la clasificación al final de la partida.',
    'feat.bomba.b4': 'Registra, importa y exporta tus propias preguntas.',
    'feat.bomba.cta': 'Jugar ahora',
    'feat.bomba.q': '¿Quién construyó el arca?',
    'feat.bomba.missLabel': 'Errores de la ronda',
    'feat.bomba.m1': '¿Cuántos días llovió en el diluvio?',
    'feat.bomba.m2': '¿Quién derrotó a Goliat?',
    'feat.bomba.o1': 'Moisés',
    'feat.bomba.o2': 'Noé',
    'feat.bomba.o3': 'David',
    'feat.bomba.o4': 'Abraham',
    'exp.title': 'Experiencia',
    'exp.tcp.role': 'Programador ADVPL',
    'exp.tcp.period': 'Actual',
    'exp.tcp.desc':
      'Integraciones de Protheus con APIs de terceros, endpoints REST en TLPP, pantallas PO-UI, reportes y mantenimiento evolutivo.',
    'exp.freela.company': 'Freelance',
    'exp.freela.role': 'Desarrollador web',
    'exp.freela.period': 'Actual',
    'exp.freela.desc':
      'Sitios institucionales y sistemas web para pequeñas empresas, del relevamiento al deploy y soporte.',
    'exp.elevacao.role': 'Analista de Soporte Protheus',
    'exp.elevacao.period': 'Anterior',
    'exp.elevacao.desc':
      'Soporte en procesos fiscales y operativos: emisión de facturas, importación de XML y rutinas del ERP.',
    'exp.rdp.role': 'Programador PHP',
    'exp.rdp.period': 'Anterior',
    'exp.rdp.desc':
      'Desarrollo en PHP y JavaScript, mantenimiento de sistemas legados, soporte técnico e implantación TOTVS.',
    'exp.education': 'Formación',
    'exp.educationText': 'Análisis y Desarrollo de Sistemas — Facultad Camões (2020–2022)',
    'exp.howTitle': 'Cómo trabajo',
    'exp.how1': 'Entiendo el proceso del negocio antes de escribir código.',
    'exp.how2': 'Entrego en etapas cortas, con algo funcionando para validar.',
    'exp.how3': 'Dejo el proyecto documentado y fácil de mantener.',
    'contact.title': 'Hablemos',
    'contact.whats': 'Escribir por WhatsApp',
    'contact.whatsMessage': 'Hola Michel, vi tu portafolio y me gustaría conversar.',
    'contact.mailSubject': 'Contacto desde portafolio',
    'contact.mailBody': 'Hola Michel, vi tu portafolio y me gustaría conversar.',
    'footer.text': 'Hecho con Angular.'
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Language>(this.getInitialLanguage());

  setLanguage(language: Language): void {
    this.lang.set(language);
    this.persistLanguage(language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
    }
  }

  t(key: string): string {
    return translations[this.lang()][key] ?? translations.pt[key] ?? key;
  }

  private getInitialLanguage(): Language {
    const stored = this.readStoredLanguage();
    if (stored) {
      return stored;
    }

    if (typeof navigator !== 'undefined') {
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('es')) return 'es';
      if (browserLanguage.startsWith('en')) return 'en';
    }

    return 'pt';
  }

  private readStoredLanguage(): Language | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value && SUPPORTED_LANGUAGES.includes(value as Language)) {
        return value as Language;
      }
    } catch {
      return null;
    }

    return null;
  }

  private persistLanguage(language: Language): void {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors in restricted environments.
    }
  }
}
