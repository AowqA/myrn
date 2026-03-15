import { StyleSheet, View } from 'react-native';

import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';

type Props = {
  onReset: () => void;
  onAddSticker: () => void;
  onSave: () => void;
};

export default function EditorToolbar({ onReset, onAddSticker, onSave }: Props) {
  return (
    <View style={styles.row}>
      <IconButton icon="refresh" label="重置" onPress={onReset} />
      <CircleButton onPress={onAddSticker} />
      <IconButton icon="save-alt" label="保存" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
