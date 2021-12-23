import React from "react";
import { Component } from "react";
import { View, Text, TouchableOpacity ,StyleSheet, TextInput, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



export default class login extends Component{

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            Data: ''
        };
    }

    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.loginContainer}>
                    <View style={styles.ClickedView}>
                                <TextInput style={styles.Input}
                                    textAlign= 'center'
                                    textAlignVertical='center'
                                    placeholder="Username"
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                        this.setState({email: text})
                                    }}>
                                    
                                </TextInput>
                    </View>

                    <View style={styles.ClickedView}>
                                <TextInput style={styles.Input}
                                    textAlign= 'center'
                                    textAlignVertical='center'
                                    placeholder="Password"
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(text) => {
                                    this.setState({password: text})
                                    }}>
                                </TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => {
                        axios.post('https://reqres.in/api/login', 
                        {
                            email: this.state.email,
                            password: this.state.password
                        }).then(async (response) => {
                            //console.log(response.data);
                            await AsyncStorage.setItem('access_token', response.data.token)
                            this.props.navigation.replace('photo_list');
                            //console.log(this.state.Data)
                        }).catch(function (error) {
                            //console.log(error);
                            alert('Usernam or password is wrong', error)
                          })
                        }
                    }

                    //this.props.navigation.replace('photo_list')}}
                    >
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Login</Text>
                </TouchableOpacity>
            </View>
        )}
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    loginContainer:{
        height:'90%',
        width: '100%', 
        backgroundColor: '#E666A4',
        alignItems: 'center',
        justifyContent: 'center'
    },

    ClickedView:{
        alignSelf: 'center',
        justifyContent: 'center',
        height: 45,
        width: 200,
        backgroundColor: "#fff",
        elevation: 5,
        marginBottom: 20,
    },

    Input: {
        fontSize: 20,
        color:'#9ba9ba' ,
        fontWeight: '700',
        width: 170,
        paddingLeft: 20
    },

    buttonContainer: {
        height: '10%', 
        width: '100%',
        backgroundColor: '#69c5e3',
        alignItems: 'center',
        justifyContent: 'center'
    }

})