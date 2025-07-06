import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  
  teamMembers: TeamMember[] = [
    {
      name: 'Miguel Fernandez',
      role: 'Founder & Lead Developer',
      description: 'Full-stack developer con más de 3 años de experiencia creando soluciones web modernas. Especializado en Angular, React, Node.js, Azure y arquitecturas backend escalables.',
      image: 'assets/images/team/miguel.jpg',
      skills: ['Angular', 'React', 'TypeScript', 'Node.js', 'Azure', 'AWS', 'Backend', 'DevOps'],
      social: {
        linkedin: 'https://linkedin.com/in/miguelfernandezgargurevich',
        github: 'https://github.com/miguelfernandezgargurevich',
        website: 'https://miguelfernandez.dev'
      }
    },
    {
      name: 'Sofia Rodriguez',
      role: 'UI/UX Designer',
      description: 'Diseñadora especializada en experiencias digitales que convierten. Experta en diseño centrado en el usuario y optimización de conversiones.',
      image: 'assets/images/team/placeholder.svg',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      social: {
        linkedin: 'https://linkedin.com/in/sofia-rodriguez-design'
      }
    },
    {
      name: 'Carlos Martinez',
      role: 'Backend Developer',
      description: 'Desarrollador backend enfocado en crear APIs robustas y escalables. Especialista en bases de datos, microservicios y integración de sistemas.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'Microservices'],
      social: {
        linkedin: 'https://linkedin.com/in/carlos-martinez-dev',
        github: 'https://github.com/carlos-martinez'
      }
    }
  ];

  companyValues: CompanyValue[] = [
    {
      icon: 'target',
      title: 'Enfoque en Resultados',
      description: 'Cada proyecto está diseñado para generar resultados medibles y cumplir objetivos específicos de negocio.'
    },
    {
      icon: 'lightning',
      title: 'Agilidad y Flexibilidad',
      description: 'Metodologías ágiles que permiten adaptarse rápidamente a cambios y entregar valor continuamente.'
    },
    {
      icon: 'tools',
      title: 'Calidad Técnica',
      description: 'Código limpio, arquitecturas escalables y las mejores prácticas en cada línea de desarrollo.'
    },
    {
      icon: 'handshake',
      title: 'Colaboración Cercana',
      description: 'Trabajamos de la mano contigo durante todo el proceso, manteniendo comunicación transparente.'
    },
    {
      icon: 'rocket',
      title: 'Innovación Constante',
      description: 'Siempre al día con las últimas tecnologías y tendencias para ofrecer soluciones de vanguardia.'
    },
    {
      icon: 'growth',
      title: 'Crecimiento Sostenible',
      description: 'Creamos soluciones que escalan con tu negocio y se adaptan a tus necesidades futuras.'
    }
  ];

  milestones: Milestone[] = [
    {
      year: '2022',
      title: 'Fundación de Gargurevich.Dev',
      description: 'Inicio del emprendimiento enfocado en desarrollo web moderno para startups y empresas.'
    },
    {
      year: '2023',
      title: 'Primeros 25 Proyectos',
      description: 'Completamos nuestros primeros 25 proyectos exitosos, estableciendo nuestra reputación en el mercado.'
    },
    {
      year: '2024',
      title: 'Expansión del Equipo',
      description: 'Crecimiento del equipo y expansión de servicios para incluir IA, DevOps y soluciones empresariales.'
    },
    {
      year: '2025',
      title: 'Certificación y Alianzas',
      description: 'Certificaciones en cloud computing y alianzas estratégicas para ofrecer servicios más robustos.'
    }
  ];

  stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '3 años', label: 'de Experiencia' },
    { number: '24/7', label: 'Soporte Técnico' }
  ];

  onImgError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement && !imgElement.src.endsWith('placeholder.svg')) {
      imgElement.src = 'assets/images/team/placeholder.svg';
    }
  }
}
