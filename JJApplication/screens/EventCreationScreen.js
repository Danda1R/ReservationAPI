import React, { Component } from "react";
import { Text, View, FlatList, Platform, TouchableOpacity } from "react-native";
import Textbox from "../components/Textbox";
import SubmitButton from "../components/SubmitButton";
import LocationBox from "../components/LocationBox";
import Dropdown from "../components/Dropdown";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
//import {Dropdown} from 'react-native-material-dropdown-v2';

//Amplify Stuff
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../src/graphql/mutations.js";
import * as queries from "../src/graphql/queries.js";

class EventCreationScreen extends Component {
  constructor() {
    super();
    this.setEventName = this.setEventName.bind(this);
    this.setEventLocation = this.setEventLocation.bind(this);
    this.setEventDate = this.setEventDate.bind(this);
    this.setEventTime = this.setEventTime.bind(this);
    this.setEventEndDate = this.setEventEndDate.bind(this);
    this.setEventEndTime = this.setEventEndTime.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.state = {
      event_name: "",
      event_loc: "",
      event_date: new Date(),
      event_end_date: new Date(),

      android_datepicker_hidden: true,
      android_timepicker_hidden: true,

      event_name_error: "",
      event_loc_error: "",
      event_date_error: "",

      reservationID: 0,

      group: "",
      group_error: "",
      groups: [],
    };
  }
  componentDidMount = async () => {
    await this.loadID();
    await this.fetchGroups();
  };
  loadID = () => {
    const ID = this.props.route.params.userID;
    this.setState({ userID: ID });
  };
  fetchGroups = async () => {
    const groups = await API.graphql({
      query: queries.listGroups,
      variables: { filter: { creatorid: { eq: this.state.userID } } },
    });
    var group_arr = [];
    groups.data.listGroups.items.forEach((element) =>
      group_arr.push({ label: element.title, value: element.id })
    );
    this.setState({ groups: group_arr });
    console.log(this.state.groups);
  };
  setEventName(value) {
    this.setState({ event_name: value });
  }
  setEventLocation(value) {
    this.setState({ event_loc: value });
  }
  setEventDate(picker, value) {
    this.setState({ event_date: value, android_datepicker_hidden: true });
  }
  setEventTime(picker, value) {
    this.state.event_date.setTime(value.getTime());
    this.setState({ android_timepicker_hidden: true });
  }
  setEventEndDate(picker, value) {
    this.setState({ event_end_date: value, android_datepicker_hidden: true });
  }
  setEventEndTime(picker, value) {
    this.state.event_end_date.setTime(value.getTime());
    this.setState({ android_timepicker_hidden: true });
  }

