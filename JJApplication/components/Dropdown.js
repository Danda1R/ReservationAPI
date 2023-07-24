import React, {Component} from 'react';
import {Text,View, ScrollView, StyleSheet,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';

export default class Dropdown extends Component{
    constructor () {
        super();
        this.state = {
            isDropped:false,
            label:"Select A Group...",
            value:"",
            groups:[]
        }
    }
    componentDidMount=()=>{
    }
    dropToggle=()=>{
        this.setState({groups:this.props.data})
        console.log(this.state.groups)
        isDroppedNew=!this.state.isDropped
        this.setState({isDropped:isDroppedNew})
        
    }
    handleSelection=(group)=>{
        this.setState({label:group.label,value:group.value,isDropped:false})
        this.props.selecttionHandler(group.value)
    }
    render(){
        
        return(
            <View>
                <TouchableOpacity style={dropstyle.DropdownBox} onPress={this.dropToggle}>
                    <Text style={dropstyle.label}>{this.state.label}</Text>
                </TouchableOpacity>
                <ScrollView>
                {this.state.groups.map((group) => this.state.isDropped?
                    <TouchableOpacity style={dropstyle.DropdownItem} key={group.value} onPress={e=>{this.handleSelection(group)}}>
                        <Text style={dropstyle.itemlabel} key={group.value}>{group.label}</Text>
                    </TouchableOpacity>:null)}
                </ScrollView>
                <Text style={dropstyle.errormsg}>{this.props.error}</Text>
            </View>
        )
    }
}

const dropstyle = StyleSheet.create({
    label:{
        marginVertical:hp2dp("1%"),
        marginHorizontal:wp2dp("3%"),
        fontSize:14,
        color: '#888',
    },
    DropdownBox:{
        height:hp2dp("6%"),
        backgroundColor:'#EEE',
        flexDirection: "row",
        marginHorizontal:wp2dp("3%"),
        borderWidth:0.5,
        borderColor:"#777",
        alignItems:'center',
        marginBottom:0
    },
    errormsg:{
        color:"#F00",
        fontSize:12,
        marginTop:hp2dp("1%"),
        marginHorizontal:wp2dp("3%"),
        marginBottom:hp2dp("0.4%")
    },
    DropdownItem:{
        height:hp2dp("6%"),
        backgroundColor:'#EEE',
        flexDirection: "row",
        marginHorizontal:wp2dp("3%"),
        borderColor:"#777",
        alignItems:'center',
        marginBottom:0
    },
    itemlabel:{
        marginVertical:hp2dp("0.5%"),
        marginHorizontal:wp2dp("3%"),
        fontSize:14,
        color: '#888',
    },
})