// 导入所需的库和组件
import * as ImagePicker from 'expo-image-picker'; // 图片选择器库
import { useState } from 'react'; // React 状态钩子
import { ImageSourcePropType, StyleSheet, View } from 'react-native'; // React Native 组件

// 导入自定义组件
import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

// 导入占位图片
const PlaceholderImage = require('@/assets/images/background-image.png');

// 导出默认的首页组件
export default function Index() {
  // 使用 useState 钩子管理选中图片的状态
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // 使用 useState 钩子管理是否显示应用选项的状态
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // 使用 useState 钩子管理模态框是否可见的状态
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // 使用 useState 钩子管理选中的表情的状态
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  // 异步函数，用于从图库选择图片
  const pickImageAsync = async () => {
    // 启动图片库选择器
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],  // 只允许选择图片
      allowsEditing: true,  // 允许编辑图片
      quality: 1,  // 图片质量
    });
    
    // 如果用户没有取消选择
    if (!result.canceled) {
      // 设置选中的图片 URI
      setSelectedImage(result.assets[0].uri);
      // 显示应用选项
      setShowAppOptions(true);
    } else {
      // 如果用户取消选择，显示提示信息
      alert('You did not select any image.');
    }
  };

  // 重置按钮点击事件处理函数
  const onReset = () => {
    // 隐藏应用选项
    setShowAppOptions(false);
  };

  // 添加表情按钮点击事件处理函数
  const onAddSticker = () => {
    // 显示模态框
    setIsModalVisible(true);
  };

  // 模态框关闭事件处理函数
  const onModalClose = () => {
    // 隐藏模态框
    setIsModalVisible(false);
  };

  // 保存图片按钮点击事件处理函数
  const onSaveImageAsync = async () => {
    // TODO: 实现保存图片功能
  };

  // 渲染组件 UI
  return (
    // 容器视图，设置背景色和子元素水平居中
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        // 选项容器视图，设置绝对定位和距离底部的距离
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        // 底部容器视图，设置子元素水平居中
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
  // 容器样式
  container: {
    flex: 1,  // 弹性布局，占据剩余空间
    backgroundColor: '#25292e',  // 背景色
    alignItems: 'center',  // 子元素水平居中
  },
  // 图片容器样式
  imageContainer: {
    flex: 1,  // 弹性布局，占据剩余空间
  },
  // 底部容器样式
  footerContainer: {
    flex: 1 / 3,  // 弹性布局，占据 1/3 空间
    alignItems: 'center',  // 子元素水平居中
  },
  // 选项容器样式
  optionsContainer: {
    position: 'absolute',  // 绝对定位
    bottom: 80,  // 距离底部的距离
  },
  // 选项行样式
  optionsRow: {
    alignItems: 'center',  // 子元素垂直居中
    flexDirection: 'row',  // 子元素水平排列
  },
});