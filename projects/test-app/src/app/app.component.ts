import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxBoxySvgComponent } from '../../../ngx-boxy-svg/src/lib/ngx-boxy-svg.component';
import { NgxBoxySvgModule } from '../../../ngx-boxy-svg/src/lib/ngx-boxy-svg.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxBoxySvgModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
