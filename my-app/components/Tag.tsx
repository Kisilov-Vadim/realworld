import { useState, useEffect, PropsWithChildren } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import requests from '@/services/requests';

type Props = PropsWithChildren<{
  tagValue: any
  setTagValue: any
  onTagChanged: any
}>;


export type Tags = {
  tags: string[]
};


export default function Tag({
  tagValue, setTagValue, onTagChanged
}: Props) {
  const [open, setOpen] = useState(false);
  const [tagItems, setTagItems] = useState([{}]);


  useEffect(() => {
    requests.get('/tags', (err: Body, res: Body) => {
      if (err) {
        console.log(err);
      } else {
        let tags: Tags = JSON.parse(JSON.stringify(res.body));
        let tagList = tags?.tags.map((tag, index) => { return { label: tag, value: tag } })
        setTagItems(tagList)
      }
    })

    return () => {
      // console.log('...')
    };
  }, []);

  return (

    <View style={{
      backgroundColor: '#171717',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15
    }}>
      <DropDownPicker
        open={open}
        items={tagItems}
        setItems={setTagItems}
        setOpen={setOpen}
        setValue={setTagValue}
        value={tagValue}
        onChangeValue={onTagChanged}
        placeholder={'Filter by tag...'}
        multiple={false}
      />
    </View>

  );

}

