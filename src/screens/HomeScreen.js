import React from 'react'
import {View,Text, TouchableOpacity, StyleSheet} from 'react-native'
import { createStackNavigator,NavigationStackOptions } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';

import Button from '../components/Button'
const HomeScreen= props =>{

return(

    <View style={styles.container} >

         <Text style= {styles.logo}>Calistimer</Text>
          <Button style={styles.btn} onPress={()=> props.navigation.navigate('EMOM')}>Emom</Button>
          <Button style={styles.btn} onPress={()=> props.navigation.navigate('EMOM')}>ARMAP</Button>
          <Button style={styles.btn} onPress={()=> props.navigation.navigate('EMOM')}>Isometria</Button>
   
   
    </View>
)

}
HomeScreen.NavigationStackOptions ={
header: null
}




const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#D6304A'
    },
    logo: {fontFamily: 'Ubuntu-Bold', fontSize: 48, textAlign: 'center',color:111},
 btn: {padding:20}
}

)
export default HomeScreen