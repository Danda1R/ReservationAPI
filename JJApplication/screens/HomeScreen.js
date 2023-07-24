import React, {Component} from 'react';
import {Text,View, Button} from 'react-native';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';
import NavBar from '../components/NavBar';
import EventCard from '../components/EventCard';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';
import {Events} from "../test_data/EventData"

//Amplify Stuff
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations.js';
import * as queries from '../src/graphql/queries.js';

export default class HomeScreen extends Component{
    constructor () {
        
        super();
        this.state={
            read_events:[],
            unread_events:[],
            my_events:[],
            userID:"",
            events:[]
        }
    }
    loadEvent=(clicked_event)=>{
        this.props.navigation.navigate("Event Response",{
            event:clicked_event,
            userID:this.state.userID
        })
    }

    loadID=()=>{
        const ID=this.props.route.params.userID
        this.setState({userID:ID})
    }

    componentDidMount=async ()=>{
        //this.setState({events:Events})
        await this.loadID()
        this.getEvents()
        console.log(this.state.userID)
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

    getEvents= async ()=>{
        var event_arr=[]
        try{
            const rsvps = await API.graphql(graphqlOperation(`query MyQuery {
                rsvpsByUserid(userid: "`+this.state.userID+`") {
                  items {
                    event {
                        end_datetime
                        start_datetime
                        title
                        address
                        organizerid
                    }
                    eventid
                    id
                    status
                  }
                }
              }`));
            
           
            //loads event ids into read array and unread array
            for(var i=0;i<rsvps.data.rsvpsByUserid.items.length;++i){
                const organizer = await API.graphql(graphqlOperation(`query MyQuery {
                    getUser(id: "`+rsvps.data.rsvpsByUserid.items[i].event.organizerid+`") {
                      username
                    }
                  }`))
                
                if(rsvps.data.rsvpsByUserid.items[i].status==3){
                    var event={
                        id:rsvps.data.rsvpsByUserid.items[i].eventid,
                        title: rsvps.data.rsvpsByUserid.items[i].event.title,
                        address: rsvps.data.rsvpsByUserid.items[i].event.address,
                        start_datetime: rsvps.data.rsvpsByUserid.items[i].event.start_datetime,
                        end_datetime: rsvps.data.rsvpsByUserid.items[i].event.end_datetime,
                        organizer: organizer.data.getUser.username,
                        organizer_profile:"",
                        read:false,
                        ismine:false,
                    }
                    event_arr.push(event)
                }else{
                    var event={
                        id:rsvps.data.rsvpsByUserid.items[i].eventid,
                        title: rsvps.data.rsvpsByUserid.items[i].event.title,
                        address: rsvps.data.rsvpsByUserid.items[i].event.address,
                        start_datetime: rsvps.data.rsvpsByUserid.items[i].event.start_datetime,
                        end_datetime: rsvps.data.rsvpsByUserid.items[i].event.end_datetime,
                        organizer: organizer.data.getUser.username,
                        organizer_profile:"",
                        read:true,
                        ismine:false,
                    }
                    event_arr.push(event)
                }
            }

            const myEvents =  await API.graphql(graphqlOperation(`query MyQuery {
                listEvents(filter: {organizerid: {eq: "`+this.state.userID+`"}}) {
                  items {
                    address
                    title
                    start_datetime
                    end_datetime
                    id
                  }
                }
              }`))
            for(var i=0;i<myEvents.data.listEvents.items.length;++i){
                const organizer = await API.graphql(graphqlOperation(`query MyQuery {
                    getUser(id: "`+this.state.userID+`") {
                      username
                    }
                  }`))
                var event={
                    id:myEvents.data.listEvents.items[i].id,
                    title: myEvents.data.listEvents.items[i].title,
                    address: myEvents.data.listEvents.items[i].address,
                    start_datetime: myEvents.data.listEvents.items[i].start_datetime,
                    end_datetime: myEvents.data.listEvents.items[i].end_datetime,
                    organizer: organizer.data.getUser.username,
                    organizer_profile:"",
                    read:true,
                    ismine:true,
                }
                event_arr.push(event)
            }


            
            this.setState({events:event_arr})
        }catch(error){
            console.log("error",error)
        }
        
        

        


    }

    render = () =>{
        return(
            <>
            <PagerView style={{flex:1, marginTop:hp2dp("7%")}} initialPage={0}>
            <View key="1">
                <ScrollView>
                    <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("2%")}}>Unread</Text>
                    {this.state.events.map((event) => event.read==false?<EventCard key={event.id} event={event} onPress={this.loadEvent} read={false} profileSource={event.organizer_profile} senderName={event.organizer} eventName={event.title} eventLoc={event.address} date={new Date(event.start_datetime)}/>:null)}
                    <View style={{marginTop:hp2dp("5.5")}}/>
                </ScrollView>
                <View style={{flexDirection:'row'}}><View style={{flex:1,backgroundColor:"#2DF",height:3}}/><View style={{flex:1,backgroundColor:"#D67",height:3}}/><View style={{flex:1,backgroundColor:"#D67",height:3}}/></View>
            </View>
            <View key="2">
                <ScrollView>
                    <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("2%")}}>Read</Text>
                    {this.state.events.map((event) => (event.read==true && event.ismine==false)?<EventCard key={event.id} event={event} onPress={this.loadEvent} read={true} profileSource={event.organizer_profile} senderName={event.organizer} eventName={event.title} eventLoc={event.address} date={new Date(event.start_datetime)}/>:null)}
                    <View style={{marginTop:hp2dp("5.5")}}/>
                </ScrollView>
                <View style={{flexDirection:'row'}}><View style={{flex:1,backgroundColor:"#D67",height:3}}/><View style={{flex:1,backgroundColor:"#2DF",height:3}}/><View style={{flex:1,backgroundColor:"#D67",height:3}}/></View>
            </View>
            <View key="3">
                <ScrollView>
                    <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("2%")}}>My Events</Text>
                    {this.state.events.map((event) => (event.read==true && event.ismine==true)?<EventCard key={event.id} event={event} onPress={this.loadEvent} read={true} profileSource={event.organizer_profile} senderName={event.organizer} eventName={event.title} eventLoc={event.address} date={new Date(event.start_datetime)}/>:null)}
                    
                    <View style={{marginTop:hp2dp("5.5")}}/>
                    <SubmitButton title="New Event"  onPress={() => this.props.navigation.navigate('Event Creation',{userID:this.state.userID})}></SubmitButton>
                    <View style={{marginTop:hp2dp("5.5")}}/>
                </ScrollView>
                <View style={{flexDirection:'row'}}><View style={{flex:1,backgroundColor:"#D67",height:3}}/><View style={{flex:1,backgroundColor:"#D67",height:3}}/><View style={{flex:1,backgroundColor:"#2DF",height:3}}/></View>
            </View>
            </PagerView>
            <NavBar navigation={this.props.navigation} navToFriends={this.navToFriends}  navToSettings={this.navToSettings} page="home"/>
            </>
        )
    }
}