  setError() {
    if (!this.state.event_name) {
      this.setState({ event_name_error: "invalid event name" });
    } else {
      this.setState({ event_name_error: "" });
    }

    if (!this.state.event_loc) {
      this.setState({ event_loc_error: "invalid event location" });
    } else {
      this.setState({ event_loc_error: "" });
    }
    if (!this.state.event_loc) {
      this.setState({ event_loc_error: "invalid event location" });
    } else {
      this.setState({ event_loc_error: "" });
    }
    if (!this.state.group) {
      this.setState({ group_error: "must select group" });
    } else {
      this.setState({ group_error: "" });
    }
  }
  checkError = async () => {
    if (
      !this.state.event_date_error &&
      !this.state.event_loc_error &&
      !this.state.event_name_error &&
      !this.state.group_error
    ) {
      try {
        //Add a new group into the group table
        const group = await API.graphql({
          query: queries.listGroupUsers,
          variables: { filter: { groupId: { eq: this.state.group } } },
        });

        const details = {
          title: this.state.event_name,
          address: this.state.event_loc,
          start_datetime: this.state.event_date,
          end_datetime: this.state.event_end_date,
          groupid: this.state.group,
          organizerid: this.state.userID,
        };
        const newEvent = await API.graphql({
          query: mutations.createEvent,
          variables: { input: details },
        });
        const user_arr = group.data.listGroupUsers.items;
        for (i = 0; i < user_arr.length; ++i) {
          const myRSVP = await API.graphql({
            query: mutations.createRsvp,
            variables: {
              input: {
                eventid: newEvent.data.createEvent.id,
                userid: user_arr[i].userId,
                status: 3,
              },
            },
          });
        }

        var user_id = this.state.userID;

        console.log("Test1");
        const reservationData = await API.graphql(
          graphqlOperation(
            `query MyQuery {getUser(id: "` +
              user_id +
              `") { accessToken, refreshToken, reserveID }}`
          )
        );

        console.log("Test0");

        var accessTokenTest = reservationData.data.getUser.accessToken;
        var refreshTokenTest = reservationData.data.getUser.refreshToken;
        var reserveID = reservationData.data.getUser.reserveID;

        var myHeaders = new Headers();
        myHeaders.append("X-Company-Login", "juegojuegos");
        myHeaders.append("X-Token", accessTokenTest);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://user-api-v2.simplybook.me/admin/bookings/1/links",
          requestOptions
        );

        var text = await response.text();
        var json_text = await JSON.parse(text);

        console.log(json_text);

        if (json_text["code"] == "419") {
          console.log("Correct");

          var myHeadersRefresh = new Headers();
          myHeadersRefresh.append("Content-Type", "application/json");

          var rawRefresh = JSON.stringify({
            company: "juegojuegos",
            refresh_token: refreshTokenTest,
          });

          console.log(refreshTokenTest);

          var requestOptionsRefresh = {
            method: "POST",
            headers: myHeadersRefresh,
            body: rawRefresh,
            redirect: "follow",
          };

          const responseRefresh = await fetch(
            "https://user-api-v2.simplybook.me/admin/auth/refresh-token",
            requestOptionsRefresh
          );

          var text = await responseRefresh.text();
          var json_text = await JSON.parse(text);

          if (json_text["code"] == "401") {
            console.log("Test4");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              company: "juegojuegos",
              login: "rishik@juego.juegos",
              password: "4mvVvN9H8!!HMD@",
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            const token_response = await fetch(
              "https://user-api-v2.simplybook.me/admin/auth?",
              requestOptions
            );
            var text = await token_response.text();
            var json_text = await JSON.parse(text);
            var tokens = [json_text["token"], json_text["refresh_token"]];
          }

          const details = {
            input: {
              id: user_id,
              accessToken: tokens[0],
              refreshToken: tokens[1],
              reserveID: reserveID,
            },
          };

          accessTokenTest = tokens[0];
          refreshTokenTest = tokens[1];

          const reservationData = await API.graphql(
            graphqlOperation(mutations.updateUser, details)
          );
        }
        var accessToken = accessTokenTest;
        var clientID = reserveID;

        var myHeaders = new Headers();
        myHeaders.append("X-Company-Login", "juegojuegos");
        myHeaders.append("X-Token", accessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          count: 1,
          start_datetime: this.getReservationDateString(this.state.event_date),
          end_datetime: this.getReservationDateString(
            this.state.event_end_date
          ),
          /* start_datetime: "2023-07-30 09:30:00",
          end_datetime: "2023-07-30 09:45:00", */
          provider_id: "2",
          service_id: "3",
          client_id: clientID,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response1 = await fetch(
          "https://user-api-v2.simplybook.me/admin/bookings",
          requestOptions
        );
        var text = await response1.text();
        var json_text = await JSON.parse(text);
        console.log("Booking ID: " + json_text["bookings"][0]["id"]);
        //RESERVATION STUFF
        /**const user = await API.graphql(graphqlOperation(`query MyQuery {
                    getUser(id: "`+this.state.userID+`") {
                      email
                      phone
                      username
                    }
                  }`))

                //FETCH TOKEN
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "company": "juegojuegos",
                "login": "rishik@juego.juegos",
                "password": "4mvVvN9H8!!HMD@"
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://user-api-v2.simplybook.me/admin/auth?", requestOptions)
                .then(response => response.text())
                .then(result => this.setState({ReservationToken:result}))
                .catch(error => console.log('error', error));
                //this.setState({ReservationToken:"cfc6c83ef17d238ade286b54e557c3eb8eeff52c63e73acff23851eb58c5c748"})

                //CREATES RESERVATION
                var myHeaders = new Headers();
                myHeaders.append("X-Company-Login", "juegojuegos");
                myHeaders.append("X-Token", this.state.ReservationToken);
                myHeaders.append("Content-Type", "application/json");

                console.log(this.getReservationDateString(this.state.event_date))
                console.log(this.getReservationDateString(this.state.event_end_date))
                var raw = JSON.stringify({
                "count": 1,
                "start_datetime": this.getReservationDateString(this.state.event_date),
                "end_datetime": this.getReservationDateString(this.state.event_end_date),
                "provider_id": 2,
                "service_id": 3,
                "client_id": this.state.reservationID
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://user-api-v2.simplybook.me/admin/bookings", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                */
        //OTHER QUERY
        this.props.navigation.replace("Home", { userID: this.state.userID });
      } catch (error) {
        console.log("Error: ", error);
      }
      //this.props.navigation.navigate("Home");
      //alert(this.state.event_name+" "+this.state.event_loc +" "+this.state.event_date.toString()+" "+this.state.event_end_date.toString())
    } else {
      console.log(
        this.state.event_date_error +
          ", " +
          this.state.event_loc_error +
          ", " +
          this.state.event_name_error
      );
    }
  };

