import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const emojiAssets = [
  'assets/images/emoji1.png',
  'assets/images/emoji2.png',
  'assets/images/emoji3.png',
  'assets/images/emoji4.png',
  'assets/images/emoji5.png',
  'assets/images/emoji6.png',
];

test('all emoji assets referenced by the picker exist', () => {
  for (const assetPath of emojiAssets) {
    assert.equal(fs.existsSync(assetPath), true, `${assetPath} should exist`);
  }
});

test('emoji asset list is unique to avoid duplicate choices', () => {
  const unique = new Set(emojiAssets);
  assert.equal(unique.size, emojiAssets.length);
});

test('sticker architecture modules exist', () => {
  assert.equal(fs.existsSync('hooks/useStickerEditor.ts'), true);
  assert.equal(fs.existsSync('features/stickers/stickerSources.ts'), true);
  assert.equal(fs.existsSync('components/EditorToolbar.tsx'), true);
  assert.equal(fs.existsSync('components/StickerActionsBar.tsx'), true);
});

test('emoji list uses stable id keys instead of index keys', () => {
  const emojiListSource = fs.readFileSync('components/EmojiList.tsx', 'utf8');
  assert.equal(emojiListSource.includes('keyExtractor={item => item.id}'), true);
});

test('main screen delegates state logic to sticker hook', () => {
  const indexSource = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');
  assert.equal(indexSource.includes("import { useStickerEditor } from '@/hooks/useStickerEditor';"), true);
  assert.equal(indexSource.includes('<EditorToolbar'), true);
  assert.equal(indexSource.includes('<StickerActionsBar'), true);
});
