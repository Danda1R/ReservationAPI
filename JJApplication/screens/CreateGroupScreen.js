import React, {Component,} from 'react';
import {Text, View, Button, FlatList, ScrollView, StyleSheet, Image} from 'react-native';
import SearchBarGroup from '../components/SearchBarGroup';
import GroupCard from '../components/GroupCard';
import SubmitButton from '../components/SubmitButton';
import Textbox from '../components/Textbox';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import NavBar from '../components/NavBar';
import {Users} from "../test_data/UserData"

//Amplify Stuff
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations.js';
import * as queries from '../src/graphql/queries.js';
class GroupScreen extends Component{
    constructor(){
        super();

        this.state = {
            groupname:"",
            groupname_error:"",
            searchVal:"",//search bar text
            allPeople:[],//Mock data entry
            selectedPeople:[],//Selected Group Members
            userID:"",
        };
    }

    componentDidMount(){
        //Set dummy data, this is an array of JS objects
        //this.setState({allPeople:Users});  
        this.loadID()  
    }
    loadID=async()=>{
        const ID=this.props.route.params.userID
        this.setState({userID:ID})
    }
    isIncluded=(entryId)=>{
        //Check if entry id is in the selected people array
       if(!this.state.selectedPeople.find(item => item.id === entryId)){
            return false;
       }
       return true;

    }

    updateSearchValue = async (value) =>{
        //Updates text inside search bar text box
        this.setState({searchVal:value});
        if(value===""){
            this.setState({allPeople:[]});
            return;
        }

        try{
            //Get the info TODO change eq
            const retObjs = await API.graphql({
                query: queries.listUsers,
                variables: {filter: {username: {contains: value}, and: {not: {id: {eq: this.state.userID}}}}, limit: 15}
              });
              console.log(this.state.userID)
            //console.log(retObjs.data.listUsers.items);
            this.setState({allPeople:retObjs.data.listUsers.items});//TODO: update to fetched data
            //console.log(retObjs.data.listUsers.items);
        } catch (error){
            console.log("Error retrieving data");
        }
    }

    filterArray = (arr) => {  
        //Filter items of passed array
        //WE DONT NEED THIS ANYMORE BECAUSE WE ARE MAKING THE COMPARISON ON THE QUERY
        return arr.filter(item => item.username.toLowerCase().includes(this.state.searchVal.toLowerCase()));
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

    modifyFromGroup=(entry)=>{
        //Add entry to group state array if id not within objects
        if(!this.isIncluded(entry.id)){
            this.setState({selectedPeople:[...this.state.selectedPeople, entry]});
        }
        else{
            this.setState({selectedPeople:this.state.selectedPeople.filter(person => person.id !== entry.id)});
        }
    }

    onCardTouch=(item)=>{
        //Used when group card is pressed
        //Can be added with further functionality
        this.modifyFromGroup(item);
        this.setState({searchVal:""})
    }

    submitGroup= async ()=>{
        //When submit button is pressed
        await this.checkError()

        /*
        switch(memberIds){
            case "":
                //console.log(this.state.groupname_error)
                alert("No People in group");
                break;
            default:
                if(this.state.groupname_error){
                //console.log(this.state.groupname_error)
                break;
                }
                alert(memberIds);
                this.props.navigation.replace("Home")
        }
        */
       if(this.state.selectedPeople.length > 0){
        //CREATE GROUP
        try{
            //Add a new group into the group table
            const details = 
            {
              title: this.state.groupname,
              numMembers: this.state.selectedPeople.length,
              creatorid: this.state.userID,
            };
            const newGroup = await API.graphql({
              query: mutations.createGroup,
              variables: {input: details}
            });

            //OTHER QUERY
            let arrlength = this.state.selectedPeople.length;
            //console.log("PROM: ", newGroup.data.createGroup.id);
            //console.log("PROM: ", newGroup.data.createGroup.id);
            for(var i=0;i<arrlength;++i){
                    const details2 = 
                {
                    userId:this.state.selectedPeople[i].id,
                    groupId:newGroup.data.createGroup.id,//Required
                };
                const newGroupUser = await API.graphql({
                query: mutations.createGroupUser,
                variables: {input: details2}
                });
            }
            this.props.navigation.replace("Home",{userID:this.state.userID});
        } catch (error){
            console.log("Error: ", error);
        }
       }else{
        alert("Group is Empty");
       }
    }

    itemRender = (item) =>{
        //Used to render the group cards when inputting text in the search bar
        return(
            <GroupCard style = {{width:wp2dp("98%")}} key={item.id} profileSource={item.userimage} username={item.username} onPress={() => {this.onCardTouch(item)}} selected={this.isIncluded(item.id)}/>
        );
    }
    checkError=()=>{
        if(this.state.groupname===""){
            this.setState({groupname_error:"invalid group name"});
        }
        else{
            this.setState({groupname_error:""});
        }
    }
    setGroupName=(value)=>{
        this.setState({groupname:value});
    }

    summaryRender = () => {
        //Used to render a summary of all the selected group cards. Empty if none are selected
        return(
            <View style={{flex:1}}>
                <Text style={groupStyles.tempText}>GROUP SUMMARY</Text>
                <ScrollView style={{flex:1}}>
                    {
                        this.state.selectedPeople.map((person) => <GroupCard style = {{width:wp2dp("100%")}} key={person.id} profileSource={person.userimage} username={person.username} onPress={() => {this.onCardTouch(person)}} selected={this.isIncluded(person.id)}/>)
                    }
                </ScrollView>
            </View>
        );
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
        console.log("g",this.state.userID)
        return(
            <>
            <View style={groupStyles.generalContainer}>
                <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3.5%"), marginBottom:hp2dp("3%")}}>Create Group</Text>
                <SearchBarGroup value={this.state.searchVal} updateSearchValue={this.updateSearchValue}></SearchBarGroup>
                <ScrollView style={groupStyles.scrollContainer} nestedScrollEnabled={true}>
                    {
                        this.state.searchVal ? this.state.allPeople.map((person) => (this.itemRender(person))) : this.summaryRender()
                    }
                </ScrollView>
                <Textbox style={{width:wp2dp("80%")}} label="Group Name" placeholder="Enter Group Name" error={this.state.groupname_error} inputHandler={this.setGroupName}></Textbox>
                <View style={groupStyles.button}>
                <SubmitButton title="CREATE GROUP" onPress={this.submitGroup}></SubmitButton>
                </View>
            </View>
            <NavBar navigation={this.props.navigation}  navToHome={this.navToHome} navToSettings={this.navToSettings} page="group"/>
            </>
        );
    }
}

export default GroupScreen;

const groupStyles = StyleSheet.create({
    generalContainer:{
        flex:1,
        paddingTop:hp2dp("10%")
    },
    tempText:{
        height:hp2dp("5%"),
        fontSize:30,
        color:"#808080",
        alignSelf:'center',
        justifyContent:'center',
    },
    scrollContainer:{
        height:hp2dp("56%"),
        width:wp2dp("100%"),
    },
    button:{
        width:wp2dp("50%"),
        height:hp2dp("10%"),
        alignSelf:'center',
        alignContent:'center',
        justifyContent:'center',
    },
})