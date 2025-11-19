import { ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

/**
 * EmojiSticker组件
 * 
 * 这是一个可交互的表情贴纸组件，支持以下功能：
 * 1. 双击放大/缩小
 * 2. 拖拽移动位置
 * 3. 平滑的动画过渡效果
 * 
 * 使用了react-native-reanimated和react-native-gesture-handler库来实现高性能的动画和手势处理
 */

/**
 * 组件属性定义
 */
type Props = {
  /** 图片的初始尺寸（宽高相同） */
  imageSize: number;
  a = 1;
  /** 表情图片的资源路径 */
  stickerSource: ImageSourcePropType;
};

/**
 * EmojiSticker组件主体
 * @param imageSize - 图片的初始尺寸
 * @param stickerSource - 表情图片的资源路径
 * @returns 可交互的表情贴纸组件
 */
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // 使用共享值来存储动画状态
  // 图片缩放比例，初始值为传入的imageSize
  const scaleImage = useSharedValue(imageSize);
  // X轴方向的位移量
  const translateX = useSharedValue(0);
  // Y轴方向的位移量
  const translateY = useSharedValue(0);

  /**
   * 双击手势处理器
   * 当用户双击表情时，在原始尺寸和2倍尺寸之间切换
   */
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2) // 设置需要双击才能触发
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        // 如果当前不是放大状态，则放大到2倍
        scaleImage.value = scaleImage.value * 2;
      } else {
        // 如果已经是放大状态，则缩小回原始尺寸
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  /**
   * 图片的动画样式
   * 使用withSpring实现平滑的弹簧动画效果
   */
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value), // 宽度随缩放值变化
      height: withSpring(scaleImage.value), // 高度随缩放值变化
    };
  });

  /**
   * 拖拽手势处理器
   * 允许用户通过拖拽来移动表情的位置
   */
  const drag = Gesture.Pan().onChange(event => {
    // 更新X轴位移量，累加变化值
    translateX.value += event.changeX;
    // 更新Y轴位移量，累加变化值
    translateY.value += event.changeY;
  });

  /**
   * 容器的动画样式
   * 控制表情在屏幕上的位置
   */
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }, // 水平位移
        { translateY: translateY.value }, // 垂直位移
      ],
    };
  });

  /**
   * 渲染组件
   * 使用嵌套的GestureDetector来分别处理拖拽和双击手势
   */
  return (
    <GestureDetector gesture={drag}>
      {/* 外层容器处理拖拽，初始位置向上偏移350像素 */}
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          {/* 内层图片处理双击，应用缩放动画 */}
          <Animated.Image
            source={stickerSource}
            resizeMode="contain" // 保持图片比例，完整显示
            style={[imageStyle, { width: imageSize, height: imageSize }]} // 合并动画样式和基础样式
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}