import { describe, it, expect } from 'vitest';
import { prepareSlides } from './slides';

describe('slides', () => {
  it('combines portrait images', () => {
    const images = [
      { src: 'a.jpg', location: '', date: new Date(), isLandscape: true },
      { src: 'b.jpg', location: '', date: new Date(), isLandscape: false }
    ];
    const slides = prepareSlides(images);
    expect(slides.length).toBe(2);
  });
});
