import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  readonly i18n = inject(LanguageService);
  readonly typedEyebrow = signal('');

  private typingTimer: ReturnType<typeof setInterval> | undefined;

  readonly cvLink = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'en') return 'cv/CV.Michel.en.pdf';
    if (lang === 'es') return 'cv/CV.Michel.es.pdf';
    return 'CV.Michel.pdf';
  });

  constructor() {
    // Digita o eyebrow letra a letra e recomeca ao trocar o idioma (inspirado no Rhuan Bello)
    effect(() => this.typeEyebrow(this.i18n.t('hero.eyebrow')));
    inject(DestroyRef).onDestroy(() => clearInterval(this.typingTimer));
  }

  private typeEyebrow(text: string): void {
    clearInterval(this.typingTimer);

    const reduceMotion =
      typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.typedEyebrow.set(text);
      return;
    }

    let index = 0;
    this.typedEyebrow.set('');
    this.typingTimer = setInterval(() => {
      index++;
      this.typedEyebrow.set(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(this.typingTimer);
      }
    }, 70);
  }
}
