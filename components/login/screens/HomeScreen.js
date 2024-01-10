import * as React from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import FormInput from '../FormInput';

const HomeScreen = () => {
  const [value, setValue] = React.useState('keltepe');
  const selectionList = ['Lg', 'Mg', 'Hg', 'PAG-Waste', 'NAG-Waste'];
  const [patern, setPatern] = React.useState(null);
  const [block, setBlock] = React.useState(null);
  const [tonnes, setTonnes] = React.useState(null);
  const [tonnesTwo, setTonnesTwo] = React.useState(null);
  const [ounces, setOunces] = React.useState(null);
  const [grade, setGrade] = React.useState(null);
  const [oreControl, setOreControl] = React.useState(null);
  const [checked, setChecked] = React.useState(selectionList[0]);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (patern != null && patern !== '') {
      if (block == null || block === '') {
        setTonnes(patern + ' saat 0 dakika');
        setTonnesTwo(patern);
      } else {
        const tempTonnes = patern * block;
        const clock = tempTonnes.toString().split('.')[0];
        const minute =
          tempTonnes
            .toFixed(2)
            .toString()
            .substr(tempTonnes.toFixed(2).toString().indexOf('.')) * 60;
        setTonnes(clock.toString() + ' saat ' + minute.toFixed(0) + ' dakika');
        setTonnesTwo(tempTonnes.toFixed(2).toString());
      }
    } else {
      setTonnes(null);
    }
  }, [patern, block]);

  useEffect(() => {
    if (tonnesTwo != null && tonnesTwo !== '') {
      const day = tonnesTwo >= 8 ? parseInt(tonnesTwo / 8) : 0;
      const clock = parseInt(tonnesTwo % 8);
      const minute = parseInt((tonnesTwo * 60) % 60);
      setOunces(day + ' gün ' + clock + ' saat ' + minute + ' dakika');
    } else {
      setOunces(null);
      setOunces(null);
    }
  }, [tonnesTwo]);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const selectOreControl = selection => {
    setChecked(selection);
    hideModal();
    setOreControl(selection);
  };

  const resetAllValue = () => {
    setPatern(null);
    setBlock(null);
    setTonnes(null);
    setOunces(null);
    setGrade(null);
    setOreControl(null);
  };

  const addPress = () => {
    if (
      patern != null &&
      block != null &&
      tonnes != null &&
      ounces != null &&
      grade != null &&
      oreControl != null
    ) {
      ToastAndroid.show('Başarılı bir şekilde kaydedildi.', ToastAndroid.LONG);
      resetAllValue();
    } else {
      ToastAndroid.show(
        'Lütfen tüm analiz değerlerini giriniz!',
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{width: '95%'}}>
          <React.Fragment>
            <FormInput
              labelValue={patern}
              onChangeText={paternVal => setPatern(paternVal.replace(',', '.'))}
              placeholderText="Saat giriniz"
              iconType="dingding"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={block}
              onChangeText={blockVal => setBlock(blockVal.replace(',', '.'))}
              placeholderText="Oran giriniz"
              iconType="table"
              keyboardType="numeric"
              autoCapitalize="characters"
              autoCorrect={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={tonnes}
              onChangeText={tonnesVal => setTonnes(tonnesVal)}
              placeholderText="Toplam saat"
              iconType="dashboard"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              editable={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={ounces}
              onChangeText={ouncesVal => setOunces(ouncesVal)}
              placeholderText="Gün/Saat/Dakika"
              iconType="antdesign"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              inputType={'number'}
            />
          </React.Fragment>
        </ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{fontWeight: 'bold', fontSize: 11, fontStyle: 'italic'}}>
            Created by Farımaz
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    width: '95%',
  },
  selectionArea: {
    padding: 5,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
