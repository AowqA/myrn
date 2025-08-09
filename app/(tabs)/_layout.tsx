// 导入所需的组件和库
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

// 导出默认的标签页布局组件
export default function RootLayout() {
  return (
    // 使用 Tabs 组件创建标签页导航
    <Tabs
      // 设置标签页的通用选项
      screenOptions={{
        tabBarActiveTintColor: '#fa860bff',  // 激活标签页的颜色
        headerStyle: {
          backgroundColor: '#25292e',  // 头部背景色
        },
        headerTintColor: '#fff',  // 头部文本颜色
        headerShadowVisible: false,  // 是否显示头部阴影
        tabBarStyle: {
          backgroundColor: '#25292e',  // 标签栏背景色
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",  // 标签页标题
          // 设置标签页图标
          tabBarIcon : ({color, focused}) => (
            <Ionicons 
              name={focused ? 'home-sharp' : 'home-outline'} 
              color={color} 
              size={24} 
            />
          ),
        }} 
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',  // 标签页标题
          // 设置标签页图标
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'information-circle' : 'information-circle-outline'} 
              color={color} 
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}