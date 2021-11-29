/**
 * Created  by Sayar Samanta on 28th Nov
 */
import React from 'react';
import { Text, View ,StyleSheet} from "react-native";
import {Feather} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { moderateScale, scale } from 'react-native-size-matters';
/**
 * 
 * @param {function for getting tne initials} fullName 
 * @returns 
 */
function nameToInitials(fullName) {
    const namesArray = fullName.trim().split(' ');
    if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
    else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
  }

const ListItem =({item,...props}) => {

        return(
            <View style={styles.container}>
               <View style={{flex:1.5,justifyContent:'center'}}>
                <View style={styles.nameInitial}  >
                    <Text style={{fontSize:moderateScale(17)}}>
                        {nameToInitials(item.name)}
                    </Text>
                </View>
               </View> 
               <View style={{flex:7.8,flexDirection:'column'}}>
                <View style={{flex:1,alignItems:'flex-start'}}>
                    <Text style={styles.nameText}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.numberParentView}>
                <Feather name="phone-call" size={scale(10)} color="#9c3353" />
                <Text style={styles.numberText}>
                    {' '}{' +91 - '}{item.phn}
                </Text>
                </View>
               </View>
               <View style={styles.deleteView}>
                <MaterialIcons name="delete-outline" size={scale(23)} color="#9c3353"/>
               </View>

            </View>
        );
    
};

const styles = StyleSheet.create({
    container: {
      height:scale(60),
      padding:moderateScale(11),
      flexDirection:'row',
      borderRadius:moderateScale(7),
      borderWidth:scale(.7),
      borderColor:'#fcf7f8',
      marginVertical:moderateScale(3),
      elevation:1,
      
    },
    deleteView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    numberText:{
        fontSize:scale(11),
        color:'#8b8b8b',
        fontWeight:'bold'
    },
    numberParentView:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        bottom:moderateScale(2)
    },
    nameText:{
        fontSize:scale(13),
        color:'#6e6e6e',
        fontWeight:'bold'
    },
    nameInitial:{
        height:scale(38),
        width:scale(38),
        borderRadius:scale(19),
        backgroundColor:'#e4c5ce',
        justifyContent:'center',
        alignItems:'center',
        opacity:.7
    }
  });

export default (ListItem);