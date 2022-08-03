import React, { useState } from "react";
import "./App.css";
import { SocialIcon } from "react-social-icons";
import LogoCanvas from "./LogoCanvas";
import logoBlue from "./logoBlue.jpg";

function App() {
  const [clickedSoundcloud, setClickedSoundcloud] = useState(false);

  function checkFocus() {
    if (document.activeElement === document.getElementsByTagName("iframe")[0]) {
      setClickedSoundcloud(true);
    }
  }

  window.setInterval(checkFocus, 100);

  return (
    <div className="App">
      <header
        className="App-header"
        // style={{
        //   backgroundImage: `url(${logo})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {clickedSoundcloud === false && (
          <img src={logoBlue} className="App-logo" alt="logo" />
        )}
        {clickedSoundcloud === true && <LogoCanvas />}
        <p>__init__</p>
        <iframe
          title="soundcloud"
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
