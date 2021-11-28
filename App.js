
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedbackComponent, View } from 'react-native';
import AsyncStorage  from  '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import ListItem from './ListItem';

const STORAGE_KEY = '@save_details';

export default function App() {
  const [detailArray,setDetailArray] = useState([
    {name:'Test1',phn:'9999999999'},
    {name:'Test2',phn:'9999999998'},
    {name:'ATest3',phn:'9999999997'},
    {name:'BTest4',phn:'9999999996'},
    {name:'CTest5',phn:'9999999995'},
    {name:'DTest6',phn:'9999999994'},
    {name:'ETest7',phn:'9999999993'},
    {name:'FTest8',phn:'9999999992'},
    {name:'GTest9',phn:'9999999991'},
    {name:'HTest10',phn:'9999999981'},
    {name:'ITest11',phn:'9999999982'},
    {name:'JTest12',phn:'9999999983'},
    {name:'KTest13',phn:'9999999984'},
    {name:'LTest14',phn:'9999999985'},
    {name:'MTest15',phn:'9999999986'},
    {name:'NTest16',phn:'9999999987'},
    {name:'OTest17',phn:'9999999988'},
    {name:'PTest18',phn:'9999999989'},
    {name:'QTest19',phn:'9999999970'},
    {name:'RTest20',phn:'9999999990'}])

    const [userArray,setUserArray] = useState([])
    const [loading,setLoading] = useState(false)
  useEffect(()=>{
    saveData()
    initiateArray()
  },[])

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(detailArray))
      //alert('Data successfully saved')
    } catch (e) {
      alert(e)
    }
  }

  const getData = async () =>{
    try {
      const myArray = await AsyncStorage.getItem(STORAGE_KEY);
  if (myArray !== null) {
    // We have data!!
    console.log('message',JSON.parse(myArray));
    
  }
    } catch (e) {
      alert(e)
    }
  }

  const initiateArray = () =>{
    const items = detailArray.slice(0,5)
    setUserArray(items)
  }

  const addInfiniteItem = () =>{
    //alert('came here')
    setLoading(true)
    if(userArray.length< detailArray.length)
    {
      const items = detailArray.slice(userArray.length,userArray.length+5)
      console.log(items)
      console.log(userArray)
      setUserArray(userArray.concat(items))
      setLoading(false)
    }
    else{
      setLoading(false)
    }
    
  }

  const footer = () =>{
    return loading ? <View><Text>Loading...</Text></View> : null
  }

  return (
    <View style={styles.container}>
      <View style={styles.parentContainer}>
        <Feather name="users" size={15} color="#A9A9A9" style={{flex:.5,marginTop:3}}/>
        <Text style={{flex:8.8,fontSize:16,fontWeight:'bold',color:'#696969'}}>
        Team members
        </Text>
        <AntDesign name="infocirlce" size={22} color="#3CB371" style={{flex:.7,marginTop:3}} />
      </View>
      <View style={styles.childContainer}>
      <FlatList
        data={userArray}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
              <ListItem
                  item={item}
              />
  
      )}
        ListFooterComponent={footer}
        onEndReachedThreshold={0.1}
        onEndReached={()=>{addInfiniteItem()}}
        style={{height:300,flexGrow:0,padding:5}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:20}}
      />
      </View>
      <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
          <Pressable onPress={()=>{alert('pressed')}} style={{height:30,width:150,backgroundColor:'#9c3353',justifyContent:'center',alignItems:'center',borderRadius:15}}>
            <Text style={{color:'#fff'}}>
              {'Add members'}
            </Text>
          </Pressable>
      </View>
     
    </View>
  );
 }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
  parentContainer: {
    flex:.5,
    flexDirection:'row',
    justifyContent:'center',
    paddingHorizontal:5

  },
  childContainer: {
    flex:6.5
  }
});
