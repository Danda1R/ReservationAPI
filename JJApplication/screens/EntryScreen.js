import React, {Component} from 'react';
import {Text,View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';



export default class EntryScreen extends Component{
    constructor () {
        super();
    }

    navigateToLogin=()=>{
        this.props.navigation.replace("Login")
    }
    navigateToRegistration=()=>{
        this.props.navigation.replace("Registration")
    }

    render=()=>{
        return(
            <View style={{backgroundColor:"#DAE", flex:1}}>
                <Image style={{width:hp2dp("32%"), height:hp2dp("32%"), alignSelf:'center', marginTop:hp2dp("22%")}} source={require("../assets/logo.png")}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:45,fontWeight:"bold", marginLeft:wp2dp("20%")}}>juego.</Text>
                    <Text style={{fontSize:45,}}>juegos</Text>
                </View>
                <Text style={{alignSelf:"center", marginTop:hp2dp("10%"), marginBottom:hp2dp("1.5%"), fontSize:20}}>Plan your social life effortlessly</Text>
                <TouchableOpacity style={{backgroundColor:"#000", width:wp2dp("60%"), alignSelf:'center', borderRadius:12}} onPress={this.navigateToRegistration}>
                    <Text style={{color:"#FFF", alignSelf:'center', fontSize:22, margin:5}}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width:wp2dp("60%"), alignSelf:'center', borderRadius:12}} onPress={this.navigateToLogin}>
                    <Text style={{color:"#FFF", alignSelf:'center', fontSize:22, margin:20}}>Log in</Text>
                </TouchableOpacity>
            </View>
        )
    }
}