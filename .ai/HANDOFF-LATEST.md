# HANDOFF — Portfólio Michel Alves (my-profile)

> Última atualização: 2026-11-23 21:56 · Modelo de origem: Claude Opus 5.5
> Gatilho: G3 (pedido explícito do usuário) · Sessão nº 2

## 0. LEIA ANTES DE QUALQUER COISA
1. Leia `C:\Users\f_dra\.claude\CLAUDE.md` (regras globais do usuário; idioma pt-BR em tudo).
   Este projeto não tem `CLAUDE.md` próprio.
2. Leia este arquivo inteiro.
3. Não existe `.ai/ENV.md` neste projeto.
4. NÃO refaça o que está em "Já concluído". NÃO mexa no que está em "Fora de escopo".

## 1. Objetivo
Site de portfólio pessoal do Michel Alves em Angular (componentes standalone, signals), com tema
escuro/claro e três idiomas (PT/EN/ES). Está publicado no GitHub Pages em
https://michelssalves.github.io/my-profile/. O endereço antigo era `/my-profile-angular/`, e a
sessão 1 ainda usava esse nome.

Nesta sessão foi criado, logo abaixo do hero, um **carrossel de anúncios dos apps próprios** do
usuário, com animações em CSS puro. A ordem dos slides é esta:
1. Vídeos no Carro (Android Auto)
2. Trilhas
3. MargemHub
4. Quiz da Bomba
5. Learning English

