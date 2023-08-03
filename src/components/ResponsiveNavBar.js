import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import LinkedInLink from './LinkedInLink'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import DownloadBtn from './DownloadBtn'
const profileSelector = state => state.profile

export default function SkillsPage (props) {
    const showBackBtn = props.back
    const navigate = useNavigate();
    const [width, setWindowWidth] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const {profile} = useSelector(profileSelector)
    useEffect(() => { 

        updateDimensions();

        window.addEventListener("resize", updateDimensions);     return () => 
        window.removeEventListener("resize", updateDimensions);
    }, [])
    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    return (
        <>
        { width > 700 ?
        (<div id="navbar" className="navbar">
            {showBackBtn ?
            <button
            className="btn menu-anchor-btn float-left"
            type="button"
            onClick={() => {
                navigate(-1);
            }}
            >
                <i className="fa fa-arrow-left"></i>
            </button> : <div className='btn menu-anchor-btn float-left' style={{marginLeft: 10}}></div>}
            <Link to="/" className="active">Home</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/endorsements">Endorsements</Link>
            {/* <a href={`personal-profile/public/resumes/Resume_Vachaspathi D_07022023.pdf`} download="Resume-VachaspathiD.pdf" target="_blank" rel="noreferrer"><i className="fa fa-download"></i>Resume</a> */}
            <DownloadBtn className="hand" />
            { profile && profile.display_name && <div className="btn menu-anchor-btn float-right nav-bar-display-name"><i className="fa fa-user"></i>{profile.display_name}</div>}
            <LinkedInLink className={'float-right'} />
        </div>) : (
            <>
            <div id="navbar" className="navbar">
                {showBackBtn &&
                <button
                className="btn menu-anchor-btn float-right float-left"
                type="button"
                onClick={() => {
                    navigate(-1);
                }}
                >
                    <i className="fa fa-arrow-left"></i>
                Back
                </button>}
                <button className="btn menu-anchor-btn float-right" onClick={(e) => {
                    e.preventDefault()
                    setShowMenu((v) => !v)
                }}><i className="fa fa-list"></i></button>
            </div>
            {
                showMenu &&
                <div className="open-menu-list-contianer">
                    <div>
                    { profile && profile.display_name && <div className="btn menu-anchor-btn"><i className="fa fa-user"></i>{profile.display_name}</div>}
                    </div>
                    <div>
                    <Link to="/" className="active">Home</Link>
                    </div>
                    <div>
                    <Link to="/skills">Skills</Link>
                    </div>
                    <div>
                    <Link to="/projects">Projects</Link>
                    </div>
                    <div>
                    <Link to="/endorsements">Endorsements</Link>
                    </div>
                    <div>
                    {/* <a href={`personal-profile/public/resumes/Resume_Vachaspathi D_07022023.pdf`} download="Resume-VachaspathiD.pdf" target="_blank" rel="noreferrer"><i className="fa fa-download"></i>Resume</a> */}
                    <DownloadBtn />
                    </div>
                    <div>
                    <LinkedInLink />
                    </div>
                </div>
            }
            </>
        )
        }
        </>
    )
}