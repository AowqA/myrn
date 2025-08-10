/**
 * Button组件
 * 
 * 这是一个可复用的按钮组件，支持两种主题样式：
 * 1. 主要主题（primary）：带有图标和特殊边框的按钮
 * 2. 默认主题：简洁的文字按钮
 * 
 * 使用Expo的FontAwesome图标库和React Native的基础组件
 */

// 导入所需的组件和库
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * 组件属性定义
 */
type Props = {
    /** 按钮显示的文本内容 */
    label: string;
    /** 按钮的主题样式，可选值为'primary' */
    theme?: 'primary';
    /** 按钮点击事件处理函数，可选 */
    onPress?: () => void;
};

/**
 * Button组件主体
 * 
 * @param label - 按钮显示的文本内容
 * @param theme - 按钮的主题样式，可选
 * @param onPress - 按钮点击事件处理函数，可选
 * @returns 根据主题渲染的按钮组件
 */
export default function Button({ label, theme, onPress }: Props) {
    /**
     * 根据主题渲染不同的按钮样式
     * 
     * 主要主题按钮特点：
     * - 黄色边框（#ffd33d）
     * - 白色背景
     * - 包含图片图标
     * - 深色文字
     * 
     * 默认主题按钮特点：
     * - 无边框
     * - 默认背景色
     * - 仅文字显示
     * - 白色文字
     */
    
    // 如果主题是 'primary'，则渲染带有特殊样式的按钮
    if (theme === 'primary') {
        return (
            <View 
                // 设置按钮容器的样式，包括边框颜色、宽度和圆角
                style={[
                    styles.buttonContainer, 
                    {
                        borderColor: '#ffd33d', // 黄色边框
                        borderWidth: 4, 
                        borderRadius: 10 // 圆角边框
                    }
                ]}
            >
                <Pressable
                    // 设置按钮的样式，背景色为白色
                    style={[styles.button, { backgroundColor: '#fff' }]}
                    // 设置按钮点击事件处理函数
                    onPress={onPress}
                >
                    {/* 图片图标，用于主要主题按钮 */}
                    <FontAwesome 
                        name="picture-o" 
                        size={18} 
                        color="#25292e" 
                        // 设置图标样式
                        style={styles.buttonIcon} 
                    />
                    <Text 
                        // 设置文本样式，颜色为深灰色
                        style={[styles.buttonLabel, { color: '#25292e' }]}
                    >
                        {label}
                    </Text>
                </Pressable>
            </View>
        );
    }  
    
    // 如果没有指定主题，则渲染默认样式的按钮
    return (
        <View style={styles.buttonContainer}>
            <Pressable 
                style={styles.button} 
                // 默认按钮点击事件处理函数
                onPress={onPress}
            >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

/**
 * 组件样式定义
 * 
 * 使用StyleSheet.create创建样式对象，提高性能和可维护性
 */
const styles = StyleSheet.create({
    /**
     * 按钮容器样式
     * 设置按钮的整体尺寸和位置
     */
    buttonContainer: {
        width: 320,  // 固定宽度320像素
        height: 68,  // 固定高度68像素
        marginHorizontal: 20,  // 左右外边距20像素
        alignItems: 'center',  // 子元素水平居中
        justifyContent: 'center',  // 子元素垂直居中
        padding: 3,  // 内边距3像素
    },
    
    /**
     * 按钮主体样式
     * 定义按钮本身的外观和子元素排列
     */
    button: {
        borderRadius: 10,  // 圆角10像素
        width: '100%',  // 宽度占父容器100%
        height: '100%',  // 高度占父容器100%
        alignItems: 'center',  // 子元素水平居中
        justifyContent: 'center',  // 子元素垂直居中
        flexDirection: 'row',  // 子元素水平排列（图标和文字）
    },
    
    /**
     * 按钮图标样式
     * 设置图标的间距和位置
     */
    buttonIcon: {
        paddingRight: 8,  // 图标右侧内边距8像素
    },
    
    /**
     * 按钮文本样式
     * 定义文字的字体和颜色
     */
    buttonLabel: {
        color: '#fff',  // 文字颜色为白色（默认主题）
        fontSize: 16,  // 字体大小16像素
    },
});