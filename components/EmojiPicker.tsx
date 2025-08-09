// 导入所需的组件和库
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

// 定义组件的属性类型
type Props = PropsWithChildren<{
  isVisible: boolean;  // 控制模态框是否可见
  onClose: () => void;  // 关闭模态框的回调函数
}>;

// 导出默认的 ModalComponent 组件，接收 isVisible、onClose 和 children 作为属性
export default function ModalComponent({isVisible, onClose, children}: Props) {
  // 渲染组件 UI
  return (
    // 模态框组件，用于显示表情选择器
    <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose a sticker</Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name="close" color="#fff" size={22}/>
                </Pressable>
            </View>
            {children}
        </View>
    </Modal>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 模态框内容样式
    modalContent: {
        height: '25%',  // 高度
        width: '100%',  // 宽度
        backgroundColor: '#25292e',  // 背景色
        borderTopRightRadius: 18,  // 顶部右侧圆角
        borderTopLeftRadius: 18,  // 顶部左侧圆角
        position: 'absolute',  // 绝对定位
        bottom: 0,  // 距离底部的距离
    },
    // 标题容器样式
    titleContainer: {
        height: '16%',  // 高度
        backgroundColor: '#464C55',  // 背景色
        borderTopRightRadius: 10,  // 顶部右侧圆角
        borderTopLeftRadius: 10,  // 顶部左侧圆角
        paddingHorizontal: 20,  // 水平方向的内边距
        flexDirection: 'row',  // 子元素水平排列
        alignItems: 'center',  // 子元素垂直居中
        justifyContent: 'space-between',  // 子元素两端对齐
    },
    // 标题文本样式
    title: {
        color: '#f9f9f9ff',  // 文本颜色
        fontSize: 16,  // 字体大小
    },
});