
import { ThumbnailStyle } from './types';

export const APP_NAME = "ThumbGenie AI";
export const FREE_DAILY_QUOTA = 3;

export const STYLES: ThumbnailStyle[] = [
  {
    id: 'clickbait',
    name: 'Viral Clickbait',
    description: 'High contrast, shocking elements, and vibrant colors.',
    promptSuffix: 'vibrant cinematic lighting, high contrast, viral clickbait style, expressive character face, 8k resolution, bold colors, professional graphic design',
    previewImage: 'https://picsum.photos/seed/click/400/225'
  },
  {
    id: 'gaming',
    name: 'Pro Gaming',
    description: 'Neon accents, dark backgrounds, and energetic compositions.',
    promptSuffix: 'esports style, neon glow accents, dark cinematic background, high energy, gaming setup aesthetic, ray tracing, sharp details',
    previewImage: 'https://picsum.photos/seed/game/400/225'
  },
  {
    id: 'tech',
    name: 'Sleek Tech',
    description: 'Clean, futuristic, and professional blue/silver tones.',
    promptSuffix: 'minimalist tech review style, futuristic clean aesthetic, soft professional studio lighting, depth of field, premium quality',
    previewImage: 'https://picsum.photos/seed/tech/400/225'
  },
  {
    id: 'vlog',
    name: 'Lifestyle Vlog',
    description: 'Warm, natural, and authentic everyday vibes.',
    promptSuffix: 'authentic lifestyle photography, warm natural sunlight, soft bokeh background, inviting atmosphere, high-end camera look',
    previewImage: 'https://picsum.photos/seed/vlog/400/225'
  }
];
