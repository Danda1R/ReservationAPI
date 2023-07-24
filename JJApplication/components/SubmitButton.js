import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';

export default class SubmitButton extends Component {

    constructor () {
        super();
      }

    render = () =>{
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{backgroundColor:'#A4F',
                            height:hp2dp('6.5%'),
                            flexDirection: "row",
                            marginHorizontal:wp2dp("3%"),
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                    <Text style={{fontSize:14, color:'#FFF',alignItems:'center'}}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}