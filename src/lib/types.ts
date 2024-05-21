export interface SlideImage {
  src: string;
  location: string;
  date: Date;
  isLandscape: boolean;
}

export interface Slide {
  images: SlideImage[];
}

export interface Config {
  slides: Slide[];

  /** slide duration in seconds */
  duration: number;
}
