import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>关于 MyRN 贴纸编辑器</Text>

      <Text style={styles.sectionTitle}>功能简介</Text>
      <Text style={styles.description}>• 从相册选择图片并添加 Emoji 贴纸。</Text>
      <Text style={styles.description}>• 支持上传自定义 Emoji，支持随机/清除/缩放。</Text>
      <Text style={styles.description}>• 重置仅清空当前编辑状态，不删除你已上传的 Emoji。</Text>

      <Text style={styles.sectionTitle}>隐私说明</Text>
      <Text style={styles.description}>• 仅在你授权后访问相册。</Text>
      <Text style={styles.description}>• 上传的自定义 Emoji 仅保存在当前应用会话内。</Text>

      <Text style={styles.sectionTitle}>反馈</Text>
      <Pressable onPress={() => Linking.openURL('mailto:feedback@myrn.app')}>
        <Text style={styles.link}>feedback@myrn.app</Text>
      </Pressable>

      <Text style={styles.meta}>Version: 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#f3f4f6',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  description: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    color: '#60a5fa',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  meta: {
    marginTop: 12,
    color: '#9ca3af',
    fontSize: 13,
    alignSelf: 'center',
  },
});
