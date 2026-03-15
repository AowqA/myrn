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
