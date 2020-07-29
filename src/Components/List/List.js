import React from "react";
import "./List.css";
import { ProgressBar } from "react-bootstrap";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "",
      selectedITag: "",
      selectedVideo: {},
      progressbarStatus: false,
    };
  }
  componentDidMount() {
    let videoArr = this.props.data.video.sort((a, b) => {
      if (a.height > b.height) return 1;
      return -1;
    });
    this.setState({
      selectedVideo: videoArr[0].url,
      selectedFormat: videoArr[0].qualityLabel,
      selectedITag: videoArr[0].itag,
    });

    document.getElementsByClassName("tablinks")[0].click();
  }

  downloadAudio = () => {
    this.setState(
      {
        progressbarStatus: true,
      },
      () => {
        window.location.href = `http://64.227.24.24/downloadAudio?url=${this.props.videoURL}`;
      }
    );

    setTimeout(() => {
      this.setState({
        progressbarStatus: false,
      });
    }, 3000);
  };

  formatTitle = (title) => {
    if (title.length > 25) {
      return title.substring(0, 25) + "...";
    }
    return title;
  };
  openCity = (evt, cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  };

  selectFormat = (video) => {
    this.setState({
      selectedVideo: video.url,
      selectedFormat: video.qualityLabel,
      selectedITag: video.itag,
    });
  };

  downloadVideo = () => {
    this.setState(
      {
        progressbarStatus: true,
      },
      () => {
        window.location.href = `http://64.227.24.24/downloadVideo?url=${this.props.videoURL}&itag=${this.state.selectedITag}`;
      }
    );

    setTimeout(() => {
      this.setState({
        progressbarStatus: false,
      });
    }, 3000);
  };

  render() {
    return (
      <div className="list-comp">
        <div className="pl-3">
          <div className="tab">
            <button
              className="tablinks"
              onClick={(event) => this.openCity(event, "Video")}
            >
              Video
            </button>
            {/* <button
              className="tablinks"
              onClick={(event) => this.openCity(event, "Audio")}
            >
              Audio
            </button> */}
          </div>
          <div id="Video" className="tabcontent">
            <div>
              <span>Title:</span>
              <span>{this.props.data.title}</span>
            </div>
            <div className="video-container pt-2 d-flex justify-content-between">
              <img
                className="mr-4"
                alt="thumbnail not available"
                src={this.props.data.thumbnail.url}
              />
              <div className="mr-4 video-content d-flex flex-column justify-content-around">
                <div className="d-flex justify-content-evenly">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Format: {this.state.selectedFormat}
                    </button>
                    <div className="dropdown-menu">
                      {this.props.data.video
                        .sort((a, b) => {
                          if (a.height > b.height) return 1;
                          return -1;
                        })
                        .map((video, index) => {
                          return (
                            <a
                              onClick={() => this.selectFormat(video)}
                              key={index}
                              className="dropdown-item d-flex justify-content-between align-items-center"
                              href={() => false}
                            >
                              {video.qualityLabel} - {video.container}
                              {!video.audioCodec && (
                                <i
                                  className="fas fa-volume-mute"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </a>
                          );
                        })}
                    </div>
                  </div>
                  <a
                    href={this.state.selectedVideo}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="btn btn-secondary btn-sm"
                  >
                    Play Video
                  </a>
                </div>
                <div className="d-flex justify-content-evenly">
                  <button
                    onClick={() => {
                      this.downloadAudio();
                      this.props.openModal();
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Download Mp3
                  </button>
                  <button
                    onClick={() => {
                      this.downloadVideo();
                      this.props.openModal();
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {this.state.progressbarStatus && (
            <ProgressBar
              className="mr-4 mt-1"
              animated
              striped
              variant="info"
              now={100}
            />
          )}
        </div>
      </div>
    );
  }
}

export default List;
