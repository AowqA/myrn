import domtoimage from 'dom-to-image';
import * as MediaLibrary from 'expo-media-library';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import Button from '@/components/Button';
import EditorToolbar from '@/components/EditorToolbar';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import ImageViewer from '@/components/ImageViewer';
import StickerActionsBar from '@/components/StickerActionsBar';
import { useStickerEditor } from '@/hooks/useStickerEditor';
import { useEffect, useRef } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  const {
    selectedImage,
    showAppOptions,
    isModalVisible,
    pickedEmoji,
    stickerSize,
    stickerOptions,
    customStickerCount,
    showAdvancedActions,
    pickImageAsync,
    onAddCustomEmoji,
    onClearCustomStickers,
    onReset,
    onRandomSticker,
    onIncreaseStickerSize,
    onDecreaseStickerSize,
    onClearSticker,
    onSelectSticker,
    openStickerPicker,
    closeStickerPicker,
    enableEditor,
    toggleAdvancedActions,
  } = useStickerEditor();

  useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [requestPermission, status]);

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('已保存！');
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
          <EditorToolbar onReset={onReset} onAddSticker={openStickerPicker} onSave={onSaveImageAsync} />
          <StickerActionsBar
            isExpanded={showAdvancedActions}
            onToggleExpanded={toggleAdvancedActions}
            onRandom={onRandomSticker}
            onSmaller={onDecreaseStickerSize}
            onBigger={onIncreaseStickerSize}
            onClear={onClearSticker}
          />
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="选择图片" onPress={pickImageAsync} />
          <Button label="使用当前图片" onPress={enableEditor} />
          <Button label="随机贴纸体验" onPress={onRandomSticker} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={closeStickerPicker}>
        <EmojiList
          emojiOptions={stickerOptions}
          customStickerCount={customStickerCount}
          onSelect={onSelectSticker}
          onCloseModal={closeStickerPicker}
          onAddCustomEmoji={onAddCustomEmoji}
          onClearCustomEmoji={onClearCustomStickers}
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
});
