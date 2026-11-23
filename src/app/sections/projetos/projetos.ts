import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { PROJECTS, ProjectCategory } from '../../shared/portfolio-data';

interface ProjectGroup {
  category: ProjectCategory;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  items: typeof PROJECTS;
}

@Component({
  selector: 'app-projetos',
  imports: [],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class Projetos {
  readonly i18n = inject(LanguageService);

  // Protheus primeiro: é o foco profissional; os sites para clientes vêm depois.
  readonly groups: ProjectGroup[] = [
    {
      category: 'erp',
      badgeKey: 'projects.group.erp.badge',
      titleKey: 'projects.group.erp',
      descKey: 'projects.group.erp.desc',
      tagKey: 'projects.tag.demo',
      items: PROJECTS.filter((project) => project.category === 'erp')
    },
    {
      category: 'client',
      badgeKey: 'projects.group.client.badge',
      titleKey: 'projects.group.client',
      descKey: 'projects.group.client.desc',
      tagKey: 'projects.tag.live',
      items: PROJECTS.filter((project) => project.category === 'client')
    }
  ];
}
