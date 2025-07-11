import { Injectable } from '@angular/core';

@Injectable()
export class NgxBoxySvgService {
  private scriptURL: string = 'https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/embed.js';

  public scriptElement: HTMLScriptElement | undefined;

  /**
   * Loads the Boxy SVG script and adds it to the document head
   */
  loadScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scriptURL;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      this.scriptElement = script;
    });
  }

  loadLocalScript(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = path;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      this.scriptElement = script;
    });
  }
}
