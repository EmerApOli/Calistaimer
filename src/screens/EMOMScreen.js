import React, { Component } from 'react'
import { Animated, keyboard, View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Animated: `useNativeDriver` was not specified.',
  ])



const alert = require('../sounds/alert.wav')
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
        const { current } = this.state
        if (Array.isArray(current)) {

            let newCurrent = current
            const i = current.indexOf(opt)
            if (i >= 0) {
                newCurrent = [...newCurrent]
                newCurrent.splice(i, 1)

            }
            else {
                newCurrent = [...current, opt]


            }
            this.setState({
                current: newCurrent
            })

            if (this.props.onSelect) {

                this.props.onSelect(newCurrent)
            }

        } else {

            this.setState({
                current: opt
            })
            if (this.props.onSelect) {

                this.props.onSelect(opt)
            }
        }
    }
    checkItem = item => {
        const { current } = this.state
        if (Array.isArray(current)) {
            return current.indexOf(item) >= 0
        }
        return current === item
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

                        this.checkItem(id)
                        return (

                            <TouchableOpacity
                                key={id}
                                style={[this.checkItem(id) === current ? styleSelect.optSelected : null]}
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
        <Text style={styleTimer[props.type ? props.type : 'text']}>{format(minutes)}:{format(seconds)}{props.appendText}</Text>
    )

}
const styleTimer = StyleSheet.create({
    text: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 60,
        color: 'white',
        textAlign: 'center'
    },
    text2: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    }





})


class Progressbar extends Component {
   constructor(props) {
        super(props)
        this.width = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.percentage !== this.props.percentage) {
            Animated.timing(this.width, {
                toValue: this.props.percentage,
                duration: 500
            }).start()
        }

    }
    render() {
        const { color,percentage, height } = this.props
        const w = this.width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        return (
            <View>
                <Animated.View style={{
                    width: w,
                    backgroundColor: color ? color : 'white',
                    height: height ? height : 3
                }} />
            </View>


        )
    }
}

class BackgroundProgress extends Component {

    constructor(props) {
        super(props)
        this.height = new Animated.Value(0)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.percentage !== this.props.percentage) {
            Animated.timing(this.height, {
                toValue: this.props.percentage,
                duration: 500
            }).start()
        }

    }
    render(){
        const{children,percentage}= this.props
        const h = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        const h2 = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '0%']
        })
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Animated.View style={{ height: h2 , backgroundColor: '#D6304A' }} />
                <Animated.View style={{ height: h, backgroundColor: '#2A0E12' }} />
            </View>
            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
                {children}
            </View>

        </View>
    )
    }
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

        alerts: [0, 15],
        countdown: 1,
        time: '2',
        isRunning: false,
        countdownValue:  0,
        count: 0

    }

    componentDidMount() {

        Sound.setCategory('Playback', true)
        this.alert = new Sound(alert)

        this.KbShow = Keyboard.addListener('KeyBoardDidShow', () => {
            this.setState({ keyboardIsVisible: true })
        })
        this.KbHide = Keyboard.addListener('KeyBoardDidHide', () => {
            this.setState({ keyboardIsVisible: false })
        })
        //this.play()
        // this.KbHide = keyboard.addListener('KeyBoardDidHide',()=>{
        //  this.setState({keyboardIsVisible : false})

        // })
    }


    componentWillUnmont() {
        this.KbShow.remove()
        this.KbHide.remove()

    }

    playAlert = () => {
        const resto = this.state.count % 60
        if (this.state.alerts.indexOf(resto) >= 0) {
            this.alert.play()
        }
        if (this.state.countdown === 1) {
            if (resto >= 55 && resto < 60) {
                this.alert.play()
            }
        }
    }
 

    stop =()=>{
        clearInterval(this.countdownTimer)
        clearInterval(this.countTimer)
           this.setState({
            isRunning:false
        })
    }
    play = () => {
        this.setState({
            count:0,
            countdownValue:  this.state.countdown === 1 ? 5:0

        })
        this.setState({ isRunning: true })
        const count = () => {
            this.setState({ count: this.state.count + 1 }, () => {
                this.playAlert()
                if (this.state.count === parseInt(this.state.time) * 60) { clearInterval(this.countTimer) }

            })


        }
        //checar countdaow
        if (this.state.countdown === 1) {
            this.alert.play()
            this.countdownTimer = setInterval(() => {
                this.alert.play()
                this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
                    if (this.state.countdownValue === 0) {
                        clearInterval(this.countdownTimer)
                        this.countTimer = setInterval(count, 1000);
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

            const percMinute = parseInt(((this.state.count % 60) / 60) * 100)
            const percTime = parseInt(((this.state.count / 60) / parseInt(this.state.time)) * 100)



            return (
                <BackgroundProgress percentage={percMinute}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <View style={{flex:1, backgroundColor:'red'}}>
                      <Titulo title='EMOM' subtitle='Ever Minute is Minute'/>
                      </View>
                       <View  style={{ flex: 1}}>
                         <Timer time={this.state.count} />
                        <Progressbar percentage={percTime} />
                        <Timer time={parseInt(this.state.time) * 60 - this.state.count} type='text2' appendText=' Restantes' />
                        </View>
                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            {this.state.countdownValue > 0 ?
                        <Text style={styles.countdown}>{this.state.countdownValue} </Text>
                           :null }
                             <TouchableOpacity style={{ alignSelf: 'center', marginBottom:20}} onPress={this.stop}>
                        <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-botão-_play_48.png')} />
                         </TouchableOpacity>
                        </View>
                    </View>
                </BackgroundProgress>

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
                                label: '0s'
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

    },
    countdown:{
        fontFamily: 'Ubuntu-Bold',
        fontSize: 144,
        color: 'white',
        textAlign: 'center',
       }


})



export default EMOMScreen