// 导入所需的组件
import { Stack } from 'expo-router';

// 导出默认的应用根布局组件
export default function RootLayout() {
  // 使用 Stack 组件创建导航堆栈
  return (
    <Stack>
      {/* 定义 (tabs) 路由的屏幕，隐藏头部 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}