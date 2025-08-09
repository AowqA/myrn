// 导入所需的组件和库
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text } from 'react-native';

// 定义组件的属性类型
type Props = {
    label: string;  // 按钮显示的文本
    icon: keyof typeof MaterialIcons.glyphMap  // 按钮显示的图标
    onPress: () => void;  // 按钮点击事件处理函数
};

// 导出默认的 IconButton 组件，接收 label、icon 和 onPress 作为属性
export default function IconButton({ label, icon, onPress }: Props) {
    // 渲染组件 UI
    return (
        // 可点击的按钮，设置按钮的样式和点击事件
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
  );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 图标按钮样式
    iconButton: {
        justifyContent: 'center',  // 子元素垂直居中
        alignItems: 'center',  // 子元素水平居中
    },
    // 图标按钮文本样式
    iconButtonLabel: {
        color: '#fff',  // 文本颜色为白色
        marginTop: 12,  // 顶部外边距
    },
});