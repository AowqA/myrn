/**
 * ImageViewer 组件 - 图片查看器
 * 
 * 功能描述：
 * 这是一个用于显示图片的React Native组件，支持显示默认图片和用户选择的图片。
 * 当用户选择了一张图片时，会优先显示用户选择的图片；否则显示默认图片。
 * 
 * 使用场景：
 * 适用于需要展示图片的场景，如头像显示、图片预览、相册查看等。
 */

// 导入所需的组件和库
import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

// 定义组件的属性类型
interface Props {
    imgSource: ImageSourcePropType;  // 默认图片资源（当没有选择图片时显示）
    selectedImage?: string;  // 用户选择的图片 URI（可选属性）
}

/**
 * ImageViewer 组件
 * 
 * @param {ImageSourcePropType} imgSource - 默认图片资源
 * @param {string} [selectedImage] - 用户选择的图片URI（可选）
 * @returns {JSX.Element} 返回一个显示图片的组件
 */
export default function ImageViewer({ imgSource, selectedImage }: Props) {
    // 根据是否提供了selectedImage来决定使用哪张图片
    // 如果用户选择了图片，则使用用户选择的图片URI；否则使用默认图片资源
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    
    // 渲染Image组件，显示最终的图片
    // 使用expo-image的Image组件，提供更好的性能和功能
    return <Image source={imageSource} style={styles.image} />;
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 图片样式定义
    image: {
        width: 320,      // 图片宽度：320像素
        height: 440,     // 图片高度：440像素
        borderRadius: 18, // 圆角半径：18像素，使图片边缘呈现圆角效果
    },
});