import React, {Component} from 'react';
import {Text,View, TouchableOpacity, FlatList, ScrollView, StyleSheet,Image} from 'react-native';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';
import ResponseCard from '../components/ResponseCard';
import ResponseImage from '../components/ResponseImage';
import CalendarButton from '../components/CalendarButton';
import NavBar from '../components/NavBar';
import { DraxProvider, DraxView } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';
import {Events} from "../test_data/EventData"
import {RSVPs} from "../test_data/RSVPData"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate'

//Amplify Stuff
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations.js';
import * as queries from '../src/graphql/queries.js';

export default class EventResponderScreen extends Component{
    constructor () {
        super();
        //
        this.state = {
            status:3,
            username:"",
            userID:"",
            rsvpID:"",

            isHost:true,
            hostName:"",//event.organizer,
            hostImage:"",//event.organizer_profile,

            eventName:"",//event.title,
            startDate:"", //event.start_datetime,
            endDate:"", //event.end_datetime,
            eventLoc:"",//event.address,
            eventID:"",

            canScroll:true,

            eventInfo:"",
            guests:[],
        }
    }

    componentDidMount=async()=>{
        //Typically used for data fetching of API
        //called when component is added or mounted to the screen
        //Filled with example data for now
        //this.setState({eventInfo:JSON.parse('{"eventName":"Tennis Match", "startDate":"Fri Jun 30 2023 16:30:00 GMT-0400", "endDate":"Fri Jun 30 2023 19:00:00 GMT-0400", "eventLoc":"123 Common Place, Springfield, Oregon, 12345", "organizerid":"1"}')});
        //this.setState({guests:RSVPs});
        await this.loadID()
        await this.loadEvent();
        this.loadUserRsvps()
    }
    loadID=()=>{
        const ID=this.props.route.params.userID
        this.setState({userID:ID})
    }

    loadUserRsvps=async()=>{
        try{
            var guests=[]
            console.log(this.state.eventID)
            const rsvps= await API.graphql(graphqlOperation(`query MyQuery {
                rsvpsByEventid(eventid: "`+this.state.eventId+`", filter: {userid: {ne: "`+this.userID+`"}}) {
                items {
                    user {
                    username
                    id
                    }
                    status
                }
                }
            }`))
            console.log("Querry return",rsvps)
            for(var i=0;i<rsvps.data.rsvpsByEventid.items.length;++i){
                guest={
                    id:rsvps.data.rsvpsByEventid.items[i].user.id,
                    username:rsvps.data.rsvpsByEventid.items[i].user.username,
                    profilePic:"",
                    response:rsvps.data.rsvpsByEventid.items[i].status
                    }
                if(guest.id==this.state.userID){
                    this.setState({status:guest.response})
                }else{
                    guests.push(guest)
                }
                
            }
            this.setState({guests:guests})
        } catch(error){
            console.log("error", error)
        }
    }

    dateToString = (dateString) =>{
        let date = new Date(dateString)
        let merid=(date.getHours()>12? "pm":"am")
        let minutes = (date.getMinutes()<10? "0"+date.getMinutes():date.getMinutes())
        return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()+" - "+(date.getHours()%12==0?12:date.getHours()%12)+":"+minutes+" "+merid
    }

    changeViewScroll=(value)=>{
        //Used to turn on/off PagerView scroll functionality
        this.setState({canScroll:value});
    }

