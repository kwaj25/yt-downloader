import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./VerticalModal.css";

export class VerticalModal extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      player: {},
    };
  }
  componentDidMount() {
    let height = (window.screen.availHeight * 40) / 100;
    let width = window.getComputedStyle(
      document.getElementsByClassName("modal-body")[0]
    ).width;
    width = parseInt(width.substring(0, width.length - 2) - 30);
    document.getElementById("videoAd").height = height;
    document.getElementById("videoAd").width = width;

    document.getElementById("video-modal").addEventListener("resize", () => {
      let height =
        window && window.screen && (window.screen.availHeight * 40) / 100;
      let width =
        window &&
        window.getComputedStyle &&
        window.getComputedStyle(
          document.getElementsByClassName("modal-body")[0]
        ).width;
      width = parseInt(width.substring(0, width.length - 2) - 30);
      document.getElementById("videoAd").height = height;
      document.getElementById("videoAd").width = width;
    });

    let videoAd = document.getElementById("videoAd");
    let self = this;
    videoAd.addEventListener("timeupdate", function () {
      if (this.currentTime > 15) {
        self.props.onHide();
      }
    });
  }

  componentWillUnmount() {
    let videoAd = document.getElementById("videoAd");
    let self = this;
    videoAd.addEventListener("timeupdate", function () {
      if (this.currentTime > 15) {
        self.props.onHide();
      }
    });

    document.getElementById("video-modal").removeEventListener("resize", () => {
      console.log(
        window.getComputedStyle(
          document.getElementsByClassName("modal-body")[0]
        ).width
      );
      let height =
        window && window.screen && (window.screen.availHeight * 40) / 100;
      let width =
        window &&
        window.getComputedStyle &&
        window.getComputedStyle(
          document.getElementsByClassName("modal-body")[0]
        ).width;
      width = parseInt(width.substring(0, width.length - 2) - 30);
      document.getElementById("videoAd").height = height;
      document.getElementById("videoAd").width = width;
    });
  }

  render() {
    return (
      <Modal
        id="video-modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            YtMp3App.com
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <div id="videoAd">{this.props.videoid}</div> */}
          <video id="videoAd" autoplay="" name="media">
            <source src={this.props.url} type="video/mp4" />
          </video>
        </Modal.Body>
        <Modal.Footer>
          <p>
            Please enjoy this 15 sec. ad while your download is being completed.
          </p>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VerticalModal;
