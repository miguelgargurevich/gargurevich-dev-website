import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BlogService } from '../../services/blog.service';
import { BlogPost, BlogCategory, BlogPagination, BlogFilters } from '../../models/blog.model';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SEOService);

  posts: BlogPost[] = [];
  featuredPosts: BlogPost[] = [];
  categories: BlogCategory[] = [];
  pagination: BlogPagination | null = null;
  
  selectedCategory = '';
  searchTerm = '';
  isLoading = false;

  ngOnInit(): void {
    this.setupSEO();
    this.loadCategories();
    this.loadPosts();
  }

  private setupSEO(): void {
    this.seoService.updateSEO({
      title: 'Blog Técnico - Gargurevich.Dev',
      description: 'Artículos, tutoriales y consejos sobre desarrollo web, Angular, TypeScript y tecnología. Blog técnico de Gargurevich.Dev.',
      keywords: 'Blog, Desarrollo Web, Angular, TypeScript, Tutoriales, Tecnología',
      type: 'website'
    });
  }

  private loadCategories(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = [
        { id: 'all', name: 'Todos los Artículos', slug: 'all', description: '', color: '' },
        ...categories
      ];
    });
  }

  private loadPosts(page: number = 1): void {
    this.isLoading = true;
    
    const filters: BlogFilters = {};
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      filters.category = this.selectedCategory;
    }
    if (this.searchTerm) {
      filters.search = this.searchTerm;
    }

    this.blogService.getPosts(filters, page).subscribe({
      next: (response: { posts: BlogPost[]; pagination: BlogPagination }) => {
        this.posts = response.posts;
        this.pagination = response.pagination;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });

    // Load featured posts
    this.blogService.getFeaturedPosts().subscribe({
      next: (featured: BlogPost[]) => {
        this.featuredPosts = featured;
      },
      error: () => {
        this.featuredPosts = [];
      }
    });
  }

  selectCategory(categorySlug: string): void {
    this.selectedCategory = categorySlug;
    this.loadPosts(1);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.loadPosts(1);
  }

  onPageChange(page: number): void {
    this.loadPosts(page);
  }

  getCategoryName(categorySlug: string): string {
    const category = this.categories.find(cat => cat.slug === categorySlug);
    return category ? category.name : categorySlug;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  trackByPostId(index: number, post: BlogPost): string {
    return post.id;
  }
}
