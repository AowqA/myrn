import { StyleSheet, View } from 'react-native';

import IconButton from '@/components/IconButton';

type Props = {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onRandom: () => void;
  onSmaller: () => void;
  onBigger: () => void;
  onClear: () => void;
};

export default function StickerActionsBar({
  isExpanded,
  onToggleExpanded,
  onRandom,
  onSmaller,
  onBigger,
  onClear,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconButton icon="auto-awesome" label="随机" onPress={onRandom} />
        <IconButton icon="delete-outline" label="清除贴纸" onPress={onClear} />
        <IconButton
          icon={isExpanded ? 'expand-less' : 'expand-more'}
          label={isExpanded ? '收起' : '更多'}
          onPress={onToggleExpanded}
        />
      </View>

      {isExpanded && (
        <View style={styles.row}>
          <IconButton icon="zoom-out" label="缩小" onPress={onSmaller} />
          <IconButton icon="zoom-in" label="放大" onPress={onBigger} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 2,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
