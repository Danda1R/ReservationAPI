import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import { faPlus,faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default class GroupCard extends Component {

    constructor () {
        super();
      }

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

    selectionBackground=(value)=>{
        //Changes background according to value
        if(value){
            return "#BA4FBE";//Purple
        }
        return "#FFFFFF";//White
    }

    render = () =>{
        return(
            <View style={{shadowColor:"#333",shadowOpacity:0.7,shadowRadius:5,shadowOffset:{width:3,height:1}}}>
                <View style={this.props.isUsers? cardStyle.uviewbox : cardStyle.viewbox}  >
                    <Image style={cardStyle.profileImage} source={this.getProfileImage(this.props.profileSource)}/>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={cardStyle.username}>{this.props.username}</Text>
                    <TouchableOpacity style={cardStyle.icon} onPress={this.props.onPress}>
                    {
                        !this.props.selected?<FontAwesomeIcon icon={faPlus} size={35} style={{color:"#2D2"}}/>:<FontAwesomeIcon icon={faTrash} size={35} style={{color:"#D22"}}/>
                    }
                        
                    </TouchableOpacity>
                </View>
            </View>
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
        width:wp2dp("98%"),
        alignContent:'center',
        justifyContent:"center",
        backgroundColor:"#FFF",
    },
    profileImage:{
        height:hp2dp("7.7%"),
        width:hp2dp("7.7%"),
        borderRadius:hp2dp("7.7%"),
        margin:hp2dp("1.5%"),
        marginRight:hp2dp("3.2%"),
        borderWidth:1
    },
    username:{
        alignSelf:'center',
        fontSize:30,
        width:wp2dp("50%"),
        height:hp2dp("7"),
        marginTop:hp2dp("2")
    },
    icon:{
        alignSelf:'center'
    },
})