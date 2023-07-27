import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

const signedURL = await Storage.get("Appy Hour Poster.png");

export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>

      <img src={signedURL} />
    </div>
  );
}
