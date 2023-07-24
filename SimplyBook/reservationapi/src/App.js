import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Button from "./Button";

import * as mutations from "./graphql/mutations.js";
import * as queries from "./graphql/queries";

export default function App() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    fetchReservations();
  }, []);
  async function fetchReservations() {
    try {
      const reservationData = await API.graphql({
        query: queries.listReservations,
      });
      setReservations(reservationData.data.listReservations.items);
    } catch (err) {
      console.log({ err });
    }
  }

  async function createReservationUser() {
    try {
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
        name: "Kevin",
        email: "kevin@gmail.com",
        phone: "00321300000",
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

      const details = {
        user_id: "3123141",
        accessToken: accessToken,
        refreshToken: refreshToken,
        reserveID: reserveID,
      };
      const reservationData = await API.graphql({
        query: mutations.createReservation,
        variables: { input: details },
      });
    } catch (err) {
      console.log({ err });
    }
  }

  async function updateTest() {
    try {
      const details = {
        input: {
          id: "6a63a2b0-a486-464f-96b5-703ce7ff0fae",
          user_id: "12345678",
          accessToken:
            "af0b81b0f627e868ad476ecf0569c3ea861cf8bbe308c3eab2fa37c4a881f8cb",
          refreshToken:
            "12998b72010c1a8fc87c566f3fd5d2fd035002240e44b4c49dc54ca47f56607ac",
          reserveID: "31",
        },
      };
      console.log(details);
      /* const reservationData = await API.graphql({
        query: mutations.updateReservation,
        variables: { input: details },
      }); */
      const reservationData = await API.graphql(
        graphqlOperation(mutations.updateReservation, details)
      );
      console.log(reservationData);
    } catch (err) {
      console.log({ err });
    }
  }

  async function testTokens() {
    try {
      var reservationID = "6a63a2b0-a486-464f-96b5-703ce7ff0fae";
      console.log("Test1");
      const reservationData = await API.graphql(
        graphqlOperation(
          `query MyQuery {getReservation(id: "` +
            reservationID +
            `") { user_id, accessToken, refreshToken, reserveID }}`
        )
      );

      console.log("Test0");

      var user_id = reservationData.data.getReservation.user_id;
      var accessTokenTest = reservationData.data.getReservation.accessToken;
      var refreshTokenTest = reservationData.data.getReservation.refreshToken;
      var reserveID = reservationData.data.getReservation.reserveID;

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
        var tokens = await refreshOldToken(refreshTokenTest);
        const details = {
          input: {
            id: "6a63a2b0-a486-464f-96b5-703ce7ff0fae",
            user_id: user_id,
            accessToken: tokens[0],
            refreshToken: tokens[1],
            reserveID: reserveID,
          },
        };
        console.log("Test: " + tokens[0]);
        const reservationData = await API.graphql(
          graphqlOperation(mutations.updateReservation, details)
        );
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function refreshOldToken(refreshToken) {
    var myHeadersRefresh = new Headers();
    myHeadersRefresh.append("Content-Type", "application/json");

    var rawRefresh = JSON.stringify({
      company: "juegojuegos",
      refresh_token: refreshToken,
    });

    console.log(refreshToken);

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

    console.log("Test2");
    console.log(json_text);
    console.log("Test3");

    if (json_text["code"] == "401") {
      console.log("Test4");
      var tokens = await makeToken();
      return tokens;
    }

    var textRefresh = await responseRefresh.text();
    var json_textRefresh = await JSON.parse(textRefresh);
    console.log(json_textRefresh);
    return [json_textRefresh["token"], json_textRefresh["refresh_token"]];
  }

  async function makeToken() {
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
    return [json_text["token"], json_text["refresh_token"]];
  }

  async function makeBooking() {
    /* starttime,
    endtime,
    providerID,
    serviceID,
    clientID,
    accessToken */

    var id = "6a63a2b0-a486-464f-96b5-703ce7ff0fae";

    const reservationData = await API.graphql(
      graphqlOperation(
        `query MyQuery {getReservation(id: "` +
          id +
          `") { accessToken, reserveID }}`
      )
    );

    var accessToken = reservationData.data.getReservation.accessToken;
    var clientID = reservationData.data.getReservation.reserveID;

    var myHeaders = new Headers();
    myHeaders.append("X-Company-Login", "juegojuegos");
    myHeaders.append("X-Token", accessToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      count: 1,
      start_datetime: "2023-07-30 09:30:00",
      end_datetime: "2023-07-30 09:45:00",
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

    const response = await fetch(
      "https://user-api-v2.simplybook.me/admin/bookings",
      requestOptions
    );
    var text = await response.text();
    var json_text = await JSON.parse(text);
    console.log("Booking ID: " + json_text["bookings"][0]["id"]);
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <Button title="Create New ReserveUser" onClick={createReservationUser} />
      <Button title="Refresh User Token" onClick={testTokens} />
      <Button title="Make Booking" onClick={makeBooking} />
      {reservations.map((reservation) => (
        <div key={reservation.user_id}>
          <h3>{reservation.reserveID}</h3>
          <p>{reservation.accessToken}</p>
          <p>{reservation.refreshToken}</p>
        </div>
      ))}
    </div>
  );
}