    determineHost=(hostID,userID)=>{
        //Compares passed IDs, returns answer accordingly
        if(hostID == userID){
            return true;
        }
        return false;
    }
    getEventData=()=>{
        return {
            title:this.state.eventName,
            startDate: new Date(this.state.startDate),
            endDate: new Date(this.state.endDate),
            location: this.state.eventLoc,
        }
    }
    loadEvent=async()=>{
        const event= this.props.route.params.event
        if(event.ismine){
            this.setState({
                hostName:event.organizer,
                hostImage:event.organizer_profile,
                rsvpID:"",
                eventName:event.title,
                startDate:event.start_datetime,
                endDate:event.end_datetime,
                eventLoc:event.address,

                isHost:event.ismine,
                eventId:event.id
            })
        }else{
            const myRsvp = await API.graphql(graphqlOperation(`query MyQuery {
                rsvpsByEventid(eventid: "`+event.id+`", filter: {userid: {eq: "`+this.props.route.params.userID+`"}}) {
                items {
                    id
                }
                }
            }`))
            console.log(event)
            this.setState({
                hostName:event.organizer,
                hostImage:event.organizer_profile,
                rsvpID:myRsvp.data.rsvpsByEventid.items[0].id,
                eventName:event.title,
                startDate:event.start_datetime,
                endDate:event.end_datetime,
                eventLoc:event.address,

                isHost:event.ismine,
                eventId:event.id
            })
        }
    }

    updateRSVP=async (value)=>{
        switch(value){
            case "pending":
                stat=3
                break
            case "accept":
                stat=1
                break
            case "reject":
                stat=2
                break
            default:
                stat=3
                break
        }
        this.setState({status:stat})
        console.log("ID",this.state.rsvpID)
        const myRsvp=await API.graphql(graphqlOperation(`query MyQuery {
            getRsvp(id: "`+this.state.rsvpID+`") {
              _version
            }
          }`))
        console.log("ID",this.state.rsvpID)
        console.log("version",myRsvp.data.getRsvp._version)
       
          const updatedRSVP= await API.graphql({
            query: mutations.updateRsvp,
            variables: {input:{id:this.state.rsvpID,status:stat,_version:myRsvp.data.getRsvp._version}}
          })
    }
    setScroll=(val)=>{
        this.setState({canScroll:val})
    }

