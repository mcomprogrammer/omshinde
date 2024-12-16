import React, { useState } from 'react';
import ReactPlayer from 'react-player'; // ReactPlayer library for video rendering
import './Videos.css';

const Video = () => {
  const [videos] = useState([
    { title: 'Learning Letters', src: 'https://www.youtube.com/watch?v=hq3yfQnllfQ', isYouTube: true },
    { title: 'Learning Numbers', src: 'https://www.youtube.com/watch?v=D0Ajq682yrA', isYouTube: true },
  ]);

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const changeVideo = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div className="video-container">
      <div className="video-player">
        <h2>{currentVideo.title}</h2>
        {currentVideo.isYouTube ? (
          <ReactPlayer
            url={currentVideo.src}
            controls
            className="react-player"
            width="100%"
            height="100%"
          />
        ) : (
          <video controls autoPlay className="video-element">
            <source src={currentVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="video-list">
        <h3>Available Videos</h3>
        <ul>
          {videos.map((video, index) => (
            <li
              key={index}
              className={`video-item ${video.title === currentVideo.title ? 'active' : ''}`}
              onClick={() => changeVideo(video)}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Video;