## 2. Estado atual
- **Já concluído e validado:**
  - Componente novo `src/app/sections/destaque/`, inserido em `app.html` logo depois de `<app-hero>`.
  - Comportamento do carrossel:
    - Troca de slide sozinha a cada 9 s.
    - Pausa com o mouse em cima, com foco dentro ou com a aba escondida.
    - Para de vez quando a pessoa mexe nele.
    - Responde a swipe, às setas do teclado e aos pontos de navegação com o nome curto de cada app.
    - Slides inativos ficam com `inert` e `aria-hidden`.
  - Cada slide tem selo com ponto piscando, título com trecho em gradiente, texto de abertura, 4 benefícios, CTA e uma animação própria.
  - **Vídeos no Carro:**
    - Painel da central multimídia com as abas Drive, YouTube, Disney+, Netflix e Prime Video.
    - A "trava opcional" com o carro andando esconde só a imagem; a barra de progresso continua correndo ("o vídeo nunca para").
    - O CTA chama no WhatsApp.
  - **Trilhas** (https://mapa-mental.gbxstrategy.com/login): mapa mental com os trilhos acendendo, voltado a montar aulas e palestras "sem perder os trilhos".
  - **MargemHub** (https://app.margemhub.com.br/):
    - Painel de margens em que o lucro do mês vai de R$ 8.940 para R$ 12.480.
    - Um anúncio passa de −4% para +11%, com a nota mudando de alerta para corrigido.
    - O texto vende "controle total da lucratividade: mais ganho, menos prejuízo".
  - **Quiz da Bomba** (https://biblia-quiz.michelssalves.workers.dev/):
    - O pavio conta 10 → 5 → 💥 e o jogador erra a pergunta fácil (marca Moisés quando a certa é Noé).
    - Depois aparece a lista "Erros da rodada", com 3 itens.
  - **Learning English** (https://learning-english.michelssalves.workers.dev/): celular com a prática de fala e uma bolha de resposta.
  - O grupo "Projetos próprios" **foi removido** da seção Projetos. Esses apps aparecem só no carrossel, e `portfolio-data.ts` voltou às categorias `'client' | 'erp'`.
  - Prints que tinham sido adicionados e depois removidos com `git rm`: `trilhas.webp`, `learning-english.webp` e `biblia-quiz.webp`.
  - Commits na `master` (topo `e02447b`), com push feito e `npm run deploy` rodado pelo usuário. O site no ar foi confirmado servindo `main-WNSVVDTS.js` em 2026-11-23.
  - Conferência visual feita por screenshots do Chrome headless (desktop e mobile, cada slide), nos temas escuro e claro.
- **Em andamento:** nada a registrar.
- **Bloqueado:** nada a registrar.

## 3. Arquivos tocados
| Caminho absoluto | O que é | Estado |
|---|---|---|
| F:\Projetos\my-profile\src\app\sections\destaque\destaque.ts | slides, abas do carro, dados das animações, autoplay/swipe/teclado | criado |
| F:\Projetos\my-profile\src\app\sections\destaque\destaque.html | `@for` dos slides + `@switch` com a animação de cada app | criado |
| F:\Projetos\my-profile\src\app\sections\destaque\destaque.css | layout, cores por slide (`--feat`), keyframes, `prefers-reduced-motion` (~15 kB) | criado |
| F:\Projetos\my-profile\src\app\app.ts / app.html | import e `<app-destaque>` depois do hero | modificado |
| F:\Projetos\my-profile\src\app\shared\language.service.ts | chaves `feat.*` em pt/en/es (inseridas depois de `projects.newTab`) | modificado |
| F:\Projetos\my-profile\angular.json | orçamento `anyComponentStyle` 20 kB aviso / 24 kB erro | modificado |
| F:\Projetos\my-profile\src\app\shared\portfolio-data.ts, src\app\sections\projetos\* | grupo "own" adicionado e depois removido (voltou ao original) | inalterado no saldo final |

## 4. Decisões técnicas tomadas (e o PORQUÊ)
- **Propaganda honesta:**
  - O usuário pediu HBO, mas o app do carro (`F:\Projetos\app-car-auto`) não tem essa aba. Por isso foi usado Prime Video, que o app tem (`BrowserController.STREAMINGS`).
  - Disney+, Netflix e Prime ainda não foram testados no carro: há risco de DRM, conforme `F:\Projetos\app-car-auto\.ai\HANDOFF-LATEST.md`.
- **Trava com o carro andando apresentada como OPCIONAL**, com ênfase em que o vídeo continua rodando (áudio segue e a barra de progresso corre). O texto não incentiva o motorista a assistir: é para as crianças no banco de trás.
- **Somente o slide do carro tem CTA de WhatsApp** (`whatsappUrl(feat.car.whatsMessage)`). Os outros apontam para o link do app (`slide.url`).
- **Animações só em CSS**, com loop do carro de 10 s e da bomba de 8 s. As trocas de texto antes/depois usam `grid-area` empilhado e `steps(1)`. Com `prefers-reduced-motion`, as animações ficam desligadas e o estado final aparece.
- **Colunas `minmax(0, …)`** no grid do slide (≥860px): sem isso, o slide estourava a viewport à direita.
- **Edição de `.ts` e `.html` por scripts Node** gravando UTF-8: os arquivos têm BOM e LF, e os scripts os preservam. Os scripts estão no scratchpad da sessão (`i18n*.js`) e são descartáveis.
- **Commits direto na `master`**, que é o padrão do repo. O site só é atualizado com `npm run deploy`.

## 5. ⚠️ Armadilhas descobertas (gotchas)
- **Push e deploy bloqueados para o agente** pelo classificador do modo automático. O usuário roda `! git push; npm run deploy`.
- **Screenshot headless congela as animações CSS no quadro 0.** Para ver um estado intermediário:
  1. Fazer backup dos arquivos e trocar temporariamente `signal(0)` → `signal(N)` em `destaque.ts`.
  2. Acrescentar ao CSS `* { animation-delay:-7.4s !important; animation-play-state:paused !important; }`.
  3. Fazer o build e o screenshot.
  4. **Restaurar os backups.**
- **Orçamento de CSS por componente:** o `destaque.css` passa de 8 kB e já quebrou o build. Se crescer muito, ajuste o `anyComponentStyle` em `angular.json` (hoje 20/24 kB).
- **O build às vezes falha ao embutir o Google Fonts** por instabilidade de rede. Basta repetir o build.
- **"Site off" logo depois do deploy** foi só a transição do GitHub Pages ou cache do navegador. Confira o `main-*.js` (seção 8) e use Ctrl+F5.
- **Regex substituindo keyframes deixou um `}` sobrando** no CSS, que gerou aviso de sintaxe no build. Depois de editar o CSS por script, olhe os avisos.
- **Bash heredoc com script Node longo deu "unexpected EOF".** Grave o script com Write e rode com `node arquivo.js`.

## 6. 🚫 Fora de escopo — NÃO MEXER
- **Não pôr HBO nem outro app que o Vídeos no Carro não tenha** no painel do anúncio.
- **Não voltar com o grupo "Projetos próprios"** na seção Projetos. O usuário mandou tirar (os apps ficam só no carrossel).
- **Não reordenar o carrossel.** A ordem foi definida pelo usuário, com o carro primeiro, MargemHub em terceiro e inglês por último.
- **Não promover vídeo para o motorista nem tornar a trava obrigatória.** A trava é opcional e o foco é nas crianças.
- **Não gravar segredos.** O projeto `F:\Projetos\biblia-quiz` tem uma chave de admin em `.local/production-secrets.json`, e ela nunca deve ir para código, handoff ou memória.
- Itens herdados da sessão 1 que continuam valendo:
  - Não editar o `.docx` do currículo sem pedido.
  - Não inventar números ou estatísticas.

## 7. Próximos passos concretos
Nenhum pendente. Possíveis, se o usuário pedir:
1. Se o app do carro ganhar a aba HBO: incluir em `carTabs` em `destaque.ts`.
2. Se o teste de DRM no carro falhar: tirar Disney+, Netflix e Prime de `carTabs` e revisar o texto de `feat.car.*`.
3. Novo app no carrossel:
   - Incluir em `slides` (`destaque.ts`) e no tipo `SlideId`.
   - Criar as chaves `feat.<id>.*` em pt/en/es.
   - Criar o `@case` com a animação em `destaque.html` e a cor `--feat` em `destaque.css`.

## 8. Comandos de validação
```bash
cd /f/Projetos/my-profile
git log --oneline -3      # topo esperado: e02447b (orçamento CSS), 42c5183 (MargemHub no carrossel)
git status --short        # esperado: limpo
npx ng build 2>&1 | grep -iE "error|warn|complete"   # esperado: só "complete" (se falhar no Google Fonts, repetir)

# site no ar: build atual
curl -s https://michelssalves.github.io/my-profile/ | grep -oE 'main-[A-Z0-9]+\.js'   # em 2026-11-23: main-WNSVVDTS.js

# screenshot local (servir dist/ antes, ex.: npx http-server dist/my-profile/browser -p 4300)
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,1100 --virtual-time-budget=3000 --screenshot=/caminho/saida.png http://localhost:4300/
```
O usuário roda a publicação: `! git push; npm run deploy`

## 9. Decisões pendentes do usuário
- Se quer HBO no anúncio, o que depende de adicionar a aba no app `F:\Projetos\app-car-auto`.
- Herdados da sessão 1:
  - Atualizar o `.docx` do currículo para R$ 80,00.
  - Usar logos oficiais de Protheus/ADVPL/TLPP.

## 10. Histórico resumido das sessões
| Sessão | Data | Modelo | O que foi feito |
|---|---|---|---|
| 1 | 2026-11-09 | Claude Opus 5.5 | Favicon MA, valor hora R$ 80 nos CVs, WhatsApp/Gmail + botão flutuante, stack com ícones, efeitos visuais, prints dos projetos |
| 2 | 2026-11-16 a 23 | Claude Opus 5.5 | Carrossel de destaques: Vídeos no Carro, Trilhas, MargemHub, Quiz da Bomba e Learning English; grupo "Projetos próprios" removido; orçamento de CSS 20/24 kB; 4 commits + deploys (último `main-WNSVVDTS.js`) |
