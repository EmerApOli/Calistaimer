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
                toValue: this.props.percentage > 100 ? 100 : this.props.percentage,
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


class IsometriaSreen extends Component {

    state = {
        keyboardIsVisible: false,

        goal: 1,
        countdown: 1,
        time: '20',

        isRunning: false,
        countdownValue:  0,
        paused: false,
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
       // this.play()
        // this.KbHide = keyboard.addListener('KeyBoardDidHide',()=>{
        //  this.setState({keyboardIsVisible : false})

        // })
    }


    componentWillUnmont() {
        this.KbShow.remove()
        this.KbHide.remove()

    }

    playAlert = () => {
            const resto = 0
            const{count,time} = this.state
            if (count >=parseInt(time)-5 &&  count <= parseInt(time)) {
                this.alert.play()
            }
        }
    
 
         restart =()=>{
             if(this.state.paused){
            clearInterval(this.countTimer)
            clearInterval(this.countdownTimer)
            this.play()
             }
             }
         

    stop =()=>{
     // clearInterval(this.countdownTimer)
       // clearInterval(this.countTimer)
           this.setState({
            paused: !this.state.paused
        }) 
    }


    /*back = ()=>{
        if(this.state.paused|| ! this.state.isRunning){
                clearInterval(this.countTimer)
                   clearInterval(this.countdownTimer)
              this.props.NavigationStackOptions.goback()

    }} */
    play = () => {
        const time = this.state.goal === 0 ?'0' : this.state.time
        this.setState({
            count:0,
            countdownValue:  5,
            paused: false,
            time

        })
        this.setState({ isRunning: true })
        const count = () => {
            if (this.state.paused){
             return;
        }  
            this.setState({ count: this.state.count + 1 }, () => {
                this.playAlert()
               // if (this.state.count === parseInt(this.state.time)) { clearInterval(this.countTimer) }

            })


        }
        //checar countdaow
     
            this.alert.play()
            this.countdownTimer = setInterval(() => {
                if (this.state.paused){
                    return;}
                this.alert.play()
                this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
                    if (this.state.countdownValue === 0) {
                        clearInterval(this.countdownTimer)
                        this.countTimer = setInterval(count, 1000);
                    }

                }


                )
            }, 1000)
     
    }
    //começar a contar
    //checar terminou



    render() {

        if (this.state.isRunning) {

          
            const percMinute = this.state.time === '0' ? 0 : parseInt(((this.state.count) / parseInt(this.state.time)) * 100)
            const restante = parseInt(this.state.time)>= this.state.count  ? parseInt( this.state.time) - this.state.count :0
            const opacity = !this.state.paused ? 0.6 : 1
   
            return (
                <BackgroundProgress percentage={percMinute}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <View style={{flex:1, backgroundColor:'red'}}>
                      <Titulo title='Isometria' style ={{ paddingTop: this.state.keyboardIsVisible ? 20 :100}}/>
                      </View>
                       <View  style={{ flex: 1,justifyContent: 'center'}}>
                         <Timer time={this.state.count} />
                         {
                            this.state.goal === 1 ? <Timer time ={restante} type ='text2' appendText={'restantes'}/> : null
                         }
                                        
                         </View>
                         {this.state.countdownValue > 0 ?
                        <Text style={styles.countdown}>{this.state.countdownValue} </Text>
                           :null }
                        <View style={ {flexDirection:'row', justifyContent:"space-between",  marginBottom:20}}>
                          
                        <TouchableOpacity style={{ alignSelf: 'center'}} onPress={this.back}>
                        <Image  style={{ opacity}} source={require('../assets/icons8-seta-responder-48.png')} />
                         </TouchableOpacity>
                         <TouchableOpacity style={{ alignSelf: 'center'}} onPress={this.stop}>
                           { this.state.paused ?
                        <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-botão-_play_48.png')} />
                          :
                          <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-parar-48.png')} />
                          }
                         </TouchableOpacity>
                         
                         <TouchableOpacity style={{ alignSelf: 'center'}} onPress={this.restart}>
                        <Image style={{ opacity}} source={require('../assets/icons8-actualizar-48.png')} />
                         </TouchableOpacity>
                        </View>
                    </View>
                </BackgroundProgress>

            )



        }


        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <ScrollView style={styles.container}>
                    <Titulo title='Isometria' subtitle='Ever Minute is Minute'
                        style={{ paddingTop: this.state.keyboardIsVisible ? 20 : 200 }}
                    />
                    <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../assets/icons8-engrenagem-48.png')} />
                    <Select label='objetivo:'
                        current={this.state.goal}
                        options={



                            [{
                                id: 0,
                                label: 'livre'
                            }
                                ,
                            {
                                id: 1,
                                label: 'Bater tempo',
                            }
                            ]}

                        onSelect={opt => this.setState({ goal: opt })} />
                        {this.state.goal!== 0 ?
                    <React.Fragment>
                    <Text style={styles.label}>Qquantos Segundos:</Text>
                    < TextInput style={styles.input} keyboardType='numeric' value={this.state.time} onChangeText={text => this.setState({ time: text })} />
                    </React.Fragment>
                    : null
                    }
                    <View style={ {flexDirection:'row', justifyContent:"space-between",  marginBottom:20}}>
                    <TouchableOpacity style={{ alignSelf: 'center'}} >
                        <Image source={require('../assets/icons8-seta-responder-48.png')} />
                         </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
                        <Image style={{ alignSelf: 'center' }} source={require('../assets/icons8-botão-_play_48.png')} />
                    </TouchableOpacity>
                    </View>
                    <Text>Testar</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}




IsometriaSreen.NavigationStackOptions = {
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



export default IsometriaSreen