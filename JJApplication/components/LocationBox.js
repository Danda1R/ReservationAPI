import React, {Component, createRef } from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp2dp,heightPercentageToDP as hp2dp,} from 'react-native-responsive-screen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCDGaeai0krUCW43msI58EnJRthCoziFIk';

export default class LocationBox extends Component {

    static isFocused=false
    constructor () {
        super();
        this.state = {
          isFocused:false,
          value:''
        };

        this.eventLocationRef = createRef();
      }

    onFocus=()=>{
        this.setState({isFocused:true});
    }
    onBlur=()=>{
        this.setState({isFocused:false});
        this.props.inputHandler(this.state.value)
    }
    onChangeText=(value)=>{
        this.setState({value:(value)})
        
    }
    render = () => {
        return(
            <View>
                <Text style={style.label}>{this.props.label}</Text>
                <View style={[style.container,{
                    borderColor: this.props.error ? '#F00': this.state.isFocused ? '#A4F': '#999'
                }]}>
                    <GooglePlacesAutocomplete
                        ref={this.eventLocationRef}
                        placeholder="Event Location"
                        onPress={(data, details = null) => {
                            this.setState({value:data.description})
                            this.props.inputHandler(this.state.value)
                        }}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en',
                        }}
                        styles={{
                            container: { flex: 1 },
                            textInputContainer: { backgroundColor: '#EEE', borderTopWidth: 0, borderBottomWidth: 0, height:hp2dp("6%")},
                            textInput: {backgroundColor: '#EEE', marginLeft: 0, marginRight: 0, height: 40, color: '#5d5d5d', fontSize: 16, alignSelf:"center" },
                            predefinedPlacesDescription: { color: '#1faadb' },
                        }}
                        fetchDetails={true}
                        textInputProps={{
                            onFocus: this.onFocus,
                            onBlur: this.onBlur,
                            onChangeText: this.onChangeText
                        }}
                        listViewDisplayed={false}
                        enablePoweredByContainer={false}
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
        height: "auto",
        backgroundColor:'#EEE',
        flexDirection: "row",
        marginHorizontal:wp2dp("3%"),
        borderWidth:0.5,
        alignItems:'center',
        marginBottom:0,
        
    },
    errormsg:{
        color:"#F00",
        fontSize:12,
        marginTop:hp2dp("1%"),
        marginHorizontal:wp2dp("3%"),
        marginBottom:hp2dp("0.4%")
    }
});
