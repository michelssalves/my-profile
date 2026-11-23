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
    'projects.group.own': 'Projetos próprios',
    'projects.group.own.badge': 'Ideias minhas',
    'projects.group.own.desc':
      'Apps que criei para resolver problemas meus e de quem está por perto.',
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
    'projects.trilhas':
      'Editor de aulas em mapa mental: cola o roteiro, organiza os tópicos em cards com versículos e imagens e publica a trilha para apresentar.',
    'projects.english':
      'App para aprender inglês ouvindo e falando: teste de nível, trilha personalizada, prática de pronúncia por voz e revisão diária. Instala no celular.',
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
    'feat.car.badge': 'Projeto próprio · Android Auto',
    'feat.car.title': 'Vídeos no Carro.',
    'feat.car.titleHighlight': 'Chega de “já chegou?”.',
    'feat.car.lead':
      'Os desenhos que as crianças amam, do Google Drive e do YouTube, direto na tela da central multimídia. Você escolhe o que entra; elas escolhem o que assistir, com botões grandes feitos para dedinhos.',
    'feat.car.b1':
      'Só toca o que os pais liberaram: uma pasta do Drive e uma lista de vídeos do YouTube.',
    'feat.car.b2': 'Carro andando? A imagem some e o som continua — vira rádio de historinhas.',
    'feat.car.b3': 'Busca por voz: é só pedir o desenho.',
    'feat.car.b4':
      'Viu um vídeo legal? Toque em Compartilhar no YouTube e ele já aparece no carro.',
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
    'feat.car.audioOnly': 'Em movimento: só áudio',
    'feat.car.audioOnlySub': 'a historinha continua tocando',
    'feat.car.stateStop': 'Parado · tela liberada',
    'feat.car.stateGo': 'Andando · só som',
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
    'projects.group.own': 'Personal projects',
    'projects.group.own.badge': 'My own ideas',
    'projects.group.own.desc':
      'Apps I built to solve my own problems and those of people around me.',
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
    'projects.trilhas':
      'Mind-map lesson editor: paste the script, organize topics into cards with verses and images, and publish the path to present.',
    'projects.english':
      'App to learn English by listening and speaking: placement test, personalized path, voice pronunciation practice and daily review. Installs on your phone.',
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
    'feat.car.badge': 'Personal project · Android Auto',
    'feat.car.title': 'Car Videos.',
    'feat.car.titleHighlight': 'No more “are we there yet?”.',
    'feat.car.lead':
      'The cartoons kids love, from Google Drive and YouTube, right on the car infotainment screen. You choose what goes in; they choose what to watch, with big buttons made for little fingers.',
    'feat.car.b1': 'Only plays what parents approved: one Drive folder and one YouTube video list.',
    'feat.car.b2':
      'Car moving? The picture goes away and the sound keeps playing — it becomes a story radio.',
    'feat.car.b3': 'Voice search: just ask for the cartoon.',
    'feat.car.b4': 'Found a great video? Tap Share on YouTube and it shows up in the car.',
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
    'feat.car.audioOnly': 'Moving: audio only',
    'feat.car.audioOnlySub': 'the story keeps playing',
    'feat.car.stateStop': 'Parked · screen on',
    'feat.car.stateGo': 'Driving · sound only',
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
    'projects.group.own': 'Proyectos propios',
    'projects.group.own.badge': 'Ideas mías',
    'projects.group.own.desc': 'Apps que creé para resolver problemas míos y de quienes me rodean.',
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
    'projects.trilhas':
      'Editor de clases en mapa mental: pegas el guion, organizas los temas en tarjetas con versículos e imágenes y publicas la ruta para presentar.',
    'projects.english':
      'App para aprender inglés escuchando y hablando: prueba de nivel, ruta personalizada, práctica de pronunciación por voz y repaso diario. Se instala en el celular.',
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
    'feat.car.badge': 'Proyecto propio · Android Auto',
    'feat.car.title': 'Videos en el Auto.',
    'feat.car.titleHighlight': 'Adiós al “¿ya llegamos?”.',
    'feat.car.lead':
      'Los dibujos que los niños aman, de Google Drive y YouTube, directo en la pantalla multimedia del auto. Tú eliges qué entra; ellos eligen qué ver, con botones grandes hechos para deditos.',
    'feat.car.b1':
      'Solo reproduce lo que los padres aprobaron: una carpeta de Drive y una lista de videos de YouTube.',
    'feat.car.b2':
      '¿El auto en marcha? La imagen desaparece y el sonido sigue: se vuelve una radio de cuentos.',
    'feat.car.b3': 'Búsqueda por voz: solo pide el dibujo.',
    'feat.car.b4': '¿Viste un video genial? Toca Compartir en YouTube y ya aparece en el auto.',
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
    'feat.car.audioOnly': 'En marcha: solo audio',
    'feat.car.audioOnlySub': 'el cuento sigue sonando',
    'feat.car.stateStop': 'Detenido · pantalla activa',
    'feat.car.stateGo': 'En marcha · solo sonido',
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
