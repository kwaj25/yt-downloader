import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import YouTubePlayer from "youtube-player";
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
    this.setState(
      {
        player: YouTubePlayer("videoAd"),
      },
      () => {
        this.state.player.setSize(width, height);
        this.state.player.loadVideoById({
          videoId: this.props.videoId,
          startSeconds: 0,
          endSeconds: 15,
        });
        this.state.player.playVideo();
        this.state.player.on("stateChange", (event) => {
          if (event.data === 0) {
            this.props.onHide();
          }
        });
      }
    );

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
      this.state.player.setSize(width, height);
    });
  }

  componentWillUnmount() {
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
      this.state.player.setSize(width, height);
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
          <div id="videoAd">{this.props.videoid}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VerticalModal;
