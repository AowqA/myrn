import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About MyRN Sticker Editor</Text>
      <Text style={styles.description}>
        A lightweight Expo app for photo sticker editing.
      </Text>
      <Text style={styles.description}>
        Features include emoji stickers, custom emoji upload, resize, randomize, clear, and save-to-gallery.
      </Text>
      <Text style={styles.meta}>Version: 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#d1d5db',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  meta: {
    marginTop: 8,
    color: '#9ca3af',
    fontSize: 13,
  },
});
