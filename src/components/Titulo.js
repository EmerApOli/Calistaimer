import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Select from './Select'


const Titulo = props =>{

    return(
        <View style={styles.container}>
            <Text style={styles.title}> {props.title} </Text>
            <Text style={styles.subTitle}> {props.subTitle}</Text>
        </View>
    )

} 

const styles = Select.create({
container:{
   paddingTop:20,
   paddingButtom: 20

},
 title:{
     fontFamily:'Ubuntu-Bold',
      fontSize:48, 
      color:'white', 
       textAlign:'center'},


subTitle:{
    fontFamily:'Ubuntu-Regular', 
    fontSize: 14, 
    color: 'white',
    textAlign:'center'
}
 
})


export default Titulo

