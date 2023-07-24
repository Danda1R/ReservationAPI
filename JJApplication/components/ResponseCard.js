import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';


export default class ResponseCard extends Component {

    constructor () {
        super();
        
      }
      /**
       * 
       * @param {string} value 
       * 
       * temporary function to load images from local folders, until backend is equiped
       * to handle profile pictures
       */
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
    /**
       * 
       * @param {string} value 
       * 
       * temporary function to load images from local folders, until backend is equiped
       * to handle response pictures
       */
    getResponseImage=(value)=>{
        switch(value){
            case 1:
                return require("../assets/accept.png");
            case 2:
                return require("../assets/reject.png");
            case 3:
                return require("../assets/pending.png");
            default:
                return require("../assets/pending.png");
        }

    }
    render = () =>{
        return(
            <TouchableOpacity style={{shadowColor:"#333",shadowOpacity:0.7,shadowRadius:5,shadowOffset:{width:3,height:1}}} onPress={this.props.onPress}>
                <View style={this.props.isUsers? cardStyle.uviewbox : cardStyle.viewbox}>
                    <Image style={cardStyle.profileImage} source={this.getProfileImage(this.props.profileSource)}/>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={cardStyle.username}>{this.props.username}</Text>
                    <Image style={cardStyle.responseImage} source={this.getResponseImage(this.props.responseSource)}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const cardStyle = StyleSheet.create({
    viewbox:{
        marginVertical:hp2dp("1%"),
        marginHorizontal:wp2dp("1%"),
        flexDirection:'row',
        borderWidth:0,
        borderRadius:10,
        height:hp2dp("11%"),
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:"#FFF",
    },
    uviewbox:{
        marginVertical:hp2dp("2%"),
        marginHorizontal:wp2dp("1%"),
        flexDirection:'row',
        borderWidth:2,
        borderColor:"#A3F",
        borderRadius:10,
        height:hp2dp("11%"),
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:"#FFF",
    },
    profileImage:{
        height:hp2dp("7.7%"),
        width:hp2dp("7.7%"),
        borderRadius:hp2dp("7.7%"),
        margin:hp2dp("1.5%"),
        borderWidth:1
    },
    username:{
        alignSelf:'center',
        fontSize:30,
        width:wp2dp("50%"),
        height:hp2dp("7"),
        marginTop:hp2dp("2")
    },
    responseImage:{
        height:hp2dp("7.7%"),
        width:hp2dp("7.7%"),
        borderRadius:hp2dp("7.7%"),
        margin:hp2dp("1.5%"),
        borderWidth:1
    },
})

