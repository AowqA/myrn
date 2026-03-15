/**
 * EmojiList 组件
 *
 * 功能：显示一个水平滚动的表情图片列表，用户可以从中选择一个表情。
 * 同时提供“上传自定义 Emoji”入口。
 */

import { Image } from 'expo-image';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { StickerOption } from '@/features/stickers/stickerSources';

interface Props {
  emojiOptions: StickerOption[];
  customStickerCount: number;
  onSelect: (sticker: StickerOption) => void;
  onCloseModal: () => void;
  onAddCustomEmoji: () => void;
  onClearCustomEmoji: () => void;
}

export default function EmojiList({
  emojiOptions,
  customStickerCount,
  onSelect,
  onCloseModal,
  onAddCustomEmoji,
  onClearCustomEmoji,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={onAddCustomEmoji}
          style={({ pressed }) => [styles.uploadButton, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.uploadButtonText}>上传 Emoji</Text>
        </Pressable>

        {customStickerCount > 0 && (
          <Pressable
            onPress={onClearCustomEmoji}
            style={({ pressed }) => [styles.clearButton, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.clearButtonText}>清空已上传（{customStickerCount}）</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.tipText}>重置仅清空编辑状态，不会删除已上传 Emoji。</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        data={emojiOptions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Image source={item.source} style={styles.image} contentFit="contain" />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 8,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 8,
  },
  uploadButton: {
    backgroundColor: '#25292e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  clearButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  clearButtonText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '600',
  },
  tipText: {
    color: '#6b7280',
    fontSize: 12,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
    borderRadius: 10,
  },
});
