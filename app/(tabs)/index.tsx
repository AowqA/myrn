/**
 * 主页面组件 - 图片编辑应用
 * 
 * 功能描述：
 * 这是一个图片编辑应用的主页面，提供以下核心功能：
 * 1. 从相册选择图片
 * 2. 添加表情贴纸到图片上
 * 3. 拖拽和缩放贴纸
 * 4. 保存编辑后的图片到相册
 * 
 * 技术实现：
 * - 使用expo-image-picker选择图片
 * - 使用expo-media-library保存图片到相册
 * - 使用react-native-gesture-handler处理手势
 * - 使用react-native-view-shot捕获组件为图片
 */

// 导入必要的库和组件
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

// 导入自定义组件
import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

// 默认占位图片
const PlaceholderImage = require('@/assets/images/background-image.png');

/**
 * 主页面组件
 * 图片编辑应用的核心页面，管理整个应用的状态和交互
 */
export default function Index() {
  // 状态管理
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined); // 用户选择的图片URI
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false); // 是否显示编辑选项
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 表情选择器是否可见
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined); // 选中的表情贴纸
  
  // 权限管理
  const [status, requestPermission] = MediaLibrary.usePermissions(); // 相册权限状态
  const imageRef = useRef<View>(null); // 用于捕获图片的引用

  // 请求相册权限（如果尚未请求）
  if (status === null) {
    requestPermission();
  }

  /**
   * 选择图片函数
   * 打开系统相册让用户选择图片
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // 只显示图片
      allowsEditing: true,    // 允许编辑（裁剪）
      quality: 1,             // 最高质量
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true); // 显示编辑选项
    } else {
      alert('You did not select any image.');
    }
  };

  /**
   * 重置函数
   * 清除所有编辑状态，返回初始状态
   */
  const onReset = () => {
    setShowAppOptions(false);
  };

  /**
   * 添加贴纸函数
   * 打开表情选择器模态框
   */
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  /**
   * 关闭模态框函数
   * 关闭表情选择器
   */
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   * 保存图片函数
   * 将当前编辑的图片保存到系统相册
   */
  const onSaveImageAsync = async () => {
    try {
      // 捕获当前显示的图片（包括贴纸）
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      // 保存到相册
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 渲染主页面
   * 根据当前状态显示不同的UI
   */
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* 图片显示区域 */}
      <View style={styles.imageContainer}>
        {/* 可捕获的图片区域 */}
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {/* 如果有选中的表情，显示表情贴纸 */}
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>

      {/* 根据状态显示不同的操作界面 */}
      {showAppOptions ? (
        // 编辑模式：显示重置、添加贴纸、保存按钮
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        // 初始模式：显示选择图片和使用当前图片按钮
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      {/* 表情选择器模态框 */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

// 样式定义
const styles = StyleSheet.create({
  // 主容器样式：占满全屏，深色背景，居中显示
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  
  // 图片容器：占据可用空间
  imageContainer: {
    flex: 1,
  },
  
  // 底部操作区域：占据1/3空间，居中显示
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  
  // 编辑选项容器：绝对定位在底部
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  
  // 编辑选项行：水平排列按钮
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});