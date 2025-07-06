import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'simpleMarkdown', standalone: true })
export class SimpleMarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    // Títulos ###, ##, #
    value = value.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    value = value.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    value = value.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    // Negritas **texto**
    value = value.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
    // Citas >
    value = value.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    // Listas - item
    value = value.replace(/^\- (.*$)/gim, '<li>$1</li>');
    value = value.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    // Código ```
    value = value.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
    // Imágenes ![alt](url)
    value = value.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" style="max-width:100%;border-radius:8px;margin:16px 0;">');
    // Saltos de línea
    value = value.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
