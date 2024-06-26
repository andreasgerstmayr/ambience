import { error } from '@sveltejs/kit';
import { prepareSlides } from '$lib/server/slides';
import type { PageServerLoad } from './$types';
import { getImmichAlbums } from '$lib/server/immich';
import type { SlideImage } from '$lib/types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
  let images: SlideImage[];
  try {
    images = await getImmichAlbums();
  } catch (e) {
    console.error(e);
    throw error(500, 'could not fetch images. please check server logs.');
  }

  const slides = prepareSlides(images);
  if (slides.length === 0) {
    throw error(500, 'no assets found');
  }

  return {
    slides,
    duration: parseInt(env.SLIDESHOW_DURATION || '20')
  };
};
