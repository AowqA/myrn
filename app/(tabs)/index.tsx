// 导入所需的库和组件
import * as ImagePicker from "expo-image-picker"; // 图片选择器库
import { useState } from "react"; // React 状态钩子
import { StyleSheet, View } from "react-native"; // React Native 组件

// 导入自定义组件
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

// 导入占位图片
const PlaceholderImage = require('@/assets/images/background-image.png');

// 导出默认的首页组件
export default function Index() {
  // 使用 useState 钩子管理选中图片的状态
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  
  // 异步函数，用于从图库选择图片
  const pickImageAsync = async() => {
    // 启动图片库选择器
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],  // 只允许选择图片
      allowsEditing: true,  // 允许编辑图片
      quality: 1,  // 图片质量
    });
    
    // 如果用户没有取消选择
    if(!result.canceled) {
      // 设置选中的图片 URI
      setSelectedImage(result.assets[0].uri);
    }else {
      // 如果用户取消选择，显示提示信息
      alert("You did not pick any image.")
    }
  }
  
  // 渲染组件 UI
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* 使用 ImageViewer 组件显示图片 */}
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        {/* 选择图片按钮 */}
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        {/* 使用图片按钮 */}
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
  // 容器样式
  container: {
    flex: 1,  // 弹性布局，占据剩余空间
    alignItems: "center",  // 子元素水平居中
    backgroundColor: "#25292e",  // 背景色
  },
  // 图片容器样式
  imageContainer: {
    flex: 1,  // 弹性布局，占据剩余空间
  },
  // 图片样式（注意：这个样式在当前代码中未被使用，ImageViewer 组件有自己的样式）
  image: {
    width: 320,  // 宽度
    height: 440,  // 高度
    borderRadius: 18,  // 圆角
  },
  // 底部容器样式
  footerContainer: {
    flex: 1 / 3,  // 弹性布局，占据 1/3 空间
    alignItems: 'center',  // 子元素水平居中
  },
});