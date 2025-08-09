// 导入所需的组件和库
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, View } from "react-native";

// 定义组件的属性类型
type Props = {
    onPress: () => void;  // 按钮点击事件处理函数
};

// 导出默认的 CircleButton 组件，接收 onPress 作为属性
export default function CircleButton({ onPress }: Props) {
    // 渲染组件 UI
    return (
        // 容器视图，用于设置按钮的外边框
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={38} color="#25292e" />
            </Pressable>
        </View>
    );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 圆形按钮容器样式
    circleButtonContainer: {
        width: 84,  // 宽度
        height: 84,  // 高度
        marginHorizontal: 60,  // 水平方向的外边距
        borderWidth: 4,  // 边框宽度
        borderColor: '#ffd33d',  // 边框颜色
        borderRadius: 42,  // 圆角半径
        padding: 3,  // 内边距
    },
    // 圆形按钮样式
    circleButton: {
        flex: 1,  // 弹性布局，占据剩余空间
        justifyContent: 'center',  // 子元素垂直居中
        alignItems: 'center',  // 子元素水平居中
        borderRadius: 42,  // 圆角半径
        backgroundColor: '#fff',  // 背景色为白色
    },
});