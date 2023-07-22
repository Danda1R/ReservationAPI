import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
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

      var accessToken =
        "ef268f1916bb69c19b53e241cfbb34e6a82f3c7e68b9ac02f87e5ca2d90357d2";
      var refreshToken =
        "5a1bb5c8dbfb12e8dc83d6988ea4522e53d349c0cbff959bdabbbc16383646e2";
      var myHeadersClient = new Headers();
      myHeadersClient.append("X-Company-Login", "juegojuegos");
      myHeadersClient.append("X-Token", accessToken);
      myHeadersClient.append("Content-Type", "application/json");

      var rawClient = JSON.stringify({
        name: "Test",
        email: "Test@gmail.com",
        phone: "0000000000",
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
        user_id: "12345678",
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

  async function testTokens() {
    try {
      var reservationID = "6a63a2b0-a486-464f-96b5-703ce7ff0fae";
      const details = {
        user_id: reservationID,
      };

      const reservationData = await API.graphql({
        query: queries.getReservation,
        variables: { input: details },
      });

      var accessToken = reservationData["accessToken"];

      var myHeaders = new Headers();
      myHeaders.append("X-Company-Login", "juegojuegos");
      myHeaders.append("X-Token", accessToken);

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
      if (json_text["code"] === "419") {
        // return refreshOldToken(
        //   "https://user-api-v2.simplybook.me/admin/auth/refresh-token",
        //   refreshToken
        // );
      }
      // return [accessToken, refreshToken];
    } catch (err) {
      console.log({ err });
    }
  }

  // async function refreshOldToken(refreshToken) {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     company: "juegojuegos",
  //     refresh_token: refreshToken,
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   const response = await fetch(
  //     "https://user-api-v2.simplybook.me/admin/auth/refresh-token",
  //     requestOptions
  //   );
  //   var text = await response.text();
  //   var json_text = await JSON.parse(text);
  //   return [json_text["token"], json_text["refresh_token"]];
  // }

  return (
    <div>
      <h1>Hello World!</h1>
      <Button title="Create New ReserveUser" onClick={createReservationUser} />
      <Button title="Refresh User Token" onClick={testTokens} />
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
