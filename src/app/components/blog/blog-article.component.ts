import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { IconComponent } from '../icon/icon.component';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss'
})
export class BlogArticleComponent implements OnInit {
  // Efecto visual adicional opcional para el botón (por accesibilidad y micro-interacción)
  onBackBtnHover(event: MouseEvent) {
    const btn = event.currentTarget as HTMLElement;
    btn.classList.add('hovered');
  }

  onBackBtnOut(event: MouseEvent) {
    const btn = event.currentTarget as HTMLElement;
    btn.classList.remove('hovered');
  }
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SEOService);

  post: BlogPost | null = null;
  isLoading = true;
  notFound = false;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.blogService.getPostBySlug(slug).subscribe({
      next: (post) => {
        if (post) {
          this.post = post;
          this.setupSEO(post);
        } else {
          this.notFound = true;
        }
        this.isLoading = false;
      },
      error: () => {
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  private setupSEO(post: BlogPost): void {
    this.seoService.updateSEO({
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords?.join(', '),
      image: post.image?.url,
      author: post.author?.name,
      publishDate: post.publishedAt,
      type: 'article'
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
