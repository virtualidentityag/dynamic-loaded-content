export class DynamicLoadedContent extends HTMLElement {
  imports: string[] = [];
  html: string = '';
  useImports: boolean = true;

  protected async connectedCallback() {
    const baseUrl: string = this.getAttribute('base-url') || '';
    await Promise.all(this.imports
      .map((url: string) => {
        return url.startsWith('/') ? baseUrl + url : url
      })
      .map(this.loadForExtention.bind(this)));
    this.render();
  }

  private render() {
    this.innerHTML = this.html;
    this.componentDidLoad();
  }

  protected componentDidLoad() {
    // Add runtime code here
  }

  private loadForExtention(url: string): Promise<void> {
    const extentionRegex = new RegExp(/\.[a-z]*$/);
    const extention = url.match(extentionRegex);
    const loaderMap: any = {
      '.js': this.loadScript.bind(this),
      '.css': this.loadStyle.bind(this),
    }
    return extention ? loaderMap[(extention[0])](url) : Promise.resolve();
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

  private loadStyle(src: string): Promise<void> {
    return new Promise((res, rej) => {
      var s = document.createElement('link');
      s.href = src;
      s.rel = "stylesheet";
      s.onload = () => res();
      document.head.appendChild(s);
    })
  }

  private loadScript(src: string): Promise<void> {
    return this.useImports ? import(src) : this.loadScriptSync(src)
  }
}