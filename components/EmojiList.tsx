/**
 * EmojiList 组件
 *
 * 功能：显示一个水平滚动的表情图片列表，用户可以从中选择一个表情。
 * 同时提供“上传自定义 Emoji”入口。
 */

import { Image } from 'expo-image';
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  emojiOptions: ImageSourcePropType[];
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
  onAddCustomEmoji: () => void;
}

export default function EmojiList({ emojiOptions, onSelect, onCloseModal, onAddCustomEmoji }: Props) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onAddCustomEmoji}
        style={({ pressed }) => [styles.uploadButton, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={styles.uploadButtonText}>Upload Emoji</Text>
      </Pressable>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        data={emojiOptions}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Image source={item} style={styles.image} contentFit="contain" />
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
  uploadButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
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
