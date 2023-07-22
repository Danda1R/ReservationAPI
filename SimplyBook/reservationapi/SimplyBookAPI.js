async function createToken() {
  myHeaders = new Headers();
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

  const response = await fetch(
    "https://user-api-v2.simplybook.me/admin/auth?",
    requestOptions
  );
  text = await response.text();
  json_text = await JSON.parse(text);
  return [json_text["token"], json_text["refresh_token"]];
}

async function listBookings(accessToken) {
  let token;

  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://user-api-v2.simplybook.me/admin/bookings/2",
    requestOptions
  );
  text = await response.text();
  json_text = await JSON.parse(text);
  return json_text;
}

async function refreshOldToken(
  url = "https://user-api-v2.simplybook.me/admin/auth/refresh-token",
  refreshToken
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    company: "juegojuegos",
    refresh_token: refreshToken,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);
  return [json_text["token"], json_text["refresh_token"]];
}

async function testTokens(accessToken, refreshToken) {
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
  text = await response.text();
  json_text = await JSON.parse(text);
  if (json_text["code"] == "419") {
    return refreshOldToken(
      "https://user-api-v2.simplybook.me/admin/auth/refresh-token",
      refreshToken
    );
  }
  return [accessToken, refreshToken];
}

async function makeClient(name, email, phone, accessToken) {
  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: name,
    email: email,
    phone: phone,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);
  return json_text["id"];
}

async function makeBooking(
  starttime,
  endtime,
  providerID,
  serviceID,
  clientID,
  url = "https://user-api-v2.simplybook.me/admin/bookings",
  accessToken
) {
  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    count: 1,
    // "start_datetime": "2023-07-19 09:30:00",
    // "end_datetime": "2023-07-19 09:45:00",
    start_datetime: starttime,
    end_datetime: endtime,
    provider_id: providerID,
    service_id: serviceID,
    client_id: clientID,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);
  return json_text["bookings"]["id"];
}

async function getAvailableTimes(date, providerID, serviceID, accessToken) {
  url = `https://user-api-v2.simplybook.me/admin/schedule/available-slots?date=${date}&provider_id=${providerID}&service_id=${serviceID}`;

  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);

  var result = [];

  for (var i in json_text) result.push(json_text[i]["id"]);

  return result;
}

async function getServiceID(name, accessToken) {
  url = `https://user-api-v2.simplybook.me/admin/services?filter[search]=${name}`;

  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);

  for (var i in json_text["data"]) result.push(json_text["data"][i]["id"]);
  return result;
}

async function getProviderID(name, accessToken) {
  url = `https://user-api-v2.simplybook.me/admin/providers?filter[search]=${name}`;

  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);

  for (var i in json_text["data"]) result.push(json_text["data"][i]["id"]);
  return result;
}

async function getClientID(name, accessToken) {
  url = `https://user-api-v2.simplybook.me/admin/clients?page=1&on_page=10&filter[search]=${name}`;

  var myHeaders = new Headers();
  myHeaders.append("X-Company-Login", "juegojuegos");
  myHeaders.append("X-Token", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  text = await response.text();
  json_text = await JSON.parse(text);

  for (var i in json_text["data"]) result.push(json_text["data"][i]["id"]);
  return result;
}

async function main() {
  try {
    accessToken =
      "3d192b8d76749afff4cd93bc4825e9671b944d0f25d2d730d668df9a0470df26";
    refreshToken =
      "b3aaff5ba7d24fa2abe0135e1c593be3586afef7f13358afcd89c33ee5753b6c";
    let tokens = await testTokens(accessToken, refreshToken);

    accessToken = tokens[0];
    refreshToken = tokens[1];

    console.log(tokens);
    console.log(await getAvailableTimes("2023-07-27", "2", "3", accessToken));
    //let simplyBookID = makeClient("TestName", "test@email.com", "012-345-6789", accessToken)
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
