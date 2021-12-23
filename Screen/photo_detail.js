import React from "react";
import { Component } from "react";
import {TextInput, StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class photo_detail extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            photo_detail: []
        };

        this.getAccessToken();
        this.getPhotoDetail();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    getPhotoDetail = () => {
        AsyncStorage.getItem('idHolding').then((idHolding) => {
            axios.get(`https://jsonplaceholder.typicode.com/photos/${idHolding}`, { headers: {"token" : this.state.access_token} } )
                .then((res) => {this.setState({photo_detail: res.data })
                            //this.setState({isLoading: false})
                            console.log(this.state.photo_detail)
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})})
            });
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.headingContainer}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{this.state.photo_detail.title}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: this.state.photo_detail.url}} style={styles.photo} resizeMode="contain"></Image>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => {this.props.navigation.goBack('photo_list')}}>
                    <Text  style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>BACK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    headingContainer:{
        backgroundColor: '#E666A4',
        height: '10%',
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer:{
        height: '80%',
        width: '100%',
        justifyContent: 'center'
    },

    photo:{
        height: '70%',
        width: '100%'
    },

    backButton:{
        height: '10%',
        width: '100%', 
        backgroundColor: '#69c5e3',
        alignItems: 'center',
        justifyContent: 'center'
    }
})