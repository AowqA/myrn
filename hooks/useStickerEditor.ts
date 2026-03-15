import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';

import {
  BUILT_IN_STICKERS,
  DEFAULT_STICKER_SIZE,
  MAX_STICKER_SIZE,
  MIN_STICKER_SIZE,
  StickerOption,
} from '@/features/stickers/stickerSources';

export function useStickerEditor() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [stickerSize, setStickerSize] = useState<number>(DEFAULT_STICKER_SIZE);
  const [customStickers, setCustomStickers] = useState<StickerOption[]>([]);


  const stickerOptions = useMemo<StickerOption[]>(
    () => [...customStickers, ...BUILT_IN_STICKERS],
    [customStickers],
  );

  const onSelectSticker = (sticker: StickerOption) => {
    setPickedEmoji(sticker.source);
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      return;
    }

    alert('You did not select any image.');
  };

  const onAddCustomEmoji = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow photo library access to upload a custom emoji.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uploadedSticker: StickerOption = {
          id: `custom-${Date.now()}`,
          source: { uri: result.assets[0].uri },
        };
        setCustomStickers(previous => [uploadedSticker, ...previous]);
        setPickedEmoji(uploadedSticker.source);
        setShowAppOptions(true);
        setIsModalVisible(false);
      }
    } catch {
      Alert.alert('Upload failed', 'Unable to upload emoji right now. Please try again.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
    setIsModalVisible(false);
    setStickerSize(DEFAULT_STICKER_SIZE);
  };

  const onRandomSticker = () => {
    if (stickerOptions.length === 0) {
      Alert.alert('No stickers available', 'Please add or upload a sticker first.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * stickerOptions.length);
    setPickedEmoji(stickerOptions[randomIndex].source);
    setShowAppOptions(true);
  };

  const onIncreaseStickerSize = () => {
    setStickerSize(previous => Math.min(previous + 8, MAX_STICKER_SIZE));
  };

  const onDecreaseStickerSize = () => {
    setStickerSize(previous => Math.max(previous - 8, MIN_STICKER_SIZE));
  };

  const onClearSticker = () => {
    setPickedEmoji(undefined);
  };

  return {
    selectedImage,
    showAppOptions,
    isModalVisible,
    pickedEmoji,
    stickerSize,
    stickerOptions,
    pickImageAsync,
    onAddCustomEmoji,
    onReset,
    onRandomSticker,
    onIncreaseStickerSize,
    onDecreaseStickerSize,
    onClearSticker,
    onSelectSticker,
    openStickerPicker: () => setIsModalVisible(true),
    closeStickerPicker: () => setIsModalVisible(false),
    enableEditor: () => setShowAppOptions(true),
  };
}
