export class DynamicLoadedContent extends HTMLElement {
  imports: string[] = [];
  html: string = '';

  protected async connectedCallback() {
    const baseUrl: string = this.getAttribute('base-url') || '';
    await Promise.all(this.imports.map((url: string) => import(baseUrl + url)));
    this.render();
  }

  private render() {
    this.innerHTML = this.html;
    this.componentDidLoad();
  }

  protected componentDidLoad() {
    // Add runtime code here
  }
}