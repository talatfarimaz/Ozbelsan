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
import {DatePickerModal, tr} from 'react-native-paper-dates';
import FormInput from '../FormInput';
import {useEffect} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

const DateCalculateScreen = () => {
  const [selectedDate, setSelectedDate] = React.useState(undefined);
  // const [open, setOpen] = React.useState(false);
  const [day, setDay] = React.useState(null);
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);
  const [firstDate, setFirstDate] = React.useState(undefined);
  const [lastDate, setLastDate] = React.useState(undefined);

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [selectedStartDate, setSelectedStartDate] = React.useState(undefined);
  const [selectedEndDate, setSelectedEndDate] = React.useState(undefined);

  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [value, setValue] = React.useState(dayjs());

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
          if (newDate.getDay() + addDay > 7) {
            newDate.setDate(
              selectedDate.getDate() +
                weekNum
                  .toString()
                  .substring(0, weekNum.toString().indexOf('.')) *
                  7 +
                addDay +
                1,
            );
            setLastDate(newDate);
          } else {
            newDate.setDate(
              selectedDate.getDate() +
                weekNum
                  .toString()
                  .substring(0, weekNum.toString().indexOf('.')) *
                  7 +
                addDay,
            );
            setLastDate(newDate);
          }
        } else {
          newDate.setDate(selectedDate.getDate() + weekNum * 7 + addDay);
          setLastDate(newDate);
        }

        if (newDate.getDay() === 0) {
          newDate.setDate(newDate.getDate() + 1);
        }
        setStartDate(moment(newDate).format('DD.MM.YYYY'));
      }
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [day, selectedDate]);

  useEffect(() => {
    if (lastDate !== undefined) {
      let newDate = new Date(lastDate);
      if (newDate.getDay() === 1) {
        newDate.setDate(newDate.getDate() - 2);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
      setEndDate(moment(newDate).format('DD.MM.YYYY'));
    }
  }, [lastDate]);
  useEffect(() => {
    if (value !== null && value !== undefined) {
      let newDate = new Date(value);
      setSelectedDate(newDate);
    }
  }, [value]);

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
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };
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
              iconType="filetext1"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={endDate}
              onChangeText={endVal => setEndDate(endVal)}
              placeholderText="İzin Bitiş Günü"
              iconType="infocirlceo"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              inputType={'number'}
            />
            <FormInput
              labelValue={startDate}
              onChangeText={startVal => setValue(startVal)}
              placeholderText="Mesai Başlama Günü"
              iconType="checksquareo"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              inputType={'number'}
            />
            {/*    <DatePickerModal
              locale="tr"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={selectedDate}
              onConfirm={onConfirmSingle}
            />*/}
            {/*          <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setSelectedDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              locale={'tr'}
              mode={'date'}
              confirmText={'Seç'}
              cancelText={'Çık'}
              title={'Başlangıç Günü'}
            />*/}
            <Portal>
              <Modal
                visible={open}
                onDismiss={() => {
                  setOpen(false);
                }}
                contentContainerStyle={containerStyle}>
                <DateTimePicker
                  value={value}
                  onValueChange={dateVal => {
                    setValue(dateVal);
                    setOpen(false);
                  }}
                  locale={'tr'}
                  firstDayOfWeek={1}
                  mode={'date'}
                  selectedItemColor={'#48b687'}
                  displayFullDays={true}
                  headerButtonColor={'#23573f'}
                  headerButtonSize={20}
                />
              </Modal>
            </Portal>
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
  containerTwo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

export default DateCalculateScreen;
