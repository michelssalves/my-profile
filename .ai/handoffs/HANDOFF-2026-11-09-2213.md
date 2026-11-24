# HANDOFF — Portfólio Michel Alves (my-profile-angular)

> Última atualização: 2026-11-09 22:13 · Modelo de origem: Claude Opus 5.5
> Gatilho: G3 (pedido explícito do usuário) · Sessão nº 1

## 0. LEIA ANTES DE QUALQUER COISA
1. Leia `C:\Users\f_dra\.claude\CLAUDE.md` (regras globais do usuário; idioma pt-BR em tudo).
   Este projeto não tem `CLAUDE.md` próprio.
2. Leia este arquivo inteiro.
3. Não existe `.ai/ENV.md` neste projeto.
4. NÃO refaça o que está em "Já concluído". NÃO mexa no que está em "Fora de escopo".

## 1. Objetivo
Site de portfólio pessoal do Michel Alves (desenvolvedor full stack: Angular/React/Next.js/Vue,
PHP/Laravel, Protheus/ADVPL/TLPP/PO-UI). Angular 19+ com componentes standalone, tema escuro/claro,
três idiomas (PT/EN/ES). Publicado no GitHub Pages em
https://michelssalves.github.io/my-profile-angular/ . Nesta sessão o usuário pediu ajustes
visuais e de conteúdo (favicon, valor hora do currículo, contato, stack, efeitos, prints dos
projetos). Tudo foi feito, commitado, enviado e publicado.

## 2. Estado atual
- **Já concluído e validado:**
  - Favicon "MA" (círculo `#6aa8ff`, texto `#08111f`) em `public/favicon.svg` + `public/favicon.ico`,
    linkados com `?v=2` em `src/index.html`. Validado: arquivos baixados do site no ar têm MD5
    igual aos locais.
  - Valor hora R$ 65,00 → R$ 80,00 nos 3 PDFs (`public/CV.Michel.pdf`, `public/cv/CV.Michel.en.pdf`,
    `public/cv/CV.Michel.es.pdf`). Editado com PyMuPDF (redação + texto em Times 12pt). Validado
    por extração de texto e render PNG.
  - Contato: botão verde do WhatsApp com ícone, ícone do Gmail no e-mail, ícones na lista de
    contatos; botão flutuante do WhatsApp pulsando (mobile e desktop) em `src/app/app.html`.
  - Stack: removidos Tailwind CSS e Node.js; cada item com ícone (`public/stack/*.svg`; devicon
    v2.16.0 + PO-UI + 4 ícones genéricos desenhados à mão para REST/Protheus/ADVPL/TLPP).
  - Efeitos visuais inspirados em margemhub.com.br, rhuanbello.com e thainanprado.com.br:
    fundo com partículas (`src/app/shared/fx-background.ts`), grade sutil, revelar ao rolar,
    faixa da stack rolando, digitação no eyebrow, trecho do título em gradiente, borda girando
    na foto, barra de progresso de rolagem, hover nos chips/cards. Respeita
    `prefers-reduced-motion`.
  - Prints reais nos 6 cards de projeto (`public/projects/*.webp`, 1200px, WebP q78).
  - Commits na `master` (último `d8103c7`), push feito, `npm run deploy` rodado pelo usuário;
    site no ar confirmado servindo `main-D5ULY7FE.js` e `projects/memorial.webp` com 200.
  - Verificação visual feita no navegador local (Chrome) nos temas claro e escuro, desktop.
- **Em andamento:** nada a registrar.
- **Bloqueado:** nada a registrar.

## 3. Arquivos tocados
| Caminho absoluto | O que é | Estado |
|---|---|---|
| F:\Projetos\my-profile\src\index.html | links do favicon com `?v=2` | modificado |
| F:\Projetos\my-profile\public\favicon.svg / favicon.ico | ícone "MA" | criado / modificado |
| F:\Projetos\my-profile\public\CV.Michel.pdf, public\cv\CV.Michel.en.pdf, public\cv\CV.Michel.es.pdf | currículos com R$ 80,00 | modificado |
| F:\Projetos\my-profile\public\icons\ (whatsapp.svg, whatsapp-white.svg, gmail.svg) | ícones de contato | criado |
| F:\Projetos\my-profile\public\stack\*.svg | ícones da stack | criado |
| F:\Projetos\my-profile\public\projects\*.webp | prints dos projetos | criado |
| F:\Projetos\my-profile\src\app\shared\portfolio-data.ts | `StackItem` (name/icon/invertOnDark), `Project.image`, `whatsappUrl()` | modificado |
| F:\Projetos\my-profile\src\app\shared\fx-background.ts | canvas de partículas | criado |
| F:\Projetos\my-profile\src\app\shared\language.service.ts | `hero.title` dividido em `hero.title` + `hero.titleHighlight` (PT/EN/ES) | modificado |
| F:\Projetos\my-profile\src\app\app.ts / app.html / app.css | fundo, barra de progresso, revelar ao rolar, faixa da stack, botão flutuante | modificado |
| F:\Projetos\my-profile\src\app\sections\hero\* | digitação, título em gradiente, borda da foto, chips com ícone | modificado |
| F:\Projetos\my-profile\src\app\sections\contato\* | ícones WhatsApp/Gmail, botão `.btn.whats` | modificado |
| F:\Projetos\my-profile\src\app\sections\projetos\* | `<img>` do print no lugar do gradiente | modificado |
| F:\Projetos\my-profile\src\styles.css | tokens `--grad-1..3`, `--grid-line`, `.btn.whats`, grade, gradiente, revelar, `.invert-dark` | modificado |
| F:\Projetos\my-profile\angular.json | orçamento `anyComponentStyle` 4kB → 6kB (aviso) | modificado |

