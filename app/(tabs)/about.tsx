// 导入所需的 React Native 组件
import { StyleSheet, Text, View } from "react-native";

// 导出默认的关于页面组件
export default function AboutScreen() {
    // 渲染组件 UI
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About Screen</Text>
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
  // 文本样式
  text: {
    color: '#fff',  // 文本颜色为白色
    fontSize: 24,  // 字体大小

  },
});