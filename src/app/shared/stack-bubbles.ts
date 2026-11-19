import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChildren } from '@angular/core';
import { STACK, StackItem } from './portfolio-data';

interface Ball {
  item?: StackItem;
  /** Tamanho relativo ao da bolha com ícone (1 = mesmo tamanho). */
  scale: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Bolhas vazias soltas entre os ícones, de tamanhos variados. */
const EMPTY_SCALES = [0.35, 0.45, 0.55, 0.6, 0.7, 0.85, 1, 1.2];

/**
 * Bolhas no fundo do site: as da stack (ícone e nome) e outras vazias, de vários tamanhos. Andam
 * devagar, batem nas bordas da tela e umas nas outras (choque elástico, a maior empurra mais), e o
 * ponteiro empurra as que estão perto. Ficam atrás do conteúdo, aparecendo nos espaços entre os
 * blocos. A física roda fora do Angular, mexendo só no transform.
 */
@Component({
  selector: 'app-stack-bubbles',
  imports: [],
  template: `
    @for (ball of balls; track $index) {
      <span class="ball" [class.empty]="!ball.item" #ballEl>
        @if (ball.item; as item) {
          <img [src]="item.icon" alt="" width="40" height="40" [class.invert-dark]="item.invertOnDark" />
          <small>{{ item.name }}</small>
        }
      </span>
    }
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }

    .ball {
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
      align-content: center;
      gap: 3px;
      border: 1px solid var(--border-strong);
      border-radius: 50%;
      background: var(--tile-2);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
      opacity: 0.8;
      will-change: transform;
    }

    .ball img {
      width: calc(var(--size) * 0.4);
      height: calc(var(--size) * 0.4);
      object-fit: contain;
    }

    .ball small {
      max-width: 88%;
      overflow: hidden;
      color: var(--ink);
      font-size: var(--label);
      font-weight: 700;
      line-height: 1.1;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    /* Bolha vazia: vidro, com reflexo no alto e borda colorida */
    .ball.empty {
      border-color: color-mix(in srgb, var(--grad-2) 45%, transparent);
      background:
        radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.35), transparent 22%),
        radial-gradient(circle at 50% 50%, transparent 55%, color-mix(in srgb, var(--grad-2) 22%, transparent));
      box-shadow: inset 0 0 18px color-mix(in srgb, var(--grad-1) 25%, transparent);
      opacity: 0.7;
    }
  `
})
export class StackBubbles {
  readonly balls: Ball[] = [
    ...STACK.flatMap((group) => group.items).map((item) => newBall(1, item)),
    ...EMPTY_SCALES.map((scale) => newBall(scale))
  ];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ballEls = viewChildren<ElementRef<HTMLElement>>('ballEl');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private width = 0;
  private height = 0;
  private frame = 0;
  private lastTime = 0;

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.start()));
  }

  private start(): void {
    this.measure();
    this.scatter();
    this.render();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onResize = () => this.measure();
    const onMove = (event: PointerEvent) => this.push(event.clientX, event.clientY);
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    this.lastTime = performance.now();
    this.frame = requestAnimationFrame((t) => this.tick(t));

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    });
  }

  /** Tamanho da tela e das bolhas: a com ícone tem 96px no computador e 72px no celular. */
  private measure(): void {
    this.width = this.host.nativeElement.clientWidth;
    this.height = this.host.nativeElement.clientHeight;
    const base = this.width >= 720 ? 96 : 72;
    this.host.nativeElement.style.setProperty('--label', `${Math.round(base * 0.14)}px`);

    const els = this.ballEls();
    this.balls.forEach((ball, i) => {
      ball.r = (base * ball.scale) / 2;
      const el = els[i]?.nativeElement;
      if (el) {
        el.style.setProperty('--size', `${ball.r * 2}px`);
        el.style.width = el.style.height = `${ball.r * 2}px`;
      }
    });
  }

  /** Espalha em grade irregular pela tela, com direção e velocidade aleatórias. */
  private scatter(): void {
    const cols = 5;
    const rows = Math.ceil(this.balls.length / cols);
    const cellW = this.width / cols;
    const cellH = this.height / rows;
    // Embaralha para as vazias não ficarem todas juntas no fim
    const order = this.balls.map((_, i) => i).sort(() => Math.random() - 0.5);
    order.forEach((ballIndex, cell) => {
      const ball = this.balls[ballIndex];
      const dir = Math.random() * Math.PI * 2;
      const speed = 16 + Math.random() * 18;
      ball.x = cellW * ((cell % cols) + 0.2 + Math.random() * 0.6);
      ball.y = cellH * (Math.floor(cell / cols) + 0.2 + Math.random() * 0.6);
      ball.vx = Math.cos(dir) * speed;
      ball.vy = Math.sin(dir) * speed;
    });
  }

  /** O ponteiro empurra as bolhas próximas; as pequenas vão mais longe. */
  private push(px: number, py: number): void {
    for (const ball of this.balls) {
      const reach = ball.r + 60;
      const dx = ball.x - px;
      const dy = ball.y - py;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < reach) {
        const force = ((reach - dist) / reach) * (60 / Math.max(ball.scale, 0.5));
        ball.vx += (dx / dist) * force;
        ball.vy += (dy / dist) * force;
      }
    }
  }

  private tick(time: number): void {
    // Limita o passo: ao voltar de uma aba escondida, as bolhas não "teleportam"
    const dt = Math.min((time - this.lastTime) / 1000, 1 / 30);
    this.lastTime = time;
    this.step(dt);
    this.render();
    this.frame = requestAnimationFrame((t) => this.tick(t));
  }

  private step(dt: number): void {
    for (const ball of this.balls) {
      // Volta devagar à velocidade de cruzeiro depois de um empurrão: entre 16 e 160 px/s
      const speed = Math.hypot(ball.vx, ball.vy) || 1;
      const target = Math.min(Math.max(speed * 0.99, 16), 160);
      ball.vx = (ball.vx / speed) * target;
      ball.vy = (ball.vy / speed) * target;

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Bordas da tela
      if (ball.x < ball.r) {
        ball.x = ball.r;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x > this.width - ball.r) {
        ball.x = this.width - ball.r;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y < ball.r) {
        ball.y = ball.r;
        ball.vy = Math.abs(ball.vy);
      } else if (ball.y > this.height - ball.r) {
        ball.y = this.height - ball.r;
        ball.vy = -Math.abs(ball.vy);
      }
    }

    // Choque elástico com massa proporcional à área: a bolha grande empurra a pequena
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const a = this.balls[i];
        const b = this.balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const overlap = a.r + b.r - dist;
        if (overlap <= 0) {
          continue;
        }

        const ma = a.r * a.r;
        const mb = b.r * b.r;
        const nx = dx / dist;
        const ny = dy / dist;
        a.x -= nx * overlap * (mb / (ma + mb));
        a.y -= ny * overlap * (mb / (ma + mb));
        b.x += nx * overlap * (ma / (ma + mb));
        b.y += ny * overlap * (ma / (ma + mb));

        const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (rel > 0) {
          const impulse = (2 * rel) / (ma + mb);
          a.vx -= impulse * mb * nx;
          a.vy -= impulse * mb * ny;
          b.vx += impulse * ma * nx;
          b.vy += impulse * ma * ny;
        }
      }
    }
  }

  private render(): void {
    const els = this.ballEls();
    this.balls.forEach((ball, i) => {
      const el = els[i]?.nativeElement;
      if (el) {
        el.style.transform = `translate(${ball.x - ball.r}px, ${ball.y - ball.r}px)`;
      }
    });
  }
}

function newBall(scale: number, item?: StackItem): Ball {
  return { item, scale, r: 0, x: 0, y: 0, vx: 0, vy: 0 };
}
