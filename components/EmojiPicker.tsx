/**
 * EmojiPicker 组件
 * 
 * 功能：表情选择器的模态框容器组件，提供一个从底部滑出的面板，
 * 用于显示表情选择界面。
 * 
 * 特点：
 * - 半透明背景，从底部滑入的动画效果
 * - 包含标题栏和关闭按钮
 * - 支持通过 children 渲染自定义内容
 * 
 * 使用场景：在需要用户选择表情的界面中调用，如聊天应用的表情选择器
 */

// 导入所需的组件和库
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

// 定义组件的属性类型接口
interface Props extends PropsWithChildren {
  isVisible: boolean;  // 控制模态框是否显示，由父组件控制
  onClose: () => void;  // 关闭模态框的回调函数，通常由父组件提供
}

// 导出默认的 ModalComponent 组件，接收 isVisible、onClose 和 children 作为属性
export default function ModalComponent({isVisible, onClose, children}: Props) {
  // 渲染组件 UI
  return (
    // Modal 组件创建模态框，从底部滑入的动画效果
    <Modal 
      animationType="slide"  // 从底部滑入的动画效果
      transparent={true}     // 背景透明，显示底层内容
      visible={isVisible}    // 根据 isVisible 控制显示/隐藏
      onRequestClose={onClose}  // Android 物理返回键的回调
    >
      {/* 模态框内容容器 */}
      <View style={styles.modalContent}>
        {/* 标题栏容器 */}
        <View style={styles.titleContainer}>
          {/* 标题文本 */}
          <Text style={styles.title}>Choose a sticker</Text>
          
          {/* 关闭按钮 */}
          <Pressable 
            onPress={onClose}
            hitSlop={10}  // 扩大点击区域，提升用户体验
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 }  // 按下时的视觉反馈
            ]}
          >
            <MaterialIcons name="close" color="#fff" size={22}/>
          </Pressable>
        </View>
        
        {/* 通过 children 渲染表情列表或其他内容 */}
        {children}
      </View>
    </Modal>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
  // 模态框内容容器的样式
  modalContent: {
    height: '25%',              // 占据屏幕高度的25%，为表情选择提供足够空间
    width: '100%',              // 占据屏幕全宽
    backgroundColor: '#25292e', // 深色背景，与主题保持一致
    borderTopRightRadius: 18,   // 顶部右侧圆角，创建圆滑的顶部边缘
    borderTopLeftRadius: 18,    // 顶部左侧圆角，与右侧对称
    position: 'absolute',        // 绝对定位，固定在屏幕底部
    bottom: 0,                  // 紧贴屏幕底部
    
    // 阴影效果（iOS）
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    // 阴影效果（Android）
    elevation: 5,
  },
  
  // 标题栏容器的样式
  titleContainer: {
    height: '16%',              // 占据模态框高度的16%，为标题和按钮提供空间
    backgroundColor: '#464C55',  // 稍浅的背景色，区分标题栏和内容区域
    borderTopRightRadius: 10,    // 顶部右侧圆角，与外层容器协调
    borderTopLeftRadius: 10,     // 顶部左侧圆角
    paddingHorizontal: 20,        // 水平内边距，为内容提供左右间距
    flexDirection: 'row',        // 水平排列子元素（标题和关闭按钮）
    alignItems: 'center',        // 垂直居中对齐所有子元素
    justifyContent: 'space-between', // 两端对齐，标题在左，按钮在右
  },
  
  // 标题文本的样式
  title: {
    color: '#f9f9f9ff',          // 白色文字，在深色背景上清晰可见
    fontSize: 16,                // 适中的字体大小
    fontWeight: '600',           // 半粗体，增强可读性
    letterSpacing: 0.5,          // 字母间距，提升视觉效果
  },
});