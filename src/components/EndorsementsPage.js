// import React, { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux'
import EndorsementForm from './EndorsementForm'
import ResponsiveNavBar from './ResponsiveNavBar'

export default function EndorsementsPage () {
    // const [profile, setProfile] = useState(null)
    const endorsementsSelector = state => state.endorsements
    const {endorsements} = useSelector(endorsementsSelector)
    // const navigate = useNavigate();

    return (
        <>
        <ResponsiveNavBar back />
        <div className='app-dark-bg navbar-top-margin'>
            <h5 style={{color: '#fff', marginBottom: '5px'}}>Endorsements</h5>
            <EndorsementForm />
            {endorsements.length === 0 && <>
            <div className="info-bg body-2">No Endorsements yet</div>
            </>}
            {
                endorsements &&
                endorsements.map(item => {
                    return <div key={`endorsement-id-${item.id}`} className="testimonial-container">
                    <div><div className="avatar">{item.name[0]}</div><span className="name">{item.name}</span> <span className="title">{item.title}</span> at <span className="organisation">{item.organisation}</span>.</div>
                    <div>{item.endorsement}</div>
                    <div className="time-stamp"><i className="fa fa-calendar-check-o"></i>{item.time_stamp}</div>
                    </div>
                })
            }
        </div>
        </>
    )
}
/*

endorsement "endorsement one"
(string)
name "name"
organisation "sdf"
time_stamp "Sat Jan 14 2023 03:12:08 GMT+0530 (India Standard Time)"
title "titler" 
*/