    render = () =>{
        return(
            <>
            <PagerView style={{flex:1}} initialPage={0} scrollEnabled={this.state.canScroll}>
                <View key="1" style={{backgroundColor:"#FFF"}}>
                    <Image source={require("../assets/beach.png")} style={{height:hp2dp("20%")}} />
                    
                    <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%")}}>{this.state.eventName}</Text>
                    <View style={{flexDirection:'row', marginTop:hp2dp("3%"),justifyContent:"center"}}>
                        <Image source={require("../assets/blueman.png")} style={{height:hp2dp("8%"),width:hp2dp("8%"),borderRadius:hp2dp("8%"), borderWidth:1}}/>
                        <Text style={{fontSize:20, fontWeight:'bold',alignSelf:'center',marginHorizontal:hp2dp("1.5%")}}>{this.state.hostName}</Text>
                    </View>
                    <Text numberOfLines={2}  style={{fontSize:20, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%"),marginHorizontal:wp2dp("7%")}}>{this.state.eventLoc}</Text>
                    <Text style={{fontSize:20, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%")}}>Start: {this.dateToString(this.state.startDate)}</Text>
                    <Text style={{fontSize:20, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%")}}>End: {this.dateToString(this.state.endDate)}</Text>
                    <View style={{marginTop:hp2dp("4%"), marginHorizontal:wp2dp("33%")}}>{false?<SubmitButton title="Edit Event"/>:null}</View>
                </View>
                <View key="2">
                    <GestureHandlerRootView style={{flex: 1}}>
                        <DraxProvider style={{backgroundColor:"#FFF", flex:1, }}>
                        
                            <Text style={{fontSize:45, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%")}}>Event Response</Text>
                            <TouchableOpacity style={{flexDirection:"row",backgroundColor:"#A3F",marginTop:wp2dp("2%"),borderRadius:hp2dp("3%"), padding:hp2dp("1%"),width:wp2dp("60%"),justifyContent:"center", alignSelf:"center"}} onPress={this.loadUserRsvps}>
                                        <Text style={{color:"#FFF", fontSize:24, marginHorizontal:wp2dp("5%")}}>Refresh</Text>
                                        <FontAwesomeIcon icon={faRotate} style={{color:"#FFF"}} size={30} />
                            </TouchableOpacity>
                            {this.state.isHost?<View style={{marginVertical:hp2dp("2%")}}></View>:
                                <DraxView style={styles.receiver} 
                                    renderContent={() => (
                                        <ResponseCard isUsers={true} isHost={this.determineHost(this.state.eventInfo.organizerid, "31")} profileSource="yellow" username="This User" responseSource={this.state.status}/>
                                    )}
                                    onReceiveDragDrop={({ dragged: { payload } }) => {
                                        console.log(`received ${payload}`);
                                        this.changeViewScroll(true);
                                        this.setState({response:payload})
                                        this.updateRSVP(payload)
                                        this.setScroll(true)
                                }}/>}
                            
                            <ScrollView style={{maxHeight:hp2dp("53%")}}>
                            {this.state.guests.map((guest) => <ResponseCard isHost={this.determineHost(this.state.eventInfo.organizerid, guest.id)} key={guest.id} profileSource={guest.profilePic} username={guest.username} responseSource={guest.response}/>)}
                            </ScrollView>
                            
                            {this.state.isHost?<></>:
                                <View style={styles.container}>
                                    <DraxView
                                        style={styles.draggable}
                                        renderContent={() => (
                                            <Image style={{height:hp2dp("7.7%"),width:hp2dp("7.7%"),borderRadius:hp2dp("7.7%"),borderWidth:1}} source={require("../assets/accept.png")}/>
                                        )}
                                        onDragStart={() => {
                                            console.log('start drag');
                                            this.setScroll(false)
                                        }}
                                        onDragEnd={()=>{
                                            this.setScroll(true)
                                        }}
                                        payload="accept"
                                    />
                                    <DraxView
                                        style={styles.draggable}
                                        renderContent={() => (
                                            <Image style={{height:hp2dp("7.7%"),width:hp2dp("7.7%"),borderRadius:hp2dp("7.7%"),borderWidth:1}} source={require("../assets/reject.png")}/>
                                        )}
                                        onDragStart={() => {
                                            console.log('start drag');
                                            this.setScroll(false)
                                        }}
                                        onDragEnd={()=>{
                                            this.setScroll(true)
                                        }}
                                        payload="reject"
                                    />
                                    <DraxView
                                        style={styles.draggable}
                                        renderContent={() => (
                                            <Image style={{height:hp2dp("7.7%"),width:hp2dp("7.7%"),borderRadius:hp2dp("7.7%"),borderWidth:1}} source={require("../assets/pending.png")}/>
                                        )}
                                        onDragStart={() => {
                                            console.log('start drag');
                                            this.setScroll(false)
                                        }}
                                        onDragEnd={()=>{
                                            this.setScroll(true)
                                        }}
                                        payload="pending"
                                    />
                                    
                            </View>}
                        </DraxProvider>
                    </GestureHandlerRootView>
                </View>
                <View key="3" style={{backgroundColor:"#FFF"}}>
                    <Text style={{fontSize:35, fontWeight:'bold',alignSelf:'center',marginTop:hp2dp("3%")}}>Responses Summary</Text>
                    <View style={{marginVertical:hp2dp("1.5%"),}}>
                        {/**
                            TODO: Add Calendar Functionality to onPress of submitButton Below
                        **/}
                        <CalendarButton isResponseScreen={true} eventData={this.getEventData()} />
                    </View>
                    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContentContainer}>
                        {
                            this.state.guests.map((guest) => <ResponseImage key={guest.id} response={guest.response} profileSource={guest.profilePic}/>)    
                        }
                    </ScrollView>
                </View>
            </PagerView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth:1,
        shadowColor:"#333",shadowOpacity:0.7,shadowRadius:5,shadowOffset:{width:3,height:1}
    },
    draggable: {
        marginHorizontal:wp2dp("4%")
    },
    scrollViewContainer:{
        flex:1,
    },
    scrollViewContentContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        alignItems:'center',
        padding:wp2dp("1%"),
        gap:hp2dp("1%"),
    },
});