import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { whatsappUrl } from '../../shared/portfolio-data';

type SlideId = 'car' | 'trilhas' | 'english' | 'bomba';

interface Slide {
  id: SlideId;
  benefits: number;
  url?: string;
}

const AUTOPLAY_MS = 9000;
const SWIPE_PX = 50;

@Component({
  selector: 'app-destaque',
  imports: [],
  templateUrl: './destaque.html',
  styleUrl: './destaque.css'
})
export class Destaque {
  readonly i18n = inject(LanguageService);
  readonly carLink = computed(() => whatsappUrl(this.i18n.t('feat.car.whatsMessage')));
  readonly current = signal(0);

  // O app do carro abre o carrossel: e o unico que vira pedido pelo WhatsApp; os outros levam ao site.
  readonly slides: Slide[] = [
    { id: 'car', benefits: 4 },
    { id: 'trilhas', benefits: 4, url: 'https://mapa-mental.gbxstrategy.com/login' },
    { id: 'english', benefits: 4, url: 'https://learning-english.michelssalves.workers.dev/' },
    { id: 'bomba', benefits: 4, url: 'https://biblia-quiz.michelssalves.workers.dev/' }
  ];

  // Abas do app real (BrowserController.STREAMINGS + Drive e YouTube).
  readonly carTabs = ['Drive', 'YouTube', 'Disney+', 'Netflix', 'Prime Video'];

  // Miniaturas da central: so cor e emoji, sem marca de desenho real.
  readonly thumbs = [
    { emoji: '🦕', tone: 'a' },
    { emoji: '🚀', tone: 'b' },
    { emoji: '🐠', tone: 'c' },
    { emoji: '🎵', tone: 'd' },
    { emoji: '🧸', tone: 'e' },
    { emoji: '🌈', tone: 'f' }
  ];

  readonly moments = ['feat.car.m1', 'feat.car.m2', 'feat.car.m3', 'feat.car.m4'];
  readonly mapNodes = ['feat.trilhas.n1', 'feat.trilhas.n2', 'feat.trilhas.n3', 'feat.trilhas.n4'];
  readonly quizOptions = ['feat.bomba.o1', 'feat.bomba.o2', 'feat.bomba.o3', 'feat.bomba.o4'];

  private readonly destroyRef = inject(DestroyRef);
  private paused = false;
  private stopped = false;
  private startX: number | null = null;

  constructor() {
    afterNextRender(() => this.startAutoplay());
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  go(index: number): void {
    const total = this.slides.length;
    this.current.set((index + total) % total);
  }

  prev(): void {
    this.stopped = true;
    this.go(this.current() - 1);
  }

  next(): void {
    this.stopped = true;
    this.go(this.current() + 1);
  }

  pick(index: number): void {
    this.stopped = true;
    this.go(index);
  }

  pause(value: boolean): void {
    this.paused = value;
  }

  onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.startX === null) {
      return;
    }

    const delta = event.clientX - this.startX;
    this.startX = null;
    if (Math.abs(delta) < SWIPE_PX) {
      return;
    }

    if (delta < 0) {
      this.next();
    } else {
      this.prev();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }

  // Gira sozinho ate a pessoa mexer; para com mouse em cima, foco dentro ou aba escondida.
  private startAutoplay(): void {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      if (!this.paused && !this.stopped && !document.hidden) {
        this.go(this.current() + 1);
      }
    }, AUTOPLAY_MS);
    this.destroyRef.onDestroy(() => window.clearInterval(timer));
  }
}
