import React from 'react'
import {Text, TouchableOpacity,StyleSheet} from 'react-native'


const Button = props =>{
    return(
    <TouchableOpacity onPress={props.onPress} style={props.style}> 
    <Text style ={style.text}>{props.children}</Text>
    </TouchableOpacity>
    )
}


const style = StyleSheet.create({

text:{fontFamily:'Ubuntu-Bold', color:'white',fontFamily:'Ubuntu-Regular',fontSize:24,textAlign:'center'}


})
export default Button