## 4. Decisões técnicas tomadas (e o PORQUÊ)
- **PDF editado direto, não regerado do Word:** o único `.docx` achado
  (`C:\Users\f_dra\OneDrive - TCP - TERMINAL DE CONTEINERES DE PARANAGUA SA\Documentos\CV.Michel.docx`)
  pode estar desatualizado em relação ao PDF; não há .docx das versões EN/ES. Fonte base-14
  `tiro` (Times-Roman) substitui a TimesNewRomanPSMT original sem diferença visível.
- **Favicon com `?v=2`:** o servidor já servia o ícone novo, mas o cache de favicon do Chrome
  ignora Ctrl+F5. Ao trocar o ícone de novo, incremente para `?v=3`.
- **Ícones locais em `public/`, não via CDN:** o site não depende de terceiro em runtime.
- **Revelar ao rolar com classe `reveal-pending` posta pelo JS** (`app.ts`, `revealOnScroll`):
  só fica invisível o que o IntersectionObserver está vigiando; elemento recriado depois aparece.
  Usa `animation ... backwards` (não `transition`) para não deixar lento o hover existente
  (`.project:hover` translateY).
- **Prints com `object-position: left top`:** o card destaque é mais alto que o print; ancorar à
  esquerda mantém logo e título visíveis. O print do Invoice foi recortado (y 190–900) para
  mostrar a tabela.
- **Commits direto na `master`:** é o padrão histórico do repo (sem branches/PRs).
- **Deploy:** `npm run deploy` (angular-cli-ghpages → branch `gh-pages`). Push na `master` NÃO
  atualiza o site.

## 5. ⚠️ Armadilhas descobertas (gotchas)
- **Deploy bloqueado para o agente:** o classificador do modo automático nega `npm run deploy`
  ("Production Deploy"). O usuário roda com `! npm run deploy`.
- **GitHub Pages demora ~30–60 s** para servir o build novo após o deploy. Confirmar procurando
  o nome do `main-*.js` do build no HTML do site (comando na seção 8).
- **`funerariaconfianca.com.br` não resolve no DNS da rede do usuário** (nslookup dá timeout),
  mas resolve no DNS público para `147.93.64.213`. Para capturar print use Chrome headless com
  `--host-resolver-rules="MAP funerariaconfianca.com.br 147.93.64.213, MAP www.funerariaconfianca.com.br 147.93.64.213"`.
- **Recarga do `ng serve` recria componentes:** antes da correção, isso deixava a seção de
  projetos invisível (efeito de revelar). Já corrigido; se mexer no efeito, testar com reload.
- **`resize_window` do claude-in-chrome não reduziu a janela** (provavelmente maximizada): a
  visualização mobile não foi conferida no navegador.
- **Logo do Next.js é preto:** usa `invertOnDark: true` + regra global
  `body:not(.theme-light) img.invert-dark { filter: invert(1) }`.
- Arquivos `.ts`/`.html` do projeto têm BOM UTF-8; ao editar por script, preservar o BOM.

## 6. 🚫 Fora de escopo — NÃO MEXER
- **Arquivo Word do currículo** (OneDrive) — ainda com R$ 65,00. Não foi pedido editar; só foi
  avisado ao usuário.
- Não inventar números/estatísticas (anos de experiência, clientes etc.) para os efeitos de
  contador: não há dados confirmados pelo usuário.
- Ícones de Protheus/ADVPL/TLPP/REST são genéricos; trocar só se o usuário fornecer os logos.

## 7. Próximos passos concretos
Nenhum pendente da sessão. Possíveis, se o usuário pedir:
1. Atualizar o `.docx` do currículo para R$ 80,00 (e regerar PDF se ele preferir).
2. Conferir o layout no celular (DevTools em ~390px) — principalmente botão flutuante e faixa.
3. Regerar prints dos projetos quando algum site mudar (Chrome headless, 1440x900, ver seção 8).

## 8. Comandos de validação
```bash
cd /f/Projetos/my-profile
git log --oneline -5            # topo esperado: 122ce85 (ícones LinkedIn/GitHub); antes 48e5305 (legenda da foto só "Michel Alves")
git status --short              # esperado: limpo (exceto .ai/)
npx ng build 2>&1 | grep -iE "error|warn|complete"   # esperado: só "complete"

# site no ar: favicon com ?v=2 e build atual
curl -s https://michelssalves.github.io/my-profile-angular/ | grep -E 'rel="icon"|main-[A-Z0-9]+\.js' -o
curl -s -o /dev/null -w "%{http_code}\n" https://michelssalves.github.io/my-profile-angular/projects/memorial.webp

# print de um site (exemplo)
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --virtual-time-budget=8000 --screenshot=/caminho/saida.png https://www.funerariasantoanjo.com.br
```
Publicação (o usuário roda): `! npm run deploy`

## 9. Decisões pendentes do usuário
- Atualizar ou não o `.docx` do currículo com o novo valor hora.
- Se quer logos oficiais para Protheus/ADVPL/TLPP no lugar dos ícones genéricos.

## 10. Histórico resumido das sessões
| Sessão | Data | Modelo | O que foi feito |
|---|---|---|---|
| 1 | 2026-11-09 | Claude Opus 5.5 | Favicon MA, valor hora R$ 80 nos CVs, WhatsApp/Gmail + botão flutuante, stack com ícones, efeitos visuais, prints dos projetos, correção do revelar ao rolar, 4 commits + deploy |
