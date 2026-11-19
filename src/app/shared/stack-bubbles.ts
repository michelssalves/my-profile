import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChildren } from '@angular/core';
import { STACK, StackItem } from './portfolio-data';

interface Ball {
  item: StackItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Ícones da stack soltos no fundo do site: andam devagar, batem nas bordas da tela e uns nos
 * outros (choque elástico), e o ponteiro empurra os que estão perto. Ficam atrás do conteúdo,
 * aparecendo nos espaços entre os blocos. A física roda fora do Angular, mexendo só no transform.
 */
@Component({
  selector: 'app-stack-bubbles',
  imports: [],
  template: `
    @for (ball of balls; track ball.item.name) {
      <span class="ball" #ballEl>
        <img [src]="ball.item.icon" alt="" width="26" height="26" [class.invert-dark]="ball.item.invertOnDark" />
        <small>{{ ball.item.name }}</small>
      </span>
    }
  `,
  styles: `
    :host {
      --ball: 56px;
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
      gap: 2px;
      width: var(--ball);
      height: var(--ball);
      border: 1px solid var(--border-strong);
      border-radius: 50%;
      background: var(--tile-2);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      opacity: 0.75;
      will-change: transform;
    }

    .ball img {
      width: calc(var(--ball) * 0.36);
      height: calc(var(--ball) * 0.36);
      object-fit: contain;
    }

    .ball small {
      max-width: 90%;
      overflow: hidden;
      color: var(--ink);
      font-size: calc(var(--ball) * 0.15);
      font-weight: 700;
      line-height: 1.1;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    @media (min-width: 720px) {
      :host {
        --ball: 70px;
      }
    }
  `
})
export class StackBubbles {
  readonly balls: Ball[] = STACK.flatMap((group) => group.items).map((item) => ({ item, x: 0, y: 0, vx: 0, vy: 0 }));

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ballEls = viewChildren<ElementRef<HTMLElement>>('ballEl');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private width = 0;
  private height = 0;
  private radius = 0;
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

  private measure(): void {
    this.width = this.host.nativeElement.clientWidth;
    this.height = this.host.nativeElement.clientHeight;
    this.radius = (this.ballEls()[0]?.nativeElement.offsetWidth ?? 56) / 2;
  }

  /** Espalha em grade irregular pela tela, com direção e velocidade aleatórias. */
  private scatter(): void {
    const cols = 4;
    const rows = Math.ceil(this.balls.length / cols);
    this.balls.forEach((ball, i) => {
      const cellW = this.width / cols;
      const cellH = this.height / rows;
      const dir = Math.random() * Math.PI * 2;
      const speed = 18 + Math.random() * 18;
      ball.x = cellW * ((i % cols) + 0.2 + Math.random() * 0.6);
      ball.y = cellH * (Math.floor(i / cols) + 0.2 + Math.random() * 0.6);
      ball.vx = Math.cos(dir) * speed;
      ball.vy = Math.sin(dir) * speed;
    });
  }

  /** O ponteiro empurra as bolas próximas. */
  private push(px: number, py: number): void {
    const reach = this.radius * 2.4;
    for (const ball of this.balls) {
      const dx = ball.x - px;
      const dy = ball.y - py;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < reach) {
        const force = ((reach - dist) / reach) * 60;
        ball.vx += (dx / dist) * force;
        ball.vy += (dy / dist) * force;
      }
    }
  }

  private tick(time: number): void {
    // Limita o passo: ao voltar de uma aba escondida, as bolas não "teleportam"
    const dt = Math.min((time - this.lastTime) / 1000, 1 / 30);
    this.lastTime = time;
    this.step(dt);
    this.render();
    this.frame = requestAnimationFrame((t) => this.tick(t));
  }

  private step(dt: number): void {
    const r = this.radius;

    for (const ball of this.balls) {
      // Volta devagar à velocidade de cruzeiro depois de um empurrão: entre 18 e 160 px/s
      const speed = Math.hypot(ball.vx, ball.vy) || 1;
      const target = Math.min(Math.max(speed * 0.99, 18), 160);
      ball.vx = (ball.vx / speed) * target;
      ball.vy = (ball.vy / speed) * target;

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Bordas da tela
      if (ball.x < r) {
        ball.x = r;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x > this.width - r) {
        ball.x = this.width - r;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y < r) {
        ball.y = r;
        ball.vy = Math.abs(ball.vy);
      } else if (ball.y > this.height - r) {
        ball.y = this.height - r;
        ball.vy = -Math.abs(ball.vy);
      }
    }

    // Choque entre as bolas: massas iguais, troca as componentes na direção do contato
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const a = this.balls[i];
        const b = this.balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const overlap = 2 * r - dist;
        if (overlap <= 0) {
          continue;
        }

        const nx = dx / dist;
        const ny = dy / dist;
        a.x -= (nx * overlap) / 2;
        a.y -= (ny * overlap) / 2;
        b.x += (nx * overlap) / 2;
        b.y += (ny * overlap) / 2;

        const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (rel > 0) {
          a.vx -= rel * nx;
          a.vy -= rel * ny;
          b.vx += rel * nx;
          b.vy += rel * ny;
        }
      }
    }
  }

  private render(): void {
    const els = this.ballEls();
    this.balls.forEach((ball, i) => {
      const el = els[i]?.nativeElement;
      if (el) {
        el.style.transform = `translate(${ball.x - this.radius}px, ${ball.y - this.radius}px)`;
      }
    });
  }
}
