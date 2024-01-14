import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const MainPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Card
        style={styles.mainCard}
        onPress={() => {
          navigation.navigate('TimeCalculate');
        }}>
        <Card.Cover
          source={require('../../../assets/ozbel1.jpg')}
          style={{height: 250, width: 250}}
        />
        <Card.Actions style={{alignSelf: 'center'}}>
          <Button
            mode={'text'}
            textColor={'#48b687'}
            labelStyle={{fontSize: 16, fontWeight: 'bold'}}>
            Mesai Saati Hesapla
          </Button>
        </Card.Actions>
      </Card>
      <Card
        style={styles.mainCard}
        onPress={() => {
          navigation.navigate('DateCalculateScreen');
        }}>
        <Card.Cover
          source={require('../../../assets/ozbel2.jpg')}
          style={{height: 250, width: 250}}
        />
        <Card.Actions style={{alignSelf: 'center'}}>
          <Button
            mode={'text'}
            textColor={'#48b687'}
            labelStyle={{fontSize: 16, fontWeight: 'bold'}}>
            Mesai Başlangıç Tarihi Hesapla
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    margin: 20,
  },
});

export default MainPage;
