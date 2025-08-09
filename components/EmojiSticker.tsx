// 导入所需的组件和库
import { Image } from 'expo-image';
import { ImageSourcePropType, View } from 'react-native';

// 定义组件的属性类型
type Props = {
  imageSize: number;  // 表情图片的尺寸
  stickerSource: ImageSourcePropType;  // 表情图片资源
};

// 导出默认的 EmojiSticker 组件，接收 imageSize 和 stickerSource 作为属性
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // 渲染组件 UI
  return (
    // 容器视图，用于设置表情图片的位置
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}