import React from 'react';
import { Text, View ,StyleSheet} from "react-native";
import {Feather} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';

function nameToInitials(fullName) {
    const namesArray = fullName.trim().split(' ');
    if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
    else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
  }

const ListItem =({item,...props}) => {

        return(
            <View style={styles.container}>
               <View style={{flex:1.5,justifyContent:'center'}}>
                <View style={{height:44,width:44,borderRadius:22,backgroundColor:'#e4c5ce',justifyContent:'center',alignItems:'center',opacity:.7}}  >
                    <Text style={{fontSize:17}}>
                        {nameToInitials(item.name)}
                    </Text>
                </View>
               </View> 
               <View style={{flex:7.8,flexDirection:'column'}}>
                <View style={{flex:1,alignItems:'flex-start'}}>
                    <Text style={{fontSize:15,color:'#6e6e6e',fontWeight:'bold'}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',bottom:2}}>
                <Feather name="phone-call" size={13} color="#9c3353" />
                <Text style={{fontSize:13,color:'#8b8b8b',fontWeight:'bold'}}>
                    {' '}{' +91 - '}{item.phn}
                </Text>
                </View>
               </View>
               <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <MaterialIcons name="delete-outline" size={24} color="#9c3353" />
               </View>

            </View>
        );
    
};

const styles = StyleSheet.create({
    container: {
      height:65,
      padding:10,
      flexDirection:'row',
      borderRadius:7,
      borderWidth:.7,
      borderColor:'#fcf7f8',
      marginVertical:4,
      elevation:1,
      
    },
  });

export default (ListItem);