
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage  from  '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import ListItem from './ListItem';
import Modal from "react-native-modal";
import { TextInput,Headline,Button } from 'react-native-paper';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [phnNumber, setPhnNumber] = useState('');
  useEffect(()=>{
    //saveData()
    //AsyncStorage.clear();
    initiateArray()
  },[])

  useEffect(()=>{
    getData()
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
    setDetailArray(JSON.parse(myArray))
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
      setUserArray(userArray.concat(items))
      setLoading(false)
    }
    else{
      setLoading(false)
    }
    
  }

  const addItemToArray = () =>{
    let userObj = {}
    userObj.name = name;
    userObj.phn = phnNumber
    console.log(userObj)
    if(detailArray.some(item=>item.name==name || item.phn == phnNumber)){
      toggleModal()
      alert('User already exists!')
    }
    else{
      detailArray.push(userObj)
      saveData()
      initiateArray()
      toggleModal()
    }
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
          <Pressable onPress={()=>{setModalVisible(true)}} style={{height:30,width:150,backgroundColor:'#9c3353',justifyContent:'center',alignItems:'center',borderRadius:15}}>
            <Text style={{color:'#fff'}}>
              {'Add members'}
            </Text>
          </Pressable>
      </View>
      <Modal isVisible={modalVisible} 
      style={{backgroundColor:'#fff',margin: 0,justifyContent:'flex-start'}} 
      coverScreen={true} 
      onBackButtonPress={toggleModal} 
      animationIn={'slideInUp'}
      useNativeDriver={true}
      >
        <View style={{ padding:10}}>
        <Pressable onPress={()=>{setModalVisible(false)}}>
        <Text style={{color:'#000'}}>
              {'Back'}
            </Text>
        </Pressable>
        <Headline>
          {'Add user'}
        </Headline>
        <TextInput
          mode={'outlined'}
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          //outlineColor={'#9c3353'}
          activeOutlineColor={'#9c3353'}
          style={{backgroundColor:'#fff',color:'#9c3353',height:50}}
        />
        <TextInput
          mode={'outlined'}
          keyboardType='numeric'
          label="Phone number"
          value={phnNumber}
          maxLength={10}
          onChangeText={text => setPhnNumber(text)}
          activeOutlineColor={'#9c3353'}
          //outlineColor={'#9c3353'}
          style={{backgroundColor:'#fff',color:'#9c3353',height:50}}
        />

        <Button mode="contained" onPress={() => addItemToArray()} style={{backgroundColor:'#9c3353',marginTop:20}}>
            Add
          </Button>
        </View>
      </Modal>
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
  },
  
});
