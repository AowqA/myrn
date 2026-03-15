/**
 * 主页面组件 - 图片编辑应用
 *
 * 功能描述：
 * 这是一个图片编辑应用的主页面，提供以下核心功能：
 * 1. 从相册选择图片
 * 2. 添加表情贴纸到图片上
 * 3. 拖拽和缩放贴纸
 * 4. 保存编辑后的图片到相册
 * 5. 贴纸快速操作（随机贴纸、清除贴纸、大小调节）
 * 6. 支持上传自定义 Emoji 作为贴纸
 */

import domtoimage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useMemo, useRef, useState } from 'react';
import { ImageSourcePropType, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

const BuiltInStickerOptions: ImageSourcePropType[] = [
  require('@/assets/images/emoji1.png'),
  require('@/assets/images/emoji2.png'),
  require('@/assets/images/emoji3.png'),
  require('@/assets/images/emoji4.png'),
  require('@/assets/images/emoji5.png'),
  require('@/assets/images/emoji6.png'),
  { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60e.png' },
  { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png' },
  { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png' },
  { uri: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f31f.png' },
];

const MIN_STICKER_SIZE = 24;
const MAX_STICKER_SIZE = 96;

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [stickerSize, setStickerSize] = useState<number>(40);
  const [customStickers, setCustomStickers] = useState<ImageSourcePropType[]>([]);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  const stickerOptions = useMemo(
    () => [...customStickers, ...BuiltInStickerOptions],
    [customStickers],
  );

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onAddCustomEmoji = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadedEmoji = { uri: result.assets[0].uri };
      setCustomStickers(previous => [uploadedEmoji, ...previous]);
      setPickedEmoji(uploadedEmoji);
      setShowAppOptions(true);
      onModalClose();
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
    setIsModalVisible(false);
    setStickerSize(40);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onClearSticker = () => {
    setPickedEmoji(undefined);
  };

  const onRandomSticker = () => {
    const randomIndex = Math.floor(Math.random() * stickerOptions.length);
    setPickedEmoji(stickerOptions[randomIndex]);
    setShowAppOptions(true);
  };

  const onIncreaseStickerSize = () => {
    setStickerSize(previous => Math.min(previous + 8, MAX_STICKER_SIZE));
  };

  const onDecreaseStickerSize = () => {
    setStickerSize(previous => Math.max(previous - 8, MIN_STICKER_SIZE));
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={stickerSize} stickerSource={pickedEmoji} />}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>

          <View style={styles.optionsRowSecondary}>
            <IconButton icon="auto-awesome" label="Random" onPress={onRandomSticker} />
            <IconButton icon="zoom-out" label="Smaller" onPress={onDecreaseStickerSize} />
            <IconButton icon="zoom-in" label="Bigger" onPress={onIncreaseStickerSize} />
            <IconButton icon="delete-outline" label="Clear" onPress={onClearSticker} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          <Button label="Surprise me with sticker" onPress={onRandomSticker} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          emojiOptions={stickerOptions}
          onSelect={setPickedEmoji}
          onCloseModal={onModalClose}
          onAddCustomEmoji={onAddCustomEmoji}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionsRowSecondary: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
