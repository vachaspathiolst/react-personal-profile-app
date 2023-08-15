// src/VideoPlayer.js

import React, { useEffect, useState } from 'react';
import { getDownloadUrlVideo } from '../firebase/firebaseCrud';

const VideoPlayer = ({ filePath, exlink }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Function to get video URL from Firebase Storage
    if (exlink) {
        setVideoUrl(filePath);
    } else {
        const getVideoUrl = async () => {
            try {
                const videoDownloadUrl = await getDownloadUrlVideo(filePath);
                setVideoUrl(videoDownloadUrl);
            } catch (error) {
                console.error('Error getting video URL:', error);
            }
        };
        getVideoUrl();
    }

  }, [filePath]);

  return (
    <>
      {videoUrl ? (
        exlink ? 
        <div className='video-container'>
            <iframe className="iframeCls"  width="560" height="315" src={videoUrl} fullScreen title="YouTube video player" allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`} allowFullScreen />
        </div>
        :
        <div>
        <video controls width="100%">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
      ) : (
        <div>
            <p>Loading video...</p>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
