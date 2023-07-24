import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';

export default class ResponseImage extends Component{
    constructor(){
        super();
    }

    //Temporary until db retrieval is here
    getProfileImage=(value)=>{
        switch(value){
            case "red":
                return require("../assets/redman.png");
            case "orange":
                return require("../assets/orangeman.png");
            case "yellow":
                return require("../assets/yellowman.png");
            case "green":
                return require("../assets/greenman.png");
            case "blue":
                return require("../assets/blueman.png");
            case "purple":
                return require("../assets/purpleman.png");
            default:
                return require("../assets/purpleman.png");
        }
    }

    //Determine border of component
    borderResponse=(response)=>{
        switch(response){
            case "accept":
                return "#3D3";
            case "reject":
                return "#F44";
            case "pending":
                return "#FF4";
            default:
                return "#FF4";
        }

    }

    render = () =>{
        return(
            <View style={[cardStyle.IconContainer, {backgroundColor:this.borderResponse(this.props.response)}]}>
                <Image style={[cardStyle.profileIcon]} source={this.getProfileImage(this.props.profileSource)}/>
            </View>
        );
    }
}

const cardStyle = StyleSheet.create({
    profileIcon:{
        height:wp2dp("21%"),
        width:wp2dp("21%"),
        borderRadius:wp2dp("21%"),
        borderWidth:1,
        borderColor:"#000",
        alignSelf:"center"
    },
    IconContainer:{
        height:wp2dp("23%"),
        width:wp2dp("23%"),
        borderRadius:wp2dp("15%"),
        borderWidth:1,
        justifyContent:'center',
        shadowColor:"#333",shadowOpacity:0.7,shadowRadius:5,shadowOffset:{width:3,height:1}
        
    }
})