import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { whatsappUrl } from '../../shared/portfolio-data';

@Component({
  selector: 'app-destaque',
  imports: [],
  templateUrl: './destaque.html',
  styleUrl: './destaque.css'
})
export class Destaque {
  readonly i18n = inject(LanguageService);
  readonly wantLink = computed(() => whatsappUrl(this.i18n.t('feat.car.whatsMessage')));

  // Miniaturas da central: so cor e emoji, sem marca de desenho real.
  readonly thumbs = [
    { emoji: '🦕', tone: 'a' },
    { emoji: '🚀', tone: 'b' },
    { emoji: '🐠', tone: 'c' },
    { emoji: '🎵', tone: 'd' },
    { emoji: '🧸', tone: 'e' },
    { emoji: '🌈', tone: 'f' }
  ];

  readonly benefits = ['feat.car.b1', 'feat.car.b2', 'feat.car.b3', 'feat.car.b4'];
  readonly moments = ['feat.car.m1', 'feat.car.m2', 'feat.car.m3', 'feat.car.m4'];
}