  submitEvent = async () => {
    await this.setError();
    this.checkError();
  };

  getEventDateString = () => {
    return this.state.event_date.toString();
  };
  getReservationDateString = (date) => {
    //const hours= (date.getHours()%12==0?12:date.getHours()%12)
    const minutes =
      date.getMinutes() < 10
        ? "0" + (date.getMinutes() - (date.getMinutes() % 5))
        : date.getMinutes() - (date.getMinutes() % 5);
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dateString =
      "" +
      date.getFullYear() +
      "-" +
      month +
      "-" +
      date.getDate() +
      " " +
      hours +
      ":" +
      minutes +
      ":00";
    return dateString;
  };
  setAndroidDatePickerHidden = () => {
    this.setState({ android_datepicker_hidden: false });
  };
  setAndroidTimePickerHidden = () => {
    this.setState({ android_timepicker_hidden: false });
  };
  setGroupID = (value) => {
    this.setState({ group: value });
  };
  render = () => {
    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: "#fff" }}
        ListHeaderComponent={
          <>
            <Text
              style={{
                fontSize: 45,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              Event Creation
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#AAA",
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              Enter Event Details to Send
            </Text>
            <Textbox
              label="Event Name"
              placeholder="Enter Event Name"
              error={this.state.event_name_error}
              inputHandler={this.setEventName}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#AAA",
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              Start Date
            </Text>
            {
              //START DATE
              Platform.OS === "ios" ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 5,
                    marginBottom: 30,
                  }}
                >
                  <DateTimePicker
                    mode="date"
                    minimumDate={new Date()}
                    value={this.state.event_date}
                    onChange={this.setEventDate}
                  ></DateTimePicker>
                  <DateTimePicker
                    mode="time"
                    value={this.state.event_date}
                    onChange={this.setEventTime}
                  ></DateTimePicker>
                </View>
              ) : (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      height: hp2dp("4%"),
                      borderRadius: hp2dp("1%"),
                      marginTop: 5,
                      marginBottom: 30,
                      backgroundColor: "#EEE",
                    }}
                    onPress={this.setAndroidDatePickerHidden}
                  >
                    {!this.state.android_datepicker_hidden && (
                      <DateTimePicker
                        mode="date"
                        minimumDate={new Date()}
                        value={this.state.event_date}
                        onChange={this.setEventDate}
                      ></DateTimePicker>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        marginHorizontal: wp2dp("5%"),
                        alignSelf: "center",
                      }}
                    >
                      {this.state.event_date.getMonth()}/
                      {this.state.event_date.getDate()}/
                      {this.state.event_date.getFullYear()}{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      height: hp2dp("4%"),
                      borderRadius: hp2dp("1%"),
                      marginTop: 5,
                      marginBottom: 30,
                      backgroundColor: "#EEE",
                    }}
                    onPress={this.setAndroidTimePickerHidden}
                  >
                    {!this.state.android_timepicker_hidden && (
                      <DateTimePicker
                        mode="time"
                        value={this.state.event_date}
                        onChange={this.setEventTime}
                      ></DateTimePicker>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        marginHorizontal: wp2dp("5%"),
                        alignSelf: "center",
                      }}
                    >
                      {this.state.event_date.getHours() % 12 == 0
                        ? 12
                        : this.state.event_date.getHours() % 12}{" "}
                      : {this.state.event_date.getMinutes() < 10 ? "0" : ""}
                      {this.state.event_date.getMinutes()}{" "}
                      {this.state.event_date.getHours() > 11 ? "pm" : "am"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
            <Text
              style={{
                fontSize: 16,
                color: "#AAA",
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              End Date
            </Text>
            {
              //END DATE
              Platform.OS === "ios" ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 5,
                    marginBottom: 30,
                  }}
                >
                  <DateTimePicker
                    mode="date"
                    minimumDate={new Date()}
                    value={this.state.event_end_date}
                    onChange={this.setEventEndDate}
                  ></DateTimePicker>
                  <DateTimePicker
                    mode="time"
                    value={this.state.event_end_date}
                    onChange={this.setEventEndTime}
                  ></DateTimePicker>
                </View>
              ) : (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      height: hp2dp("4%"),
                      borderRadius: hp2dp("1%"),
                      marginTop: 5,
                      marginBottom: 30,
                      backgroundColor: "#EEE",
                    }}
                    onPress={this.setAndroidDatePickerHidden}
                  >
                    {!this.state.android_datepicker_hidden && (
                      <DateTimePicker
                        mode="date"
                        minimumDate={new Date()}
                        value={this.state.event_end_date}
                        onChange={this.setEventEndDate}
                      ></DateTimePicker>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        marginHorizontal: wp2dp("5%"),
                        alignSelf: "center",
                      }}
                    >
                      {this.state.event_end_date.getMonth()}/
                      {this.state.event_end_date.getDate()}/
                      {this.state.event_end_date.getFullYear()}{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      height: hp2dp("4%"),
                      borderRadius: hp2dp("1%"),
                      marginTop: 5,
                      marginBottom: 30,
                      backgroundColor: "#EEE",
                    }}
                    onPress={this.setAndroidTimePickerHidden}
                  >
                    {!this.state.android_timepicker_hidden && (
                      <DateTimePicker
                        mode="time"
                        value={this.state.event_end_date}
                        onChange={this.setEventEndTime}
                      ></DateTimePicker>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        marginHorizontal: wp2dp("5%"),
                        alignSelf: "center",
                      }}
                    >
                      {this.state.event_end_date.getHours() % 12 == 0
                        ? 12
                        : this.state.event_end_date.getHours() % 12}{" "}
                      : {this.state.event_end_date.getMinutes() < 10 ? "0" : ""}
                      {this.state.event_date.getMinutes()}{" "}
                      {this.state.event_date.getHours() > 11 ? "pm" : "am"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
            <LocationBox
              label="Event Location"
              placeholder="Enter Event Location"
              error={this.state.event_loc_error}
              inputHandler={this.setEventLocation}
            />
            {
              <Dropdown
                error={this.state.group_error}
                label="Select Group"
                data={this.state.groups}
                selecttionHandler={this.setGroupID}
              />
            }
            <View style={{ marginTop: 150 }} />
            <SubmitButton title="Create Event" onPress={this.submitEvent} />
            <View style={{ marginTop: 400 }} />
          </>
        }
      />
    );
  };
}

export default EventCreationScreen;
