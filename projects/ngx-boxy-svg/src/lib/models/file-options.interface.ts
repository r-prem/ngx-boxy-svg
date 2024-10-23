export interface PNGFileOptions {
  format: 'png';
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  scale?: number;
  dpi?: number;
  background?: string;
  antiAliasing?: boolean;
  animation?: number | null;
}

export interface JPEGFileOptions {
  format: 'jpeg';
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  scale?: number;
  dpi?: number;
  compression?: number;
  background?: string;
  antiAliasing?: boolean;
  animation?: number | null;
}

export interface WebPFileOptions {
  format: 'webp';
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  scale?: number;
  compression?: {value:number, lossy:boolean};
  background?: string;
  antiAliasing?: boolean;
  animation?: number | null;
}

export interface GIFFileOptions {
  format: 'gif';
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  scale?: number;
  background?: string;
  antiAliasing?: boolean;
  dithering?: 'none' | 'stucki' | 'atkinson';
  animation?: number | null;
}

export interface SVGFileOptions {
  format: 'svg';
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  units?: 'px' | 'cm' | 'mm' | 'in' | 'pt' | 'pc' | 'q' | '%';
  compression?: number;
  normalization: 'web-static' | 'web-secure-static' | 'web-animated' | 'web-secure-animated' | 'web-dynamic-interactive' | 'boxy-svg' | 'lightburn' | null;
}

export interface HTMLFileOptions {
  format: 'html';
  href?: string | ':root';
}

export interface PDFPageOptions {
  href?: string | ':root';
  width?: number | 'auto';
  height?: number | 'auto';
  units?: 'cm' | 'in';
  background?: string;
  animation?: number | null;
}

export interface PDFFileOptions {
  format: 'pdf';
  pages: PDFPageOptions[];
}
