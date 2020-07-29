import React from "react";
import axios from "axios";
import ytpl from "ytpl";
import ytdl from "ytdl-core";
import "./Home.css";
import List from "../List/List";
import Playlist from "../Playlist/Playlist";
import VerticalModal from "../Modal/VerticalModal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: {},
      url: "",
      gotVideoInfo: false,
      startLoader: false,
      hasError: true,
      isVideoTypeLink: false,
      playListInfo: {},
      gotPlayListInfo: false,
      modalShow: false,
    };
    this.inputRef = React.createRef();
    this.listRef = React.createRef();
    this.playlistRef = React.createRef();
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  getURL = () => {
    if (this.inputRef.current.value === "") {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      url: this.inputRef.current.value,
    });
  };

  checkLinkType = () => {
    this.setState({ isVideoTypeLink: false, playlistInfo: {}, videoInfo: {} });
    const url = this.inputRef.current.value;
    if (ytdl.validateURL(url)) {
      this.setState({ isVideoTypeLink: true });
      this.getVideoInfo();
    } else if (ytpl.validateURL(url)) {
      this.setState({ isVideoTypeLink: false });
      this.getPlaylistInfo();
    } else return;
  };

  adjustClipHeight = (height) => {
    document.getElementsByClassName("home")[0].style.height = `${height}px`;
  };

  getPlaylistInfo = async () => {
    
    this.setState({ gotPlayListInfo: false, startLoader: true });
    const playListID = await ytpl.getPlaylistID(this.inputRef.current.value);

    axios
      .get("https://64.227.24.24/playlistInfo", {
        params: {
          playListID,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          playListInfo: data,
          gotPlayListInfo: true,
          startLoader: false,
        });
        if (window.screen.availWidth > 600) this.adjustClipHeight(600);
        else this.adjustClipHeight(800);
      })
      .catch((e) => {
        this.setState({ gotPlayListInfo: false, startLoader: false });
        if (window.screen.availWidth > 600) this.adjustClipHeight(400);
        else this.adjustClipHeight(350);
        console.log(e);
      });
  };

  getVideoInfo = () => {
    this.setState({ gotVideoInfo: false, startLoader: true });
    axios
      .get("https://64.227.24.24/getInfo", {
        params: {
          url: this.inputRef.current.value,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          videoInfo: data,
          gotVideoInfo: true,
          startLoader: false,
        });
        if (window.screen.availWidth > 600) this.adjustClipHeight(600);
        else this.adjustClipHeight(900);
      })
      .catch((e) => {
        this.setState({ gotVideoInfo: false, startLoader: false });
        if (window.screen.availWidth > 600) this.adjustClipHeight(400);
        else this.adjustClipHeight(350);
        console.log(e);
      });
  };
  render() {
    return (
      <div className="home">
        <h2>YTMp3 - Download and Save YouTube Videos</h2>
        <div className="actions">
          <input
            onInput={() => this.getURL()}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.checkLinkType();
              }
            }}
            ref={this.inputRef}
            type="text"
            placeholder="Paste your video link here"
          />
          <button
            className="btn btn-primary"
            onClick={this.checkLinkType}
            disabled={this.state.hasError}
          >
            Start
          </button>
          <div className="loading">
            {this.state.startLoader && (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
        {this.state.isVideoTypeLink && this.state.gotVideoInfo ? (
          <List
            ref={this.listRef}
            key={this.state.url}
            data={this.state.videoInfo}
            videoURL={this.state.url}
            openModal={() => this.setState({ modalShow: true })}
          />
        ) : (
          this.state.gotPlayListInfo && (
            <Playlist
              ref={this.playlistRef}
              playlistInfo={this.state.playListInfo}
              openModal={() => {
                this.setState({ modalShow: true });
              }}
            />
          )
        )}
        {this.state.modalShow && (
          <VerticalModal
            videoId={
              this.state.isVideoTypeLink
                ? ytdl.getURLVideoID(this.state.url)
                : ytdl.getURLVideoID(
                    this.playlistRef.current.state.videoURLPrefix +
                      this.state.playListInfo.videos[
                        this.playlistRef.current.state.selectedIndex
                      ].id
                  )
            }
            show={this.state.modalShow}
            onHide={() => {
              this.setState({ modalShow: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default Home;
