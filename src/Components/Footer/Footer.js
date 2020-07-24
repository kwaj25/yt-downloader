/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <div className="footer d-flex justify-content-between">
        <div className="copyright d-flex align-items-center">YTMp3.com</div>
        <div className="links d-flex">
          <div className="terms d-flex align-items-center">
            <a href="https://ytmp3.cc/terms-of-use/" target="_blank">Terms and Conditions</a>
          </div>

          <div className="contact d-flex align-items-center">
            <a href="https://ytmp3.cc/contact/" target="_blank">Contact</a>
          </div>
          <div className="copyright-claims d-flex align-items-center">
            <a href="https://ytmp3.cc/copyright-claims/" target="_blank">Copyright</a>
          </div>
          <div className="policy d-flex align-items-center">
            <a href="https://ytmp3.cc/privacy-policy/" target="_blank">Policy</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
