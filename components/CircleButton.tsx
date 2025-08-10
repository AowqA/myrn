/**
 * CircleButton组件
 * 
 * 这是一个圆形按钮组件，使用MaterialIcons图标库实现
 * 主要用于添加操作的场景，具有圆形外观和加号图标
 * 
 * 特点：
 * - 圆形按钮设计
 * - 黄色边框装饰
 * - 白色背景
 * - 黑色加号图标
 * - 可点击交互
 */

// 导入所需的组件和库
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, View } from "react-native";

/**
 * 组件属性定义
 */
type Props = {
    /** 按钮点击事件处理函数，必填 */
    onPress: () => void;
};

/**
 * CircleButton组件主体
 * 
 * @param onPress - 按钮点击事件处理函数
 * @returns 圆形按钮组件，包含加号图标
 */
export default function CircleButton({ onPress }: Props) {
    /**
     * 渲染圆形按钮
     * 
     * 结构说明：
     * - 外层View：提供黄色边框和圆形外观
     * - 内层Pressable：实现点击交互
     * - MaterialIcons：显示加号图标
     */
    return (
        // 外层容器，提供黄色边框和圆形外观
        <View style={styles.circleButtonContainer}>
            {/* 可点击的圆形按钮 */}
            <Pressable style={styles.circleButton} onPress={onPress}>
                {/* 加号图标，黑色，38像素大小 */}
                <MaterialIcons name="add" size={38} color="#25292e" />
            </Pressable>
        </View>
    );
}

/**
 * 组件样式定义
 * 
 * 使用StyleSheet.create创建样式对象，确保圆形按钮的精确外观
 */
const styles = StyleSheet.create({
    /**
     * 圆形按钮容器样式
     * 提供黄色边框和圆形外观
     */
    circleButtonContainer: {
        width: 84,  // 容器宽度84像素
        height: 84,  // 容器高度84像素
        marginHorizontal: 60,  // 左右外边距60像素
        borderWidth: 4,  // 边框宽度4像素（黄色装饰边）
        borderColor: '#ffd33d',  // 边框颜色为黄色
        borderRadius: 42,  // 圆角半径42像素（形成完美圆形）
        padding: 3,  // 内边距3像素（边框与按钮的间距）
    },
    
    /**
     * 圆形按钮主体样式
     * 定义白色圆形按钮的外观
     */
    circleButton: {
        flex: 1,  // 弹性布局，占满整个容器空间
        justifyContent: 'center',  // 图标垂直居中
        alignItems: 'center',  // 图标水平居中
        borderRadius: 42,  // 圆角半径42像素（与容器保持一致）
        backgroundColor: '#fff',  // 背景色为纯白色
    },
});