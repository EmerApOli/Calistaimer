import React, { Component } from 'react'
import { keyboard, View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
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

const Timer = props => {

    const minutes = parseInt(props.time / 60)
    const seconds = parseInt(props.time % 60)
    const format = num => {
        if (num < 10) {
            return '0' + num

        }
        return num
    }
    return (
        <Text>{format(minutes)}:{format(seconds)}</Text>
    )

}
const style = StyleSheet.create({



})


const Progressbar =props => {
const{color,percentage,height}= props
return(
 <View>
<View style = {{  width: percentage ? percentage: '1%',
    backgroundColor:color ? color: 'white',
    height: height ? height : 3 }} />
     </View>
 

)

}






const Titulo = props => {

    return (
        <View style={[styles.container, styles.style]}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>

        </View>
    )

}


class EMOMScreen extends Component {
    
    state = {
        keyboardIsVisible: false,

        alerts: 0,
        countdown: 1,
        time: '1',
        isRunning: false,
        countdownValue: 5,
        count: 0

    }

    componentDidMount() {
        /// this.KbShow = keyboard.addListener('KeyBoardDidShow', ()=>{ 
        //    this.setState({keyboardIsVisible : true})
        //})

        this.KbShow = Keyboard.addListener('KeyBoardDidShow', () => {
            this.setState({ keyboardIsVisible: true })
        })
        this.KbHide = Keyboard.addListener('KeyBoardDidHide', () => {
            this.setState({ keyboardIsVisible: false })
        })
        this.play()
        // this.KbHide = keyboard.addListener('KeyBoardDidHide',()=>{
        //  this.setState({keyboardIsVisible : false})

        // })
    }
    

    componentWillUnmont() {
        this.KbShow.remove()
        this.KbHide.remove()

    }

    play = () => {
        this.setState({ isRunning: true })
        const count = () => {
            this.setState({ count: this.state.count + 1 }, () => {
                if (this.state.count === parseInt(this.state.time) * 60) { clearInterval(this.countTimer) }

            })


        }
        //checar countdaow
        if (this.state.countdown === 1) {
            this.countdownTimer = setInterval(() => {

                this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
                    if (this.state.countdownValue === 0) {
                        clearInterval(this.countdownTimer)
                        this.countTimer = setInterval(count, 100);
                    }

                }


                )
            }, 1000)
        } else {
            this.countTimer = setInterval(count, 100)
        }
    }
    //começar a contar
    //checar terminou



    render() {

        if (this.state.isRunning) {

            const percMinute =(this.state.count % 60) / 60
            const percTime = (this.state.count / 60) / parseInt(this.state.time)
              


            return (

                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <Text> Running : {this.state.countdownValue}    </Text>
                    <Text> Count : {this.state.count}    </Text>
                    <Timer time={this.state.count} />
                    <Text>Minutes:{percMinute}</Text>
                    <Text>Time:{percTime}</Text>
                    <Progressbar />
                </View>

            )



        }


        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <ScrollView style={styles.container}>
                    <Titulo title='EMOM' subtitle='Ever Minute is Minute'
                        style={{ paddingTop: this.state.keyboardIsVisible ? 20 : 200 }}
                    />
                    <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../assets/icons8-engrenagem-48.png')} />
                    <Select label='Alertas'
                        current={this.state.alerts}
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

                        onSelect={opt => this.setState({ alert: opt })} />
                    <Select label='Contagem Regressiva'
                        current={this.state.countdown}
                        options={[{ id: 1, label: 'sim' }, { id: 0, label: 'não' }]}
                        onSelect={opt => this.setState({ countdown: opt })} />
                    <Text style={styles.label}>Qquantos Minutos</Text>
                    < TextInput style={styles.input} keyboardType='numeric' value={this.state.time} onChangeText={text => this.setState({ time: text })} />
                    <Text style={styles.label}>Minutos</Text>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
                        <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-botão-_play_48.png')} />
                    </TouchableOpacity>
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