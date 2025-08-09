// 导入所需的组件和库
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from 'react-native';

// 定义组件的属性类型
type Props = {
  onSelect: (image: ImageSourcePropType) => void;  // 选择表情的回调函数
  onCloseModal: () => void;  // 关闭模态框的回调函数
};

// 导出默认的 EmojiList 组件，接收 onSelect 和 onCloseModal 作为属性
export default function EmojiList({ onSelect, onCloseModal }: Props) {
  // 使用 useState 钩子管理表情图片的状态
  const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),  // 表情1
    require("../assets/images/emoji2.png"),  // 表情2
    require("../assets/images/emoji3.png"),  // 表情3
    require("../assets/images/emoji4.png"),  // 表情4
    require("../assets/images/emoji5.png"),  // 表情5
    require("../assets/images/emoji6.png"),  // 表情6
  ]);

  // 渲染组件 UI
  return (
    // 水平滚动的列表，用于显示表情图片
    <FlatList
      horizontal  // 水平排列
      showsHorizontalScrollIndicator={Platform.OS === 'web'}  // 在 web 平台上显示水平滚动条
      data={emoji}  // 数据源
      contentContainerStyle={styles.listContainer}  // 内容容器样式
      renderItem={({ item, index }) => (
        // 可点击的按钮，用于选择表情
        <Pressable
          onPress={() => {
            onSelect(item);  // 调用选择表情的回调函数
            onCloseModal();  // 调用关闭模态框的回调函数
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 列表容器样式
    listContainer: {
        borderTopRightRadius: 10,  // 顶部右侧圆角
        borderTopLeftRadius: 10,  // 顶部左侧圆角
        paddingHorizontal: 20,  // 水平方向的内边距
        flexDirection: 'row',  // 子元素水平排列
        alignItems: 'center',  // 子元素垂直居中
        justifyContent: 'space-between',  // 子元素两端对齐
    },
    // 表情图片样式
    image: {
        width: 100,  // 宽度
        height: 100,  // 高度
        resizeMode: 'contain',  // 图片缩放模式
        marginRight: 20,  // 右侧外边距
    },
});