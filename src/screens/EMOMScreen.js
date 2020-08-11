import React, { Component } from 'react'
import {View,Text,StyleSheet, Image,TouchableOpacity} from 'react-native'
import { createStackNavigator,NavigationStackOptions } from 'react-navigation-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';

class Select extends Component {

    state={
     current: ''

    }

    componentDidMount(){
    this.setState({
    current: this.props.current
    })
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
           let id=''
           let label = ''
           if(typeof opt === 'string'){

              id = opt
              label = opt
           }
            if(typeof opt === 'object'){
            id = opt.id
            label = opt.label


           }
       
  
        return(

            <TouchableOpacity  
            key={id} 
            style={[styleSelect.opt, id === current ? styleSelect.optSelected : null]}
            onPress = {this.handlePress(id)}
            >

           <Text style={styleSelect.optlabel}>{label}</Text>
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

const Titulo = props =>{

    return(
        <View style={{paddingTop:20}}>
            <Text style={{fontFamily:'Ubuntu-Bold',fontSize:20,color:'white',textAlign:'center'}}>EMOM</Text>
            <Text style={{fontFamily:'Ubuntu-Bold',fontSize:10,color:'white',textAlign:'center'}}> Every Minute On the Minute</Text>
        </View>
    )

} 


const EMOMScreen= props =>{

return(

    <View style= {styles.container}>
       <Titulo/>
       <Image source ={ require('../assets/icons8-engrenagem-48.png')}/>       
        <Select label = 'Alertas'
                 current = {0}
                options={

                    
                    
                    [{id:0,
                     label:'desligado'}
                     ,
                   { id: 15,
                     label:'15s',
                   },
                   {  id: 30,
                      label:'30s'
                    },
                     {id:45,
                    label:'45s'}]}

                onSelect={opt=> console.log('selecionado',opt)}/>
        <Select label='Contagem Regressiva'
                current = {0}
                options={[{id:1,label:'sim'},{id:0, label:'não'}]}
                onSelect={opt=> console.log('selecionado',opt)}/>
                <Text>Qquantos Minutos</Text>
                <Text>15</Text>
                <Text>Minutos</Text>
                <Text></Text>
                 <Image source ={ require('../assets/icons8-botão-_play_48.png')}/>  
    </View>
)

}




EMOMScreen.NavigationStackOptions={
header :false

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#D6304A',
        paddingTop: 0
    }})
export default EMOMScreen