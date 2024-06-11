import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {
  AssetTypeEnum,
  defaults,
  getAlbumInfo,
  getAllAlbums,
  type AssetResponseDto,
  type ExifResponseDto
} from '@immich/sdk';
import type { SlideImage } from '$lib/types';

const IMMICH_HOST = env.IMMICH_HOST || '';
const IMMICH_API_KEY = env.IMMICH_API_KEY || '';
const IMMICH_ALBUMS = env.IMMICH_ALBUMS || '';

function getLocation(exif?: ExifResponseDto) {
  let location = exif?.country || '';
  if (exif?.city) {
    location = `${exif.city}, ${location}`;
  }
  return location;
}

function isLandscape(exif?: ExifResponseDto) {
  if (!exif || !exif.exifImageWidth || !exif.exifImageHeight) return true;

  let isLandscape = exif.exifImageWidth >= exif.exifImageHeight;
  if (exif.orientation) {
    const orientation = parseInt(exif.orientation);
    // http://sylvana.net/jpegcrop/exif_orientation.html
    if (orientation >= 5 && orientation <= 8) {
      isLandscape = !isLandscape;
    }
  }

  return isLandscape;
}

function assetToImage(asset: AssetResponseDto): SlideImage {
  return {
    src: `${IMMICH_HOST}/api/assets/${asset.id}/thumbnail?size=preview&apiKey=${IMMICH_API_KEY}`,
    location: getLocation(asset.exifInfo),
    date: new Date(asset.localDateTime),
    isLandscape: isLandscape(asset.exifInfo)
  };
}

export async function getImmichAlbums(): Promise<SlideImage[]> {
  if (IMMICH_HOST == '') {
    throw error(500, 'Please set the IMMICH_HOST environment variable.');
  }
  if (IMMICH_API_KEY == '') {
    throw error(500, 'Please set the IMMICH_API_KEY environment variable.');
  }
  if (IMMICH_ALBUMS == '') {
    throw error(500, 'Please set the IMMICH_ALBUMS environment variable.');
  }

  defaults.baseUrl = `${IMMICH_HOST}/api`;
  defaults.headers = { 'x-api-key': IMMICH_API_KEY };

  const albumNames = IMMICH_ALBUMS.split(',');
  const allAlbums = await getAllAlbums({});
  const albums = allAlbums.filter((x) => albumNames.includes(x.albumName));
  const albumInfos = await Promise.all(albums.map((x) => getAlbumInfo({ id: x.id })));
  return albumInfos
    .flatMap((x) => x.assets)
    .filter((x) => x.type == AssetTypeEnum.Image)
    .map(assetToImage);
}
