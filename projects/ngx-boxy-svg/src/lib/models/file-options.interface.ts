export interface BaseFileOptions {
  format: string;
  area?: 'selection' | 'view' | string;
  width?: number | 'auto';
  height?: number | 'auto';
  scale?: number;
  antiAliasing?: boolean;
  background?: string;
}

export interface PNGFileOptions extends BaseFileOptions {
  dpi?: number;
}

export interface JPEGFileOptions extends BaseFileOptions {
  compression?: number;
  dpi?: number;
}

export interface WebPFileOptions extends BaseFileOptions {
  compression?: number;
}

export interface PDFPageOptions {
  area: 'selection' | 'view' | string;
  width: number | 'auto';
  height: number | 'auto';
  units: 'cm' | 'in';
  background: string;
}
export interface PDFFileOptions {
  format: 'pdf';
  pages: PDFPageOptions[];
}
