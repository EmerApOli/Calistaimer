import React, { Component } from 'react'
import {keyboard,View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

class Select extends Component {

    state = {
        current: ''

    }

    componentDidMount() {
        this.setState({
            current: this.props.current
        })
    }

    handlePress = opt => () => {
        this.setState({
            current: opt
        })
        if (this.props.onSelect) {

            this.props.onSelect(opt)
        }
    }
    render() {

        const { options, label } = this.props
        const { current } = this.state
        return (
            <View ><Text style={styleSelect.label}>{label}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    {options.map(opt => {
                        let id = ''
                        let label = ''
                        if (typeof opt === 'string') {

                            id = opt
                            label = opt
                        }
                        if (typeof opt === 'object') {
                            id = opt.id
                            label = opt.label


                        }


                        return (

                            <TouchableOpacity
                                key={id}
                                style={[styleSelect.opt, id === current ? styleSelect.optSelected : null]}
                                onPress={this.handlePress(id)}
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
    label: {

        textAlign: 'center',
        color: 'white',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24
    },

    opt: {

        padding: 8

    },

    optlabel: {
        color: 'white',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
        opacity: 1

    },
    optSelected: {
        backgroundColor: 'rgba(255,255,255,0.6)'

    }



})

const Titulo = props => {

    return (
        <View style={[styles.container, styles.style]}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
    )

}


class EMOMScreen extends Component{
state={
   keyboardIsVisible: false

}

componentDidMount(){
 /// this.KbShow = keyboard.addListener('KeyBoardDidShow', ()=>{ 
  //    this.setState({keyboardIsVisible : true})
  //})
   
    this.KbShow = Keyboard.addListener ('KeyBoardDidShow', ()=>{ 
            this.setState({keyboardIsVisible : true})
        })
        this.KbHide = Keyboard.addListener ('KeyBoardDidHide', ()=>{ 
            this.setState({keyboardIsVisible : false})
        })
 // this.KbHide = keyboard.addListener('KeyBoardDidHide',()=>{
  //  this.setState({keyboardIsVisible : false})

 // })
}

componentWillUnmont(){
   this.KbShow.remove()
   this.KbHide.remove()

}


  render(){
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <ScrollView style={styles.container}>
                <Titulo title='EMOM' subtitle = 'Ever Minute is Minute' 
                style={{paddingTop:this.state.keyboardIsVisible ? 20 : 200}}
                />
                <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../assets/icons8-engrenagem-48.png')} />
                <Select label='Alertas'
                    current={0}
                    options={



                        [{
                            id: 0,
                            label: 'desligado'
                        }
                            ,
                        {
                            id: 15,
                            label: '15s',
                        },
                        {
                            id: 30,
                            label: '30s'
                        },
                        {
                            id: 45,
                            label: '45s'
                        }]}

                    onSelect={opt => console.log('selecionado', opt)} />
                <Select label='Contagem Regressiva'
                    current={0}
                    options={[{ id: 1, label: 'sim' }, { id: 0, label: 'não' }]}
                    onSelect={opt => console.log('selecionado', opt)} />
                <Text style={styles.label}>Qquantos Minutos</Text>
                < TextInput style={styles.input} keyboardType='numeric' value='15' />
                <Text style={styles.label}>Minutos</Text>
                <Text></Text>
                <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-botão-_play_48.png')} />
                <Text>Testar</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
 }
 }
 




EMOMScreen.NavigationStackOptions = {
    headerTransparent: true

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6304A',

    },
    label: {

        textAlign: 'center',
        color: 'white',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 10
    },
    input: {

        textAlign: 'center',
        color: 'black',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 48
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48

    },
    subtitle: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 20

    }


})



export default EMOMScreen