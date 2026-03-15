import { StyleSheet, View } from 'react-native';

import IconButton from '@/components/IconButton';

type Props = {
  onRandom: () => void;
  onSmaller: () => void;
  onBigger: () => void;
  onClear: () => void;
};

export default function StickerActionsBar({ onRandom, onSmaller, onBigger, onClear }: Props) {
  return (
    <View style={styles.row}>
      <IconButton icon="auto-awesome" label="Random" onPress={onRandom} />
      <IconButton icon="zoom-out" label="Smaller" onPress={onSmaller} />
      <IconButton icon="zoom-in" label="Bigger" onPress={onBigger} />
      <IconButton icon="delete-outline" label="Clear" onPress={onClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
