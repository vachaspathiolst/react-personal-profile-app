
// src/FileList.js
import '../App.css'
import '../css/videopage.css'
import { listAllVideoFiles } from '../firebase/firebaseCrud'
import React, { useEffect, useState } from 'react';
import ResponsiveNavBar from './ResponsiveNavBar'
import VideoPlayer from './VideoPlayer';
import useAuth from './hooks/useAuth ';

const VideoFilesList = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedfile, setSelectedfile] = useState({
    name: '',
    url: '',
    exlink: false
  })
  const userStatus = useAuth()
  const ExternalLinks = [
    {
        url: 'https://www.youtube.com/embed/S9g_7dUJLzM?controls=0&amp;start=180',
        title: "10 Figma Updates You Don't Want to Miss (2023)"
    },
    {
        url: 'https://www.youtube.com/embed/_K06Dni-RE4?controls=0&amp;start=180',
        title: "UI Design Tutorial For Beginners"
    }
  ]
  const selectVideo = (item, exlink) => {
    setSelectedfile({
        name: item.name ? item.name : item.url,
        title: item.title ? item.title : 'Title',
        exlink: exlink ? exlink : false
    })
  }
  useEffect(() => {
    // Function to list files in Firebase Storage folder
    const listFilesInFolder = async () => {
      try {
        // const folderRef = getVideoFilesRef; // Replace with your actual folder path
        const listResult = await listAllVideoFiles();
        setFileList(listResult.items);
      } catch (error) {
        console.error('Error listing files:', error);
      }
    };

    listFilesInFolder();
  }, []);
  return (
    <>
      <ResponsiveNavBar />
      {userStatus ?
      <>
      <div className="page-container navbar-top-margin">
    <div className="main-video-item">
    { selectedfile.name !== '' ? <VideoPlayer filePath={selectedfile.name} exlink={selectedfile.exlink} /> 
      : <div>No video selected
        <div className='info-banner'><h5>Select a video to play</h5></div>
      </div>
    }
    </div>
    <div className="video-item-list">
        <h6 className='video-section-header'>My Videos</h6>
    {fileList.map((file) => (
        <div key={`uploaded-video-link-${file.name}`} className={`video-item ${(selectedfile.name === file.name) ? 'active-item' : ''}`} onClick={() => {
            selectVideo(file, false)
        }}>
            <p className='video-title'>{(selectedfile.name === file.name) && <i className='fa fa-star-o fa-pulse'></i>}{file.name}</p>
        </div>))
    }
        <h6 className='video-section-header'>Youtube Videos</h6>
    {ExternalLinks.map((file) => (
        <div key={`ext-video-link-${file.title}`} className={`video-item ${(selectedfile.name === file.url) ? 'active-item' : ''}`} onClick={() => {
            selectVideo(file, true)
        }}>
             <p className='video-title'>{(selectedfile.name === file.url) && <i className='fa fa-star-o fa-pulse'></i>}{file.title}</p>
        </div>))
    }
      
    </div>
  </div>
    </>
    :
    <div className='info-banner' style={{marginTop: '100px'}}> Please login to view videos.
    </div>
    }
    </>
  );
};

export default VideoFilesList;