import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Modal, PaperProvider, Portal} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import FormInput from '../FormInput';
import {useEffect} from 'react';
import moment from 'moment';

const DateCalculateScreen = () => {
  const [selectedDate, setSelectedDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [day, setDay] = React.useState(null);
  const [startDate, setStartDate] = React.useState(undefined);
  const [firstDate, setFirstDate] = React.useState(undefined);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);

  useEffect(() => {
    if (selectedDate !== undefined) {
      const newDate = moment(selectedDate).format('DD.MM.YYYY');
      setFirstDate(newDate.toString());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (day !== undefined && day !== null && day !== '') {
      let weekNum = day / 6;
      let addDay = day % 6;
      let newDate = new Date(selectedDate);
      if (newDate !== undefined && newDate !== null) {
        if (weekNum.toString().indexOf('.') > -1) {
          newDate.setDate(
            selectedDate.getDate() +
              weekNum.toString().substring(0, weekNum.toString().indexOf('.')) *
                7 +
              addDay +
              1,
          );
        } else {
          newDate.setDate(selectedDate.getDate() + weekNum * 7 + addDay + 1);
        }

        setStartDate(moment(newDate).format('DD.MM.YYYY'));
      }
    } else {
      setStartDate(undefined);
    }
  }, [day]);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setSelectedDate(params.date);
    },
    [setOpen, setSelectedDate],
  );

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{width: '95%'}}>
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}>
              <FormInput
                labelValue={firstDate}
                onChangeText={showModal}
                placeholderText="İzin Başlangıç Tarihi"
                iconType="calendar"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                pointerEvents="none"
                onTouchStart={showModal}
                editable={false}
                selectTextOnFocus={false}
              />
            </TouchableOpacity>
            <FormInput
              labelValue={day}
              onChangeText={dayVal => setDay(dayVal.replace(',', '.'))}
              placeholderText="Kullanılacak İzin Günü Sayısı"
              iconType="printer"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={startDate}
              onChangeText={startVal => setStartDate(startVal)}
              placeholderText="Mesai Başlama Günü"
              iconType="checksquareo"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              inputType={'number'}
            />

            <DatePickerModal
              locale="tr"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={selectedDate}
              onConfirm={onConfirmSingle}

            />
          </View>
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

export default DateCalculateScreen;
