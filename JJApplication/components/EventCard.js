import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Storage } from "aws-amplify";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";

export default class EventCard extends Component {
  constructor() {
    super();
    //this.onPress = this.onPress.bind(this);
  }

  /**
   *
   * @param {string} value
   *
   * temporary function to load images from local folders, until backend is equiped
   * to handle profile pictures
   */
  getProfileImage = async () => {
    switch (value) {
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
  };

  dateToString = (dateString) => {
    let date = new Date(dateString);
    let merid = date.getHours() > 12 ? "pm" : "am";
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return (
      date.getMonth() +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " - " +
      (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12) +
      ":" +
      minutes +
      " " +
      merid
    );
  };

  render = () => {
    return (
      <TouchableOpacity
        style={{
          shadowColor: "#333",
          shadowOpacity: 0.7,
          shadowRadius: 5,
          shadowOffset: { width: 3, height: 1 },
        }}
        onPress={() => this.props.onPress(this.props.event)}
      >
        <View style={this.props.read ? cardStyle.rviewbox : cardStyle.uviewbox}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={cardStyle.profileImage}
              source={this.getProfileImage(this.props.profileSource)}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={cardStyle.sender}
            >
              {this.props.senderName}
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={cardStyle.event}
            >
              {this.props.eventName}
            </Text>
            <Text numberOfLines={3} ellipsizeMode="tail" style={cardStyle.loc}>
              {this.props.eventLoc}
            </Text>
            <Text style={cardStyle.date}>
              {this.dateToString(this.props.date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const cardStyle = StyleSheet.create({
  rviewbox: {
    marginVertical: hp2dp("1.5%"),
    marginHorizontal: wp2dp("5.5"),
    flexDirection: "row",
    borderWidth: 0,
    borderRadius: 10,
    height: hp2dp("16%"),
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  uviewbox: {
    marginVertical: hp2dp("1.5%"),
    marginHorizontal: wp2dp("5.5"),
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#A3F",
    borderRadius: 10,
    height: hp2dp("16%"),
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  profileImage: {
    height: hp2dp("7.7%"),
    width: hp2dp("7.7%"),
    borderRadius: hp2dp("7.7%"),
    margin: hp2dp("1.5%"),
    borderWidth: 1,
  },
  event: {
    alignSelf: "center",
    marginTop: hp2dp("2%"),
    fontSize: 30,
    width: wp2dp("46%"),
    height: hp2dp("4%"),
  },
  sender: {
    fontSize: 18,
    width: 100,
    height: 20,
  },
  loc: {
    alignSelf: "center",
    marginTop: hp2dp("1.5%"),
    fontSize: 14,
    width: wp2dp("46%"),
    height: hp2dp("4%"),
  },
  date: {
    alignSelf: "center",
    marginTop: hp2dp("0.5%"),
    fontSize: 14,
    width: wp2dp("46%"),
    height: hp2dp("4%"),
  },
});
