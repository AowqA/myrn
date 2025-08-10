/**
 * IconButton 组件
 * 
 * 功能：可点击的图标按钮组件，显示图标和文本标签的组合
 * 
 * 特点：
 * - 使用 MaterialIcons 图标库
 * - 支持自定义图标、文本和点击事件
 * - 简洁的垂直布局，图标在上，文本在下
 * 
 * 使用场景：用于导航栏、工具栏或需要图标+文本组合按钮的界面
 */

// 导入所需的组件和库
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text } from 'react-native';

// 定义组件的属性类型接口
interface Props {
  label: string;                           // 按钮下方显示的文本标签
  icon: keyof typeof MaterialIcons.glyphMap; // MaterialIcons 图标名称，必须是有效的图标键名
  onPress: () => void;                      // 按钮点击事件处理函数，无参数无返回值
}

// 导出默认的 IconButton 组件，接收 label、icon 和 onPress 作为属性
export default function IconButton({ label, icon, onPress }: Props) {
    // 渲染组件 UI
  return (
    // 可点击的图标按钮，使用Pressable提供触摸反馈
    <Pressable 
      style={({ pressed }) => [
        styles.iconButton, 
        { opacity: pressed ? 0.7 : 1 }  // 按下时的透明度变化效果
      ]} 
      onPress={onPress}
      hitSlop={10}  // 扩大点击区域，提升用户体验
    >
      {/* MaterialIcons 图标，固定大小和颜色 */}
      <MaterialIcons name={icon} size={24} color="#fff" />
      
      {/* 图标下方的文本标签 */}
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
  // 图标按钮容器的样式
  iconButton: {
    justifyContent: 'center',  // 垂直居中对齐子元素（图标和文本）
    alignItems: 'center',      // 水平居中对齐子元素
    paddingVertical: 8,        // 垂直内边距，增加点击区域
    paddingHorizontal: 12,     // 水平内边距，确保足够的点击空间
    minWidth: 60,              // 最小宽度，确保文本不会过度压缩
  },
  
  // 图标按钮文本标签的样式
  iconButtonLabel: {
    color: '#fff',             // 白色文本，在深色背景上清晰可见
    marginTop: 8,             // 图标与文本之间的间距，比图标稍小
    fontSize: 12,             // 较小的字体大小，适合图标按钮
    fontWeight: '500',        // 中等字重，平衡可读性和视觉层次
    textAlign: 'center',      // 文本居中对齐
    letterSpacing: 0.3,       // 字母间距，提升可读性
  },
});