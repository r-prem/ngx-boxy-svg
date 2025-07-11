# NgxBoxySvg

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

This library acts as a wrapper to provide a simple way to include boxy-svg (https://boxy-svg.com/embed) into your Angular project.
This component integrates the powerful Boxy SVG editor into your Angular application, providing a rich set of features for SVG manipulation and export.

## Compatibility
This library was created with backwards compatibility in mind. It should work with Angular 14 and above.

## Installation

```bash
npm install ngx-boxy-svg
```

## Usage

```typescript
import { NgxBoxySvgComponent } from "ngx-boxy-svg";
```

```html
<ngx-boxy-svg></ngx-boxy-svg>
```


## Inputs

| Input        | Type                              | Default                                                                     | Description                                                                                                                                     |
|--------------|-----------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `localePath` | `string \| undefined`             | `undefined`                                                                 | If this is set, the BoxySVG Script will be not be loaded from the default Boxy SVG website, but will be loaded from the default BoxySVG website |
| `src`        | `string \| null`                  | `null`                                                                      | URL of the edited SVG file. `null` if the file was loaded from disk using the `setSVG` method.                                                  |
| `name`       | `string`                          | `"Boxy SVG"`                                                                | The app name. Shown in the top left app window corner and by the "About" dialog.                                                                |
| `logo`       | `string \| undefined`             | `"https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/logo.svg"`           | URL to the app logo. Shown by the "About" dialog.                                                                                               |
| `menu`       | `string \| undefined`             | `"https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/menus/default.html"` | URL to the app main menu in HTML format.                                                                                                        |
| `locale`     | `string \| undefined`             | `"https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/locales/en.ftl"`     | URL to the UI localization file in Fluent format. Multiple URLs can be provided for fallback when a message is not found in the primary file.   |
| `theme`      | `string \| undefined`             | `"https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/themes/fluent.css"`  | URL to the UI theme file in CSS format.                                                                                                         |
| `icons`      | `string \| string[] \| undefined` | `"https://boxy-svg.com/node_modules/@boxy-svg/boxy-svg/icons/default.svg"`  | URL to the iconset file in SVG format. Multiple URLs can be provided for fallback when an icon is not found in the primary file.                |
| `accent`     | `string \| undefined`             | `"blue"`                                                                    | UI Accent color. Can be a hex color code (e.g., `"#bada55"`) or a preset color name (e.g., `"blue"`, `"purple"`, `"pink"`, etc.).               |
| `tools`      | `string[] \| undefined`           | `["transform", "edit", "pan", "spline", ...]`                               | IDs of tools to be loaded.                                                                                                                      |
| `panels`     | `string[] \| undefined`           | `["fill", "stroke", "compositing", "typography", ...]`                      | IDs of panels to be loaded.                                                                                                                     |
| `basePath`   | `string \| undefined`             | `undefined`                                                                 | Specifies the base path to load the Boxy SVG script, if it's not loaded from the default Boxy SVG website.                                      |

## Outputs

| Output        | Type                | Description                                                                                                               |
|---------------|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| `loaded`      | `EventEmitter<void>` | Emitted when the Boxy SVG element has been added to the DOM.                                                               |
| `change`      | `EventEmitter<any>`  | Fired each time the user manipulates the currently edited SVG document.                                                    |
| `configchange`| `EventEmitter<any>`  | Fired when internal app settings have changed. The changed key can be accessed via `event.detail.key`, and the new value via `event.detail.value`. |
| `command`     | `EventEmitter<Event>` | Fired when the user triggers a command by clicking a menu item or pressing a keyboard shortcut. The command ID can be accessed via `event.detail.id`. |

## Public Methods

The `NgxBoxySvgComponent` provides several public methods for interacting with the Boxy SVG editor:

### `getSVG(): Promise<string>`
Gets the currently edited SVG document as a string.

### `setSVG(svg: string): Promise<void>`
Sets the SVG document to be edited.

### `insertSVG(svg: string): Promise<void>`
Inserts another SVG document into the currently edited SVG document.

### `getConfig(key?: string): any`
Gets the advanced app configuration. Optionally, provide a key to retrieve a specific configuration value.

### `setConfig(key: string, value: any): void`
Sets the advanced app configuration.

### `getCommands(): Promise<string[]>`
Gets the IDs of all available commands.

### `execCommand(id: string): Promise<void>`
Executes a command by its ID.

### `export(options: Array<PNGFileOptions | JPEGFileOptions | WebPFileOptions | PDFFileOptions>): Promise<Array<Blob>>`
Exports the currently edited SVG document to a file. Returns an array of exported files as blobs.

## Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-boxy-svg
      [name]="'My SVG Editor'"
      [accent]="'purple'"
      (loaded)="onEditorLoaded()"
      (change)="onEditorChange($event)"
    ></ngx-boxy-svg>
  `,
})
export class AppComponent {
  onEditorLoaded() {
    console.log('Boxy SVG editor loaded');
  }

  onEditorChange(event: any) {
    console.log('SVG document changed', event);
  }
}
```

## Credits
This Angular wrapper component was created by Raffael Prem.

The actual SVG editing functionality is provided by the Boxy SVG application. Full credit for the design and development of the SVG editor goes to the creators of Boxy SVG (https://boxy-svg.com).

This library simply provides a way to integrate Boxy SVG into Angular applications.

## License
This project is licensed under the MIT License.
