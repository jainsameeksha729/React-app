import React, { Component, Fragment } from 'react';
import Timer from 'react-compound-timer';
import { ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { downloadClicked  : false}
    }
    render() { 
        const {cardTitle, progressEnable, onClickbtn , fileInfo , downloadProcess , downloadfailure , downloadSuccess , downlaodEndedTime ,progress , err, cancelDownload, pauseDownload, resumeDownload } = this.props;
        const { downloadClicked } = this.state;
        return (  <Fragment>
            <li class="cards_item">
            <div class="card">
              <div class="card_content">
                <h4>{cardTitle}</h4>
                <span className="mt-2">Filename</span>
                <h5 class="card_title">{fileInfo.Cookie.Filename}</h5>
                <span className="mt-2">Hash</span>
                <p class="card_text">{fileInfo.Cookie.Hash}</p>
                {progressEnable && downloadProcess && <ProgressBar className="mb-2" animated now={progress} max={100}/>}
                <button class="btn card_btn" onClick={()=>{
                    onClickbtn();
                    this.setState({ downloadClicked : true});
                  }}>
                   {downloadClicked && !downloadProcess && <span>Connecting Peers..</span>} 
                  { downloadProcess ? 
                  <span>Downloading ...
                      <Timer>
                        <Timer.Hours  formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    } />:
                        <Timer.Minutes    formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    } />: 
                        <Timer.Seconds    formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    }/>
                        </Timer>              
                    </span> : !downloadClicked && !downloadProcess && <span>Download</span>}
                  </button>
                  
                  {
                    downloadProcess && <button class="btn card_btn" onClick={()=>{
                      cancelDownload();
                      // this.setState({ downloadClicked : true});
                    }}>Cancle Download</button>

                  }
                  {
                    downloadProcess && <button class="btn card_btn" onClick={()=>{
                      pauseDownload();
                      // this.setState({ downloadClicked : true});
                    }}>Pause Download</button>
                    
                  }
                  {
                    downloadProcess && <button class="btn card_btn" onClick={()=>{
                      resumeDownload();
                      // this.setState({ downloadClicked : true});
                    }}>Resume Download</button>
                    
                  }
            
                {downloadSuccess && <div>
                          {`Downlaod Success in `}  <Timer initialTime={downlaodEndedTime} startImmediately={false}>
                        <Timer.Hours  formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    } />:
                        <Timer.Minutes    formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    } />: 
                        <Timer.Seconds    formatValue={(value) =>
                                      `${value < 10 ? `0${value}` : value}`
                                    }/>
                        </Timer>              
                    </div>}
    
                {downloadfailure && <div className="error-container">
                <span className="text-danger">{err ? err.toString() : `Failed to download file`}</span>
                  </div>}
    
                  { downloadProcess && <div style={{marginLeft:'-1rem'}} class="load-bar w-100 float-bottom position-absolute">
                      <div class="bar"></div>
                      <div class="bar"></div>
                      <div class="bar"></div> 
                    </div>}
              </div>
            </div>
          </li>
          </Fragment> );
    }
}
 
export default Card;