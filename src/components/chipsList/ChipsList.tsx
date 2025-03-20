import React from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'native-base';

import SkeletonChipsList from './SkeletonChipsList';

type Chip = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
};

type ChipsListProps = {
  isPreview?: boolean;
  isLoading?: boolean;
  data?: Chip[];
};

const ChipsList = ({data, isLoading, isPreview}: ChipsListProps) => {
  if (isLoading) {
    return <SkeletonChipsList />;
  }

  if (!data?.length) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map(({title, selected, onPress}) => (
        <Button
          key={title}
          disabled={isPreview}
          variant={selected ? 'solid' : 'outline'}
          size="xs"
          mr={2}
          borderRadius={50}
          colorScheme={isPreview ? 'light' : 'blue'}
          onPress={onPress}
        >
          {title}
        </Button>
      ))}
    </ScrollView>
  );
};
export default ChipsList;
