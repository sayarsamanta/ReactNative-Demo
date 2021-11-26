import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//https://sof.abpweddings.com/mats/activity/read/2180746/2021/10/0.json
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [defYear, setDefYear] = useState('2021');
  const [years, setYears] = useState([
    {label: '2019', value: '2019'},
    {label: '2020', value: '2020'},
    {label: '2021', value: '2021'}
  ]);
  const [openMonth, setOpenMonth] = useState(false);
  const [defMonth, setDefMonth] = useState('October');
  const [months, setMonths] = useState([
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'}
    
  ]);

  const getData = (year=2021,month=10) => {
    return fetch('https://sof.abpweddings.com/mats/activity/read/2180746/'+year+'/'+ month +'/0.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json.activityDocuments)
        setLoading(false)
        setData(json.activityDocuments);
        //return json.activityDocuments;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, [defYear,defMonth]);

 if(isLoading){
   return (
    <View style={styles.container}>
      <ActivityIndicator/>
    </View>
   )
 } 

  return (
    <View style={styles.container}>
      
      <View style={{flexDirection:'row'}}>
        <Text style={{marginRight:3}}>
          {'Year'}
        </Text>
        <DropDownPicker
            open={open}
            value={defYear}
            items={years}
            setOpen={setOpen}
            setValue={setDefYear}
            setItems={setYears}
            onChangeValue={(value)=>{getData(value,defMonth)}}
          />
      </View>
      <View style={{flexDirection:'row',marginLeft:5}}>
        <Text style={{marginRight:3}}>
          {'Month '}
        </Text>
        <DropDownPicker
            open={openMonth}
            value={defMonth}
            items={months}
            setOpen={setOpenMonth}
            setValue={setDefMonth}
            setItems={setMonths}
            onChangeValue={(value)=>{getData(defYear,value)}}
          />
      </View>
      
      
      
    </View>
  );
 }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
});
