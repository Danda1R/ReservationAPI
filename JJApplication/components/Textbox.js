import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';

export default class Textbox extends Component {

    static isFocused=false
    constructor () {
        super();
        this.state = {
          isFocused:false,
          value:''
        };
      }

    onFocus=()=>{
        this.setState({isFocused:true});
    }
    onBlur=()=>{
        this.setState({isFocused:false});
        this.props.inputHandler(this.state.value)
    }
    render = () => {
        return(
            <View>
                <Text style={style.label}>{this.props.label}</Text>
                <View style={[style.container,{
                    borderColor: this.props.error ? '#F00': this.state.isFocused ? '#A4F': '#999'
                }]}>
                    <TextInput style={{color:"#000",flex:1, marginHorizontal:wp2dp("2%")}} {...this.props}
                      onFocus={()=>{this.onFocus();}}
                      onBlur={()=>{this.onBlur()}}
                      onChangeText={(value)=>{this.setState({value:(value)})}}
                    />
                </View>
                <Text style={style.errormsg}>{this.props.error}</Text>
            </View>
        );
    }

    
}



const style=StyleSheet.create({
    label:{
        marginVertical:hp2dp("1%"),
        marginHorizontal:wp2dp("3%"),
        fontSize:14,
        color: '#888',
    },
    container:{
        height:hp2dp("6%"),
        backgroundColor:'#EEE',
        flexDirection: "row",
        marginHorizontal:wp2dp("3%"),
        borderWidth:0.5,
        alignItems:'center',
        marginBottom:0
    },
    errormsg:{
        color:"#F00",
        fontSize:12,
        marginTop:hp2dp("1%"),
        marginHorizontal:wp2dp("3%"),
        marginBottom:hp2dp("0.4%")
    }
});
