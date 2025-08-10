// 导入所需的组件和库
import { ImageSourcePropType, View } from 'react-native';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// 定义组件的属性类型
type Props = {
  imageSize: number;  // 表情图片的尺寸
  stickerSource: ImageSourcePropType;  // 表情图片资源
};

// 导出默认的 EmojiSticker 组件，接收 imageSize 和 stickerSource 作为属性
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if(scaleImage.value !== imageSize*2){
        scaleImage.value = scaleImage.value*2;
      } else {
        scaleImage.value = Math.round(scaleImage.value/2)
      }
    });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  // 渲染组件 UI
  return (
    // 容器视图，用于设置表情图片的位置
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSource}  
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </GestureDetector>
    </View>
  );
}