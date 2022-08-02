import React from "react";
import logo from "./logo.jpg";
import "./App.css";
import { SocialIcon } from "react-social-icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>__init__</p>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https://soundcloud.com/birdgang4ever/object-object-live-minimix-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
        ></iframe>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <SocialIcon
            style={{ margin: "30px" }}
            url="https://www.instagram.com/objectobjectav/"
            target="_blank"
          />
          <SocialIcon
            style={{ margin: "30px" }}
            url="https://twitter.com/objectobjectav"
            target="_blank"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
