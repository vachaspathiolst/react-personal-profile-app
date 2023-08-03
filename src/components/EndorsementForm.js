import React, { useState } from "react";
import {addSkillEndorsementDoc} from '../firebase/firebaseCrud'
import {fetchEndorsements} from '../reducers/endorsementsSlice'
import * as DOMPurify from 'dompurify';
import { useDispatch } from "react-redux";
export default function EndorsementForm () {
    // const headerAlertRef = useRef(null)
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const [endorsement, setEndorsement] = useState('')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const endorsementCln = DOMPurify.sanitize(endorsement, { USE_PROFILES: { html: true } });
        const titleCln = DOMPurify.sanitize(title, { USE_PROFILES: { html: true } });
        const organisationCln = DOMPurify.sanitize(organisation, { USE_PROFILES: { html: true } });
        setEndorsement(endorsementCln)
        setTitle(titleCln)
        setOrganisation(organisationCln)
        if (endorsementCln === '' || titleCln === '') {
            setAlertMsg('enter plain text')
            return false
        }
        if (endorsement !== undefined && endorsement !== null && endorsement !== '' &&
            title !== undefined && title !== null && title !== ''
        ) {
            // cleaning
            //
            
            setFormLoading(true)
            setAlertMsg('Please wait...')
            const resp = await addSkillEndorsementDoc({
                endorsement: endorsementCln,
                name,
                title: titleCln,
                organisation: organisationCln
            })
            if (resp === 'SUCCESS') {
                setEndorsement('')
                setName('')
                setTitle('')
                setOrganisation('')
                setAlertMsg('Endorsement added!')
                setTimeout(() => {
                    setAlertMsg('')
                }, 2000);
                setShowForm(false)
            }
            setFormLoading(false)
            dispatch(fetchEndorsements())
        }
    }
    return (
        <>
        <div className="d-flex justify-start">
        <button className="btn btn-small info" style={{marginLeft: '20px'}} onClick={() => {
            setShowForm(true)
        }}><i className="fa fa-plus"></i> Add an Endorsement</button>
        </div>
        
        {showForm &&
        <>
            <div id="ndorsementmodal" className="modal" style={{ display: showForm ? 'block' : 'none' }}>
    
            <div className="modal-content">
                <form className="endorsement-form" name="endorsementForm" onSubmit={handleSubmit}>
                <div className="modal-header">
                    <span className="close" onClick={() => setShowForm(false)}>&times;</span>
                    <h4>Endorsement</h4>
                </div>
                <div className="modal-body">
                    <textarea placeholder="Type endorsement.." name="msg" required value={endorsement} onChange={(e) => {
                        setEndorsement(e.target.value)
                    }}></textarea>
                    <input type="text" placeholder="Type your name" name="name" required value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Type your occupation / designation / title" name="title" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Type your organisation" name="organisation" value={organisation} onChange={(e) => {
                        setOrganisation(e.target.value)
                    }}></input>
                </div>
                <div className="modal-footer align-btns-right">
                    <button className="cancelbtn" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="signupbtn" disabled={formLoading}>Submit</button>
                </div>

                {alertMsg !== '' && <div className="info">
                        {alertMsg}
                    </div>
                }
                </form>
            </div>
        </div>
        </>
        }
        </>
    )
}