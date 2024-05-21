import type { SlideImage } from '$lib/types';
import { shuffle } from 'lodash-es';

export function prepareSlides(images: SlideImage[]) {
  // eslint-disable-next-line prefer-const
  let [landscapes, portraits] = images.reduce(
    (acc, x) => {
      acc[x.isLandscape ? 0 : 1].push(x);
      return acc;
    },
    [[] as SlideImage[], [] as SlideImage[]]
  );

  // add all landscape images
  let slides = landscapes.map((x) => ({ images: [x] }));

  // combine two portrait images in one slide
  portraits = shuffle(portraits);
  for (let i = 0; i < portraits.length; i += 2) {
    const second = i + 1 < portraits.length ? portraits[i + 1] : portraits[0];
    slides.push({ images: [portraits[i], second] });
  }

  // shuffle landscape and portrait slides
  slides = shuffle(slides);

  return slides;
}
