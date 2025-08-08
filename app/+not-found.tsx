// 导入所需的组件
import { Link } from "expo-router"; // 用于创建导航链接
import { StyleSheet, View } from "react-native"; // React Native 组件

// 导出默认的未找到页面组件
export default function NotFoundScreen() {
    // 渲染组件 UI
    return (
        <View style={styles.container}>
            {/* 创建返回首页的链接 */}
            <Link href="/" style={styles.button}>
                Go back to Home screen!
            </Link>
        </View>
    );
}

// 定义组件的样式
const styles = StyleSheet.create({
    // 容器样式
    container: {
        flex: 1,  // 弹性布局，占据剩余空间
        backgroundColor: '#25292e',  // 背景色
        justifyContent: 'center',  // 子元素垂直居中
        alignItems: 'center',  // 子元素水平居中
      },
    
    // 按钮样式
    button: {
        fontSize: 20,  // 字体大小
        textDecorationLine: 'underline',  // 文本下划线
        color: '#fff',  // 文本颜色为白色
      },
})