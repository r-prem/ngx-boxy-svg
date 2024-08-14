import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxBoxySvgService {
  private scriptURL: string = 'https://boxy-svg.com/embed.js';

  public scriptElement: HTMLScriptElement | undefined;
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
}
