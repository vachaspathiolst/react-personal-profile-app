import React from 'react';
import ResponsiveNavBar from './ResponsiveNavBar'
// import EndorsementForm from './EndorsementForm'

import { useSelector } from 'react-redux'

export default function ProjectsPage () {
    const projectsSelector = state => state.projects
    const {projects} = useSelector(projectsSelector)

    return (
        <>
        <ResponsiveNavBar back />
        {/* <div id="navbar" className="navbar">
            <button
            className="btn info float-left"
            type="button"
            onClick={() => {
                navigate(-1);
            }}
            >
            Back
            </button>
        </div> */}
        <div className='app-dark-bg navbar-top-margin'>
            <h5 style={{color: '#fff', marginBottom: '5px'}}>Projects</h5>
            {
                projects &&
                projects.map(item => {
                    return (<div key={`project-id-${item.sno}`} className="projects-wrapper">
                        <div className="testimonial-container project-card">
                            <div className="project-title">{item.project_name}</div>
                            <div className="org-name"><i className="fa fa-building"></i>{item.organisation_client}</div>
                            {item.proj_url && <div className="project-tech"><i className="fa fa-globe"></i><a href={item.proj_url} target="_blank" rel="noreferrer">{item.proj_url}</a></div>}
                            <div className="project-tech"><i className="fa fa-cogs"></i>{item.technology}</div>
                            <div className="project-description">{item.description}</div>
                        </div>
                    </div>)
                })
            }
        </div>
        </>
    )
}