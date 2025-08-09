// 导入所需的组件和库
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// 定义组件的属性类型
type Props = {
    label: string;  // 按钮显示的文本
    theme?: 'primary';  // 按钮的主题样式，可选
    onPress?: () => void;  // 按钮点击事件处理函数，可选
};

// 导出默认的 Button 组件，接收 label、theme 和 onPress 作为属性
export default function Button({ label, theme, onPress }: Props) {
    // 如果主题是 'primary'，则渲染带有特殊样式的按钮
    if (theme === 'primary') {
        return (
            <View 
                // 设置按钮容器的样式，包括边框颜色、宽度和圆角
                style={[
                    styles.buttonContainer, 
                    {
                        borderColor: '#ffd33d',
                        borderWidth: 4, 
                        borderRadius: 10
                    }
                ]}
            >
                <Pressable
                    // 设置按钮的样式，背景色为白色
                    style={[styles.button, { backgroundColor: '#fff' }]}
                    // 设置按钮点击事件处理函数
                    onPress={onPress}
                >
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
                // 默认按钮点击事件处理函数，显示提示信息
                onPress={onPress}
            >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 按钮容器样式
    buttonContainer: {
        width: 320,  // 宽度
        height: 68,  // 高度
        marginHorizontal: 20,  // 水平方向的外边距
        alignItems: 'center',  // 子元素水平居中
        justifyContent: 'center',  // 子元素垂直居中
        padding: 3,  // 内边距
    },
    // 按钮样式
    button: {
        borderRadius: 10,  // 圆角
        width: '100%',  // 宽度占父元素100%
        height: '100%',  // 高度占父元素100%
        alignItems: 'center',  // 子元素水平居中
        justifyContent: 'center',  // 子元素垂直居中
        flexDirection: 'row',  // 子元素水平排列
    },
    // 按钮图标样式
    buttonIcon: {
        paddingRight: 8,  // 右侧内边距
    },
    // 按钮文本样式
    buttonLabel: {
        color: '#fff',  // 文本颜色为白色
        fontSize: 16,  // 字体大小
    },
});