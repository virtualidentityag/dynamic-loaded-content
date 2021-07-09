export class DynamicLoadedContent extends HTMLElement {
  imports: string[] = [];
  html: string = '';
  useImports: boolean = true;

  protected async connectedCallback() {
    const baseUrl: string = this.getAttribute('base-url') || '';
      await Promise.all(this.imports.map((url: string) => this.useImports ? import(baseUrl + url) : this.loadScriptSync(baseUrl + url)));

    this.render();
  }

  private render() {
    this.innerHTML = this.html;
    this.componentDidLoad();
  }

  protected componentDidLoad() {
    // Add runtime code here
  }

  private loadScriptSync(src: string): Promise<void> {
    return new Promise((res, rej) => {
      var s = document.createElement('script');
      s.src = src;
      s.type = "text/javascript";
      s.async = false;
      s.onload = () => res();
      document.head.appendChild(s);
    })
  }
}