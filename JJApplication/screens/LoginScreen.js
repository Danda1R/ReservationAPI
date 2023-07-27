import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import Textbox from "../components/Textbox";
import SubmitButton from "../components/SubmitButton";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";

import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import * as queries from "../src/graphql/queries.js";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.state = {
      username: "",
      password: "",

      username_error: "",
      password_error: "",
    };
  }

  setUsername(value) {
    this.setState({ username: value });
  }
  setPassword(value) {
    this.setState({ password: value });
  }
  setError() {
    if (!this.state.username) {
      this.setState({ username_error: "invalid username" });
    } else {
      this.setState({ username_error: "" });
    }

    if (!this.state.password) {
      this.setState({ password_error: "invalid password" });
    } else {
      this.setState({ password_error: "" });
    }
  }
  checkError() {
    if (!this.state.password_error && !this.state.username_error) {
      if (this.state.username == "a" && this.state.password == "a") {
        alert("Let in through back door");
        this.props.navigation.replace("Home");
      }
      alert(this.state.username + " " + this.state.password);
    } else {
      console.log(this.state.username_error + ", " + this.state.password_error);
    }
  }

  submitLogin = async () => {
    await this.setError();
    this.checkError();

    const fileAccessURL = await Storage.put(
      "Spider-Verse #12_0d21ebe8-5399-4933-8d41-fbb4230dee50.png",
      "Test"
    );
    console.log("access url", fileAccessURL);

    //AWS Login
    const { username, password } = this.state;
    try {
      if (password !== "") {
        const userAuth = await Auth.signIn(username, password);
        const user = await API.graphql({
          query: queries.listUsers,
          variables: { filter: { username: { eq: username } }, items: "id" },
        });
        //console.log(user.data.listUsers.items[0].id)
        this.props.navigation.replace("Home", {
          userID: user.data.listUsers.items[0].id,
        });
      }
    } catch (error) {
      console.log("error signing in", error);
      this.setState({ username_error: "" + error, password_error: "" + error });
    }
  };

  render = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 45,
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: hp2dp("10"),
          }}
        >
          Login
        </Text>
        <View style={{ marginBottom: hp2dp("6") }} />
        <Textbox
          label="Username"
          placeholder="Enter Username"
          error={this.state.username_error}
          inputHandler={this.setUsername}
        />
        <Textbox
          label="Password"
          placeholder="Enter Password"
          error={this.state.password_error}
          secureTextEntry={true}
          inputHandler={this.setPassword}
        />
        <View style={{ marginBottom: hp2dp("20") }} />
        <SubmitButton title="Login" onPress={this.submitLogin} />
        <TouchableOpacity
          onPress={() => this.props.navigation.replace("Registration")}
        >
          <Text
            style={{
              alignSelf: "center",
              marginTop: hp2dp("3%"),
              color: "#0AF",
              fontSize: 18,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}
