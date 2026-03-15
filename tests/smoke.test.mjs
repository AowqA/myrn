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

test('index screen includes permission effect and random sticker guard', () => {
  const indexSource = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

  assert.equal(indexSource.includes('useEffect(() => {'), true, 'permission request should run in useEffect');
  assert.equal(indexSource.includes('if (status === null)'), true, 'permission null-state guard should exist');
  assert.equal(indexSource.includes('if (stickerOptions.length === 0)'), true, 'random sticker should guard empty list');
  assert.equal(indexSource.includes("Alert.alert('Upload failed'"), true, 'custom upload should handle failures');
});

test('README documents custom emoji upload capability', () => {
  const readme = fs.readFileSync('README.md', 'utf8');
  assert.equal(readme.includes('自定义 Emoji 上传'), true);
});
