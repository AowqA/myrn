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
  const [showAdvancedActions, setShowAdvancedActions] = useState<boolean>(false);

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

    alert('未选择图片。');
  };

  const onAddCustomEmoji = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('需要权限', '请允许访问相册后再上传自定义 Emoji。');
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
      Alert.alert('上传失败', '暂时无法上传 Emoji，请稍后再试。');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
    setIsModalVisible(false);
    setStickerSize(DEFAULT_STICKER_SIZE);
    setShowAdvancedActions(false);
  };

  const onClearCustomStickers = () => {
    setCustomStickers([]);
    setPickedEmoji(undefined);
    Alert.alert('已清空', '你上传的自定义 Emoji 已清空。');
  };

  const onRandomSticker = () => {
    if (stickerOptions.length === 0) {
      Alert.alert('没有可用贴纸', '请先添加或上传一个贴纸。');
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
    customStickerCount: customStickers.length,
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
    openStickerPicker: () => setIsModalVisible(true),
    closeStickerPicker: () => setIsModalVisible(false),
    enableEditor: () => setShowAppOptions(true),
    toggleAdvancedActions: () => setShowAdvancedActions(previous => !previous),
  };
}
