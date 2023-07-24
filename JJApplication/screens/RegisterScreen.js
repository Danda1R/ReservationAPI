import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Textbox from "../components/Textbox";
import SubmitButton from "../components/SubmitButton";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

//Amplify Stuff
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../src/graphql/mutations.js";
import * as subscriptions from "../src/graphql/subscriptions.js";

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.setEmail = this.setEmail.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCPassword = this.setCPassword.bind(this);
    this.setPhone = this.setPhone.bind(this);

    this.state = {
      email: "",
      username: "",
      password: "",
      c_password: "",
      phone: "",

      phone_error: "",
      email_error: "",
      username_error: "",
      password_error: "",
    };
  }
  setPhone(value) {
    this.setState({ phone: value });
  }
  setEmail(value) {
    this.setState({ email: value });
  }
  setUsername(value) {
    this.setState({ username: value });
  }
  setPassword(value) {
    this.setState({ password: value });
  }
  async setCPassword(value) {
    await this.setState({ c_password: value });
    if (this.state.c_password !== this.state.password)
      this.setState({ password_error: "passwords do not match" });
    else this.setState({ password_error: "" });
  }
  setError() {
    if (!this.state.email) {
      this.setState({ email_error: "invalid email" });
    } else {
      this.setState({ email_error: "" });
    }

    if (!this.state.phone) {
      this.setState({ phone_error: "invalid phone number" });
    } else {
      this.setState({ phone_error: "" });
    }

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
    if (
      !this.state.password_error &&
      !this.state.username_error &&
      !this.state.phone_error
    ) {
      alert(
        this.state.email +
          " " +
          this.state.username +
          " " +
          this.state.password +
          " " +
          this.state.phone
      );
    } else {
      console.log(
        this.email_error +
          "," +
          this.state.username_error +
          ", " +
          this.state.password_error +
          ", " +
          this.state.phone_error
      );
    }
  }

  submitLogin = async () => {
    await this.setError();
    this.checkError();

    //Registering to Cognito
    const { username, password, email, phone } = this.state;
    //I'm gonna try to do this thing, hopefully it works
    try {
      //Proof of concept
      //console.log("User: " + username + "\nPassword: " + password + "\nEmail: " + email);

      //Registering a new user
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, //Email
          // optional
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      //Proof of concept
      //console.log(user);

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
      var accessToken = json_text["token"];
      var refreshToken = json_text["refresh_token"];

      var myHeadersClient = new Headers();
      myHeadersClient.append("X-Company-Login", "juegojuegos");
      myHeadersClient.append("X-Token", accessToken);
      myHeadersClient.append("Content-Type", "application/json");

      var rawClient = JSON.stringify({
        name: username,
        email: email,
        phone: phone,
      });

      var requestOptionsClient = {
        method: "POST",
        headers: myHeadersClient,
        body: rawClient,
        redirect: "follow",
      };

      const client_response = await fetch(
        "https://user-api-v2.simplybook.me/admin/clients",
        requestOptionsClient
      );

      var textClient = await client_response.text();
      var json_textClient = await JSON.parse(textClient);
      console.log(json_textClient);
      var reserveID = json_textClient["id"];

      //Adding email to "user" data table on Amplify
      const details = {
        email: email,
        username: username,
        phone: phone,
        accessToken: accessToken,
        refreshToken: refreshToken,
        reserveID: reserveID,
      };
      const newUser = await API.graphql({
        query: mutations.createUser,
        variables: { input: details },
      });

      this.props.navigation.replace("Login");
    } catch (error) {
      console.log("error signing up:", error);
    }
  };
  render = () => {
    return (
      <ScrollView>
        <Text
          style={{
            fontSize: 45,
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: hp2dp("10"),
          }}
        >
          Create Account
        </Text>
        <View style={{ marginBottom: hp2dp("2") }} />
        <Textbox
          autoCapitalize="none"
          label="Email"
          placeholder="Enter Account Email"
          error={this.state.email_error}
          inputHandler={this.setEmail}
        />
        <Textbox
          autoCapitalize="none"
          label="Username"
          placeholder="Enter Account Username"
          error={this.state.username_error}
          inputHandler={this.setUsername}
        />
        <Textbox
          label="Phone Number"
          placeholder="Enter Phone Number"
          error={this.state.phone_error}
          inputHandler={this.setPhone}
        />
        <Textbox
          autoCapitalize="none"
          label="Password"
          placeholder="Enter Account Password"
          error={this.state.password_error}
          secureTextEntry={true}
          inputHandler={this.setPassword}
        />
        <Textbox
          autoCapitalize="none"
          label="Confirm Password"
          placeholder="Confirm Password"
          error={this.state.password_error}
          secureTextEntry={true}
          inputHandler={this.setCPassword}
        />
        <View style={{ marginBottom: hp2dp("10") }} />
        <SubmitButton title="Register Account" onPress={this.submitLogin} />
        <View
          style={{
            flexDirection: "row",
            marginTop: hp2dp("2%"),
            marginBottom: hp2dp("15%"),
            alignSelf: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "#888", fontSize: 18 }}>
            Have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.replace("Login")}
          >
            <Text style={{ color: "#0AF", fontSize: 18 }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
}
