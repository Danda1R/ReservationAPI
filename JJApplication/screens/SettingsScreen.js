import React, {Component} from 'react';
import {Text,View, Button, FlatList, ScrollView, StyleSheet,Image} from 'react-native';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';
import NavBar from '../components/NavBar';
import { DraxProvider, DraxView } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';

export default class HomeScreen extends Component{
    constructor () {
        super();
        this.state = {
            userID:"",
        }
    }
    componentDidMount(){
        this.loadID()
    }
    logout=()=>{
        this.props.navigation.replace("Entry")
    }

    loadID=()=>{
        const ID=this.props.route.params.userID
        this.setState({userID:ID})
    }
    
    navToSettings=()=>{
        if(this.props.page!="settings")
            this.props.navigation.replace("Settings",{userID:this.state.userID})
    }
    navToHome=()=>{
        if(this.props.page!="home")
            this.props.navigation.replace("Home",{userID:this.state.userID})
    }
    navToFriends=()=>{
        if(this.props.page!="groups")
            this.props.navigation.replace("Groups",{userID:this.state.userID})
    }

    render = () =>{
        console.log("s",this.state.userID)
        return(
            <>
            <View style={styles.containerView}>
            <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3.5%")}}>Settings</Text>
                {/**
                <Text style={{fontSize:30, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3.5%")}}>Calendar Settings</Text>
                <Text style={{fontSize:30, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3.5%"), marginBottom:hp2dp("4%")}}>User Profile</Text>**/}
                <SubmitButton title="Logout" onPress={this.logout}/>
            </View>
            <NavBar navigation={this.props.navigation} navToFriends={this.navToFriends} navToHome={this.navToHome}  page="settings"/>
            </>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        marginTop:hp2dp("7%")
    },
});