import React from "react";
import { Component } from "react";
import {TextInput, StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default class photo_list extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listImage: [],
            access_token: '',
            query: '',
        };
        
        this.getAccessToken()
        this.getListImage();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    getListImage = () => {
            axios.get('https://jsonplaceholder.typicode.com/photos', { headers: {"token" : this.state.access_token} } )
                .then((res) => {this.setState({listImage: res.data })
                               //this.setState({isLoading: false})
                               //console.log(this.state.listImage)
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})
                                   })
    }

    renderItem =({item, index}) => {
        return(
            <TouchableOpacity style={styles.item}
                                onPress={() => {
                                                this.props.navigation.navigate('photo_detail')
                                                AsyncStorage.setItem('idHolding', JSON.stringify(item.id))}}
                               >
                <Image
                    style={styles.image}
                    source={{uri: item.url}}
                    resizeMode='contain'
                    />
                <View style={styles.wrapText}>
                    <Text style={styles.fontSize}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    getSearch= () => {
        var data = this.state.listImage;
        data = data.filter((item) => item.title == this.state.query).map(({url, title}) => ({url, title}));
        console.log(data);
        this.setState({listImage: data})
    }

    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.headingContainer}>
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>List of images</Text>
                </View>

                <View>
                    <View style={styles.searchFiled}>
                        <TextInput style={styles.Input}
                                textAlign= 'left'
                                textAlignVertical='center'
                                placeholder="Find somethings..."
                                onChangeText={(text) => {
                                    this.setState({query: text})
                                }}>
                        </TextInput>
                        <TouchableOpacity style={styles.fieldSearch}
                                            onPress={() => this.getSearch()}>
                            <Image style={styles.isSearch}
                                    source={require('../image/magnifier.png')}/>
                        </TouchableOpacity>
                    </View> 
                </View>

                <SafeAreaView style={styles.listContainer}>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                            data={this.state.listImage}
                            renderItem = {this.renderItem}
                            keyExtractor={item => `key-${item.id}`}         
                            />
                        )
                    }
                </SafeAreaView>

                {/* <Button onPress={()=> {console.log(this.state.access_token)
                                        this.getListImage()}} title="hello"></Button> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },

    headingContainer:{
        backgroundColor: '#E666A4',
        height: '10%',
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchFiled:{
        alignSelf: 'center',
        justifyContent: 'center',
        height: 45,
        width: 200,
        backgroundColor: "#fff",
        elevation: 5,
        marginBottom: 20,
        marginTop: 20, 
        flexDirection: "row",
    },

    Input:{
        width: "80%"
    },

    listContainer:{
            marginTop: 10,
            height: '78%'
    },

    item:{
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 30,
        marginBottom:10
    },

    image: {
        width: 50,
        height: 50, 
        borderRadius: 200
    },

    wrapText:{
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },

    fieldSearch:{
       
        justifyContent :'center',
        alignItems: 'flex-end',
        flex: 1,
        marginRight:  10
    },
   
    isSearch:{
        height: 15,
        width: 15,
        margin: 5,
        tintColor: '#748c94',
    },

})