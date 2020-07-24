import React from "react";
import "./App.css";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Instructions from "./Components/Instructions/Instructions";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div>
      <header className="header">
        <div className="label">
          {/* <img className="logo" src={logo} alt="Logo" /> */}
          YTMp3
        </div>
      </header>
      <main>
        <Home />
        <Instructions />
      </main>
      <Footer />
    </div>
  );
}

export default App;
