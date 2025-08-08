// 导入所需的组件和库
import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

// 定义组件的属性类型
type Props = {
    imgSource: ImageSourcePropType;  // 默认图片资源
    selectedImage?: string;  // 用户选择的图片 URI，可选
};

// 导出默认的 ImageViewer 组件，接收 imgSource 和 selectedImage 作为属性
export default function ImageViewer({ imgSource, selectedImage }: Props) {
    // 如果用户选择了图片，则使用用户选择的图片，否则使用默认图片
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    // 渲染 Image 组件，显示图片
    return <Image source={imageSource} style={styles.image} />;
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 图片样式
    image: {
        width: 320,  // 宽度
        height: 440,  // 高度
        borderRadius: 18,  // 圆角
    },
});