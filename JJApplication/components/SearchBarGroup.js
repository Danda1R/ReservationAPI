import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ResponseCard from '../components/ResponseCard';
import { TextInput } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';

export default class SearchBarGroup extends Component {
    constructor () {
        super();

      }

    render = () =>{
        return(
            <View style={{alignSelf:'center'}}>
                <TextInput 
                    style={barStyles.searchContainer} 
                    placeholder='Search Person' 
                    textAlign='left'
                    onChangeText = {(searchInput) => this.props.updateSearchValue(searchInput)}
                    value= {this.props.value}
                />
            </View>
        );
    }
}

const barStyles = StyleSheet.create({
    searchContainer:{
        borderWidth:1,
        width:wp2dp("98%"),
        height:hp2dp("5%"),
        alignSelf:'center',
        backgroundColor:"#FFFFFF",
        padding:10,
        marginBottom:hp2dp("1%")
    },
})
