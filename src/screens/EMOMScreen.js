import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { createStackNavigator,NavigationStackOptions } from 'react-navigation-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


class Select extends Component {

    state={
     current: 'opt1'

    }
    handlePress = opt => ()=>{
        this.setState({
            current: opt
        })
        if(this.props.onSelect){
            
            this.props.onSelect(opt)
    }}
    render(){

        const {options,label} = this.props
        const {current} = this.state
return(
 <View style={{flex:1}}  ><Text style={styleSelect.label}>{label}</Text>
    <View style={{flexDirection:'row',justifyContent: 'space-around'}}>

      {options.map(opt =>{
        return(

            <TouchableOpacity  
            key={opt} 
            style={[styleSelect.opt, opt === current ? styleSelect.optSelected : null]}
            onPress = {this.handlePress(opt)}
            >
           
           <Text style={styleSelect.optlabel}>{opt}</Text>
          </TouchableOpacity>
        )
      })}
      
        </View>
     </View>
 

)
    }
}

const styleSelect = StyleSheet.create({
label:{

textAlign:'center',
color: 'white',
fontFamily:'Ubuntu-Regular',
fontSize: 24
},

opt:{

 padding:8

},

optlabel:{
color:'white',
fontFamily: 'Ubuntu-Regular',
fontSize :24,
opacity: 1

},
optSelected:{ 
        backgroundColor:'rgba(255,255,255,0.6)'

}



})


const EMOMScreen= props =>{

return(

    <View style= {styles.container}>
        <Text>EMOM Sreen</Text>
        <Select label = 'Alertas'
                options={['desligado','15s', '30s','45s']}
                onSelect={opt=> console.log('selecionado',opt)}/>
        <Select label='Contagem Regressiva'
                options={['sim','não']}
                onSelect={opt=> console.log('selecionado',opt)}/>
    </View>
)

}




EMOMScreen.NavigationStackOptions={
Header: null

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#D6304A',
        paddingTop: 200
    }})
export default EMOMScreen