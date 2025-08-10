/**
 * EmojiList 组件
 * 
 * 功能：显示一个水平滚动的表情图片列表，用户可以从中选择一个表情。
 * 当用户点击某个表情时，会触发选择回调并关闭模态框。
 * 
 * 使用场景：通常用于表情选择器，例如在聊天应用中发送表情贴纸。
 */

// 导入所需的组件和库
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from 'react-native';

// 定义组件的属性类型接口
interface Props {
  onSelect: (image: ImageSourcePropType) => void;  // 选择表情的回调函数，参数为选中的表情图片
  onCloseModal: () => void;  // 关闭模态框的回调函数，用于选择表情后关闭选择器
}

// 导出默认的 EmojiList 组件，接收 onSelect 和 onCloseModal 作为属性
export default function EmojiList({ onSelect, onCloseModal }: Props) {
  // 使用 useState 钩子管理表情图片的状态
  // 这里使用静态数据，实际应用中可能需要从API获取表情列表
  const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),  
    require("../assets/images/emoji2.png"),  
    require("../assets/images/emoji3.png"),  
    require("../assets/images/emoji4.png"),  
    require("../assets/images/emoji5.png"),  
    require("../assets/images/emoji6.png"), 
  ]);

  // 渲染组件 UI
  return (
    // 使用 FlatList 创建水平滚动的表情列表
    // FlatList 是 React Native 的高效列表组件，支持大数据量渲染
    <FlatList
      horizontal  // 设置为水平滚动方向
      showsHorizontalScrollIndicator={Platform.OS === 'web'}  // 仅在 Web 平台显示滚动条，移动端不显示
      data={emoji}  // 绑定表情数据数组作为数据源
      keyExtractor={(_, index) => index.toString()}  // 为每个项目提供唯一的 key
      contentContainerStyle={styles.listContainer}  // 设置列表容器的样式
      renderItem={({ item, index }) => (
        // 每个表情项使用 Pressable 包裹，提供点击交互
        <Pressable
          onPress={() => {
            onSelect(item);  // 调用父组件传递的选择回调，传递选中的表情
            onCloseModal();  // 选择后立即关闭模态框
          }}
          style={({ pressed }) => [
            // 按下时的视觉反馈
            { opacity: pressed ? 0.7 : 1 }
          ]}
        >
          <Image 
            source={item} 
            key={index} 
            style={styles.image} 
            contentFit="contain"  // 确保图片完整显示，不被裁剪
          />
        </Pressable>
      )}
    />
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
  // 列表容器的样式定义
  listContainer: {
    borderTopRightRadius: 10,  // 容器顶部右侧圆角，创建圆滑的顶部边缘
    borderTopLeftRadius: 10,   // 容器顶部左侧圆角，与右侧对称
    paddingHorizontal: 20,     // 水平内边距，为内容提供左右间距
    flexDirection: 'row',      // 子元素水平排列，实现水平滚动效果
    alignItems: 'center',      // 垂直居中对齐所有子元素
    justifyContent: 'space-between',  // 子元素之间均匀分布空间
    paddingVertical: 10,       // 垂直内边距，增加上下空间
    backgroundColor: '#fff',   // 白色背景，确保表情清晰可见
    elevation: 5,              // Android 阴影效果
    shadowColor: '#000',         // iOS 阴影颜色
    shadowOffset: { width: 0, height: -2 },  // iOS 阴影偏移
    shadowOpacity: 0.1,        // iOS 阴影透明度
    shadowRadius: 3,           // iOS 阴影模糊半径
  },
  
  // 表情图片的样式定义
  image: {
    width: 80,               // 表情图片宽度，适合触摸操作的大小
    height: 80,              // 表情图片高度，保持正方形比例
    resizeMode: 'contain',   // 保持图片原始比例，完整显示
    marginRight: 15,         // 右侧间距，分隔相邻表情
    borderRadius: 10,        // 图片圆角，使边缘更柔和
  },
});