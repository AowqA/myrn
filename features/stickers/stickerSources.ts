import { ImageSourcePropType } from 'react-native';

export type StickerOption = {
  id: string;
  source: ImageSourcePropType;
};

export const DEFAULT_STICKER_SIZE = 40;
export const MIN_STICKER_SIZE = 24;
export const MAX_STICKER_SIZE = 96;

export const BUILT_IN_STICKERS: StickerOption[] = [
  { id: 'emoji-local-1', source: require('@/assets/images/emoji1.png') },
  { id: 'emoji-local-2', source: require('@/assets/images/emoji2.png') },
  { id: 'emoji-local-3', source: require('@/assets/images/emoji3.png') },
  { id: 'emoji-local-4', source: require('@/assets/images/emoji4.png') },
  { id: 'emoji-local-5', source: require('@/assets/images/emoji5.png') },
  { id: 'emoji-local-6', source: require('@/assets/images/emoji6.png') },
  {
    id: 'emoji-remote-sunglasses',
    source: { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60e.png' },
  },
  {
    id: 'emoji-remote-party',
    source: { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png' },
  },
  {
    id: 'emoji-remote-rocket',
    source: { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png' },
  },
  {
    id: 'emoji-remote-star',
    source: { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f31f.png' },
  },
];
