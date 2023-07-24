import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'

export default class NavBar extends Component{

    constructor(){
        super();
        this.state={
            userID:""
        }
    }
    render=()=>{
        return(
            <View style={styles.container} >
            <TouchableOpacity onPress={this.props.navToFriends}>
                <FontAwesomeIcon icon={faUserGroup} style={styles.icon} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navToHome}>
                <FontAwesomeIcon icon={faHouse} style={styles.icon} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navToSettings}>
                <FontAwesomeIcon icon={faGear} style={styles.icon} size={40} />
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:"#A3F",
        height:hp2dp("10%"),
        alignContent:"center",
        justifyContent:"space-evenly",
    },
    icon:{
        color:"#FFF",
        marginTop:hp2dp("1.5%")
    }
})