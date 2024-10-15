import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgxBoxySvgService } from './ngx-boxy-svg.service';
import {
  JPEGFileOptions,
  PDFFileOptions,
  PNGFileOptions,
  WebPFileOptions,
} from './models/file-options.interface';

@Component({
  selector: 'ngx-boxy-svg',
  exportAs: 'ngxBoxySvg',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxBoxySvgComponent implements OnInit {
  private boxyElement: any | null = null;

  private notLoadedMessage: string = 'Boxy SVG element is not initialized';

  /**
   * URL of the edited SVG file
   * 'null' if the file was loaded from disk using the 'setSVG' method
   */
  @Input() src: string | null = null;
  /**
   * The app name.
   * Shown in the top left app window corner and by the "About" dialog.
   * @default "Boxy SVG"
   */
  @Input() name: string = '';

  /**
   * URL to the app logo.
   * Shown by the "About" dialog.
   * @default "https://boxy-svg.com/logo.svg"
   */
  @Input() logo: string | undefined;

  /**
   * URL to the app main menu in HTML format.
   * @default "https://boxy-svg.com/menus/default.html"
   */
  @Input() menu: string | undefined;

  /**
   * URL to the UI localization file in Fluent format.
   * If multiple URLs are provided, subsequent files will be used as a fallback when a message is not found in the primary file.
   * @default "https://boxy-svg.com/locales/en.ftl"
   */
  @Input() locale: string | undefined;

  /**
   * URL to the UI theme file in CSS format.
   * @default "https://boxy-svg.com/themes/fluent.css"
   */
  @Input() theme: string | undefined;

  /**
   * URL to the iconset file in SVG format.
   * If multiple URLs are provided, subsequent files will be used as a fallback when an icon is not found in the primary file.
   * @default "https://boxy-svg.com/icons/default.svg"
   */
  @Input() icons: string | string[] | undefined;

  /**
   * UI Accent color
   * You can use either a hex color code such as "#bada55" or one of the following preset color names: "blue", "purple", "pink", "red", "orange", "yellow", "green", "graphite".
   * @default "blue"
   */
  @Input() accent: string | undefined;

  /**
   * IDs of tools to be loaded.
   * @default ["transform", "edit", "pan", "spline", "freehand", "blob", "rect", "ellipse", "other-shape", "text", "text-path", "view", "manual-guide"]
   */
  @Input() tools: string[] | undefined;

  /**
   * IDs of panels to be loaded.
   * @default ["fill", "stroke", "compositing", "typography", "geometry", "meta", "shape", "arrangement", "objects", "defs", "library", "generators", "export", "history", "elements", "animations"]
   */
  @Input() panels: string[] | undefined;

  /**
   * Emitted when the boxy-svg element has been added to the DOM.
   */
  @Output() loaded: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Fired each time when user manipulates the currently edited SVG document.
   */
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Fired when internal app settings have changed.
   * Your can read the changed key from event.detail.key and the new value from event.detail.value.
   */
  @Output() configchange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Fired when user has triggered a command by clicking a menu item or by pressing a keyboard shortcut.
   * You can read the ID of the command that was triggered from event.detail.id and prevent the default action by calling event.preventDefault().
   */
  @Output() command: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * We don't directly know when the Boxy SVG element is loaded, so we need to track it ourselves.
   * @private
   */
  private _loaded: boolean = false;

  /**
   * If this is set, the BoxySVG Script will be not be loaded from the default Boxy SVG website.
   * But it will be loaded from the given path.
   * @example
   * Set this in the angular.json file:
   * scripts: ["path/to/boxy-svg/component.js"]
   *
   */
  @Input() localPath: string | undefined;

  constructor(
    private service: NgxBoxySvgService,
    private elRef: ElementRef,
  ) {}

  ngOnInit() {
    if (this.localPath) {
      this.service.loadLocalScript('libs/boxy-svg/component.js').then(() => {
        this.createBoxySvgElement();
      });
    } else {
      this.service.loadScript().then(() => {
        this.createBoxySvgElement();
      });
    }
  }

  private createBoxySvgElement() {
    this.boxyElement = document.createElement('boxy-svg');
    this.elRef.nativeElement.appendChild(this.boxyElement);

    this.boxyElement.addEventListener('change', (event: any) => {
      // We know that boxy is loaded at this point
      if (!this._loaded) {
        this._loaded = true;
        this.loaded.emit();
      }
      this.change.emit(event);
    });

    this.boxyElement.addEventListener('configchange', (event: any) => {
      this.configchange.emit(event);
    });

    this.boxyElement.addEventListener('command', (event: any) => {
      this.command.emit(event);
    });

    this.applyConfig();
  }

  private applyConfig() {
    if (this.boxyElement === null) {
      return;
    }
    if (this.name) {
      this.boxyElement.name = this.name;
    }
    if (this.logo) {
      this.boxyElement.logo = this.logo;
    }
    if (this.src) {
      this.setSVG(this.src);
    }
    if (this.locale) {
      this.boxyElement.locale = this.locale;
    }
    if (this.theme) {
      this.boxyElement.theme = this.theme;
    }
    if (this.icons) {
      this.boxyElement.icons = this.icons;
    }
    if (this.accent) {
      this.boxyElement.accent = this.accent;
    }
    if (this.tools) {
      this.boxyElement.tools = this.tools;
    }
    if (this.panels) {
      this.boxyElement.panels = this.panels;
    }
    if (this.menu) {
      this.boxyElement.menu = this.menu;
    }
  }

  /**
   * Get the currently edited SVG document.
   * @returns Promise<string> - SVG document as a string
   * @throws Error if the Boxy SVG element is not initialized
   */
  public getSVG(): Promise<string> {
    if (this.boxyElement) {
      return this.boxyElement.getSVG();
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Set the SVG document to be edited.
   * @param svg - SVG document as a string
   * @returns Promise<void>
   * @throws Error if the Boxy SVG element is not initialized
   */
  public setSVG(svg: string): Promise<void> {
    if (this.boxyElement) {
      return this.boxyElement.setSVG(svg);
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Insert another SVG document into the currently edited SVG document.
   * @param svg - SVG document as a string
   * @returns Promise<void>
   * @throws Error if the Boxy SVG element is not initialized
   */
  public insertSVG(svg: string): Promise<void> {
    if (this.boxyElement) {
      return this.boxyElement.insertSVG(svg);
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Get the advanced app configuration.
   * @param key - Optional key to get a specific configuration value
   */
  public getConfig(key?: string): any {
    if (this.boxyElement) {
      return this.boxyElement.getConfig(key);
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Set the advanced app configuration.
   * @param key
   * @param value
   * @throws Error if the Boxy SVG element is not initialized
   */
  public setConfig(key: string, value: any): void {
    if (this.boxyElement) {
      this.boxyElement.setConfig(key, value);
    } else {
      throw new Error(this.notLoadedMessage);
    }
  }

  /**
   * Get IDs of all available commands.
   */
  public getCommands(): Promise<string[]> {
    if (this.boxyElement) {
      return this.boxyElement.getCommands();
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Execute a command by its ID.
   * @param id
   * @returns Promise<void>
   * @throws Error if the Boxy SVG element is not initialized
   */
  public execCommand(id: string): Promise<void> {
    if (this.boxyElement) {
      return this.boxyElement.execCommand(id);
    }
    throw new Error(this.notLoadedMessage);
  }

  /**
   * Export the currently edited SVG document to a file.
   * @param options
   * @returns Promise<Blob[]> - Array of exported files
   * @throws Error if the Boxy SVG element is not initialized
   */
  public export(
    options: Array<
      PNGFileOptions | JPEGFileOptions | WebPFileOptions | PDFFileOptions
    >,
  ): Promise<Array<Blob>> {
    if (this.boxyElement) {
      return this.boxyElement.export(options);
    }
    throw new Error(this.notLoadedMessage);
  }
}
