import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxBoxySvgComponent } from '../../../ngx-boxy-svg/src/lib/ngx-boxy-svg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxBoxySvgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'test-app';
  @ViewChild('boxySvg') boxySvg: NgxBoxySvgComponent | undefined;

  ngAfterViewInit(): void {
    if (this.boxySvg) {
      this.boxySvg.name = 'My Box';
    }
  }
}
