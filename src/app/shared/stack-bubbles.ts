import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChild, viewChildren } from '@angular/core';
import { STACK, StackItem } from './portfolio-data';

interface Ball {
  item: StackItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Círculo com os ícones da stack quicando: batem na borda e uns nos outros (choque elástico) e o
 * ponteiro empurra os que estão perto. A física roda fora do Angular, mexendo só no transform.
 */
@Component({
  selector: 'app-stack-bubbles',
  imports: [],
  template: `
    <div class="arena" #arena (pointermove)="push($event)" aria-hidden="true">
      @for (ball of balls; track ball.item.name) {
        <span class="ball" #ballEl>
          <img [src]="ball.item.icon" alt="" width="26" height="26" [class.invert-dark]="ball.item.invertOnDark" />
          <small>{{ ball.item.name }}</small>
        </span>
      }
    </div>
  `,
  styles: `
    :host {
      display: grid;
      place-items: center;
    }

    .arena {
      position: relative;
      width: min(440px, 100%);
      aspect-ratio: 1;
      border-radius: 50%;
      border: 2px solid transparent;
      background:
        radial-gradient(circle at 50% 40%, var(--accent-soft), transparent 70%) padding-box,
        linear-gradient(var(--tile), var(--tile)) padding-box,
        linear-gradient(135deg, var(--grad-1), var(--grad-2), var(--grad-3)) border-box;
      box-shadow: 0 0 60px color-mix(in srgb, var(--grad-2) 22%, transparent);
      overflow: hidden;
      touch-action: pan-y;
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
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
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
  `
})
export class StackBubbles {
  readonly balls: Ball[] = STACK.flatMap((group) => group.items).map((item) => ({ item, x: 0, y: 0, vx: 0, vy: 0 }));

  private readonly arena = viewChild.required<ElementRef<HTMLElement>>('arena');
  private readonly ballEls = viewChildren<ElementRef<HTMLElement>>('ballEl');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private radius = 0;
  private ballRadius = 0;
  private frame = 0;
  private lastTime = 0;
  private visible = false;

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.start()));
  }

  /** O ponteiro empurra as bolas próximas, como um dedo no meio delas. */
  push(event: PointerEvent): void {
    const rect = this.arena().nativeElement.getBoundingClientRect();
    const px = event.clientX - rect.left - this.radius;
    const py = event.clientY - rect.top - this.radius;
    const reach = this.ballRadius * 2.2;

    for (const ball of this.balls) {
      const dx = ball.x - px;
      const dy = ball.y - py;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < reach) {
        const force = ((reach - dist) / reach) * 260;
        ball.vx += (dx / dist) * force;
        ball.vy += (dy / dist) * force;
      }
    }
  }

  private start(): void {
    this.measure();
    this.scatter();
    this.render();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const resize = new ResizeObserver(() => this.measure());
    resize.observe(this.arena().nativeElement);

    // Só anima com o círculo na tela
    const seen = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible && !this.frame) {
        this.lastTime = performance.now();
        this.frame = requestAnimationFrame((t) => this.tick(t));
      }
    });
    seen.observe(this.arena().nativeElement);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      resize.disconnect();
      seen.disconnect();
    });
  }

  private measure(): void {
    const size = this.arena().nativeElement.clientWidth;
    this.radius = size / 2;
    this.ballRadius = Math.max(26, size * 0.085);
    this.arena().nativeElement.style.setProperty('--ball', `${this.ballRadius * 2}px`);
  }

  /** Posições iniciais em espiral (sem sobreposição) e velocidades aleatórias. */
  private scatter(): void {
    const count = this.balls.length;
    this.balls.forEach((ball, i) => {
      const angle = i * 2.4;
      const dist = (this.radius - this.ballRadius) * Math.sqrt((i + 0.5) / count) * 0.9;
      const speed = 70 + Math.random() * 70;
      const dir = Math.random() * Math.PI * 2;
      ball.x = Math.cos(angle) * dist;
      ball.y = Math.sin(angle) * dist;
      ball.vx = Math.cos(dir) * speed;
      ball.vy = Math.sin(dir) * speed;
    });
  }

  private tick(time: number): void {
    if (!this.visible) {
      this.frame = 0;
      return;
    }

    // Limita o passo: ao voltar de uma aba escondida, as bolas não "teleportam"
    const dt = Math.min((time - this.lastTime) / 1000, 1 / 30);
    this.lastTime = time;
    this.step(dt);
    this.render();
    this.frame = requestAnimationFrame((t) => this.tick(t));
  }

  private step(dt: number): void {
    const r = this.ballRadius;
    const limit = this.radius - r;

    for (const ball of this.balls) {
      // Atrito leve depois de um empurrão, sem deixar parar: velocidade sempre entre 60 e 420 px/s
      const speed = Math.hypot(ball.vx, ball.vy) || 1;
      const target = Math.min(Math.max(speed * 0.995, 60), 420);
      ball.vx = (ball.vx / speed) * target;
      ball.vy = (ball.vy / speed) * target;

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Borda do círculo: reflete a velocidade na normal e traz de volta para dentro
      const dist = Math.hypot(ball.x, ball.y);
      if (dist > limit) {
        const nx = ball.x / dist;
        const ny = ball.y / dist;
        const dot = ball.vx * nx + ball.vy * ny;
        if (dot > 0) {
          ball.vx -= 2 * dot * nx;
          ball.vy -= 2 * dot * ny;
        }
        ball.x = nx * limit;
        ball.y = ny * limit;
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
    const offset = this.radius - this.ballRadius;
    this.balls.forEach((ball, i) => {
      const el = els[i]?.nativeElement;
      if (el) {
        el.style.transform = `translate(${ball.x + offset}px, ${ball.y + offset}px)`;
      }
    });
  }
}
