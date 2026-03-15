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

test('emoji list uses stable id keys and chinese upload copy', () => {
  const emojiListSource = fs.readFileSync('components/EmojiList.tsx', 'utf8');
  assert.equal(emojiListSource.includes('keyExtractor={item => item.id}'), true);
  assert.equal(emojiListSource.includes('上传 Emoji'), true);
  assert.equal(emojiListSource.includes('重置仅清空编辑状态，不会删除已上传 Emoji。'), true);
});

test('main screen uses collapsible action bar and chinese main actions', () => {
  const indexSource = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');
  assert.equal(indexSource.includes('isExpanded={showAdvancedActions}'), true);
  assert.equal(indexSource.includes('onToggleExpanded={toggleAdvancedActions}'), true);
  assert.equal(indexSource.includes('label="选择图片"'), true);
});

test('about page includes privacy and feedback details', () => {
  const aboutSource = fs.readFileSync('app/(tabs)/about.tsx', 'utf8');
  assert.equal(aboutSource.includes('隐私说明'), true);
  assert.equal(aboutSource.includes('反馈'), true);
  assert.equal(aboutSource.includes('feedback@myrn.app'), true);
});
