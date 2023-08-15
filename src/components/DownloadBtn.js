import '../App.css';
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {downloadFileUrlAnchorTag, postVisitorInfo} from '../firebase/firebaseCrud'
import useAuth from './hooks/useAuth ';
import { Link } from "react-router-dom";
const ModalCmp = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [purpose, setPurpose] = useState('')
    const userStatus = useAuth()
    useImperativeHandle(ref, () => ({
        showModalFn () {
            setShowModal(true)
        },
        hideModalFn(){
            setShowModal(false)
        }
    }))
    const downloadDoc = async () => {
        setFormLoading(true)
        postVisitorInfo({
            name: name,
            email: email,
            phone: phone,
            purpose: purpose
        })
        const resp = await downloadFileUrlAnchorTag('Resume_Vachaspathi D_07022023.pdf')
        if (resp === 'SUCCESS') {
            setFormLoading(false)
            setShowModal(false)
        }
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        downloadDoc()
    }
    if (showModal) {
        return (<>
    
            <div id="myModal" className="modal" style={{ display: showModal ? 'block' : 'none' }}>
    
            <div className="modal-content" style={{width: '300px'}}>
                {userStatus ?
            <form name="downloadform" onSubmit={handleSubmit}>
                <div className="modal-header">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h4>Please provide your information</h4>
                </div>
                <div className="modal-body" style={{display: 'flex', flexDirection:'column'}}>
                    <input type="text" placeholder="Name / organisation" style={{margin: '10px', width: '200px'}} required onChange={(e) => {
                        setName(e.target.value)
                    }}></input>
                    <input type="email" placeholder="Contact Email" style={{margin: '10px', width: '200px'}} required onChange={(e) => {
                        setEmail(e.target.value)
                    }}></input>
                    <input type="tel" placeholder="Phone" style={{margin: '10px', width: '200px'}} required maxLength={12} onChange={(e) => {
                        setPhone(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Purpose" style={{margin: '10px', width: '200px'}} required maxLength={12} onChange={(e) => {
                        setPurpose(e.target.value)
                    }}></input>
                </div>
                <div className="modal-footer" style={{textAlign:'right'}}>
                    <button className="btn btn-small info" onClick={() => setShowModal(false)}>Close</button>
                    <button type="submit" className="signupbtn btn btn-small info" disabled={formLoading}>Download</button>
                </div>
            </form>
            :
            <>
            <div className="info-banner">
                <span className="close float-right" style={{color: '#333', padding: '5px'}} onClick={() => setShowModal(false)}>&times;</span>
                <p>Please Login to Download Document

                </p>
            </div>
            <Link to="/authenticateuser/login" className="float-right" style={{ color: '#333', textDecoration: 'underline', marginRight: '10px' }}>Login</Link>
            </>
            }
            </div>
    
            </div>
            </>
        )
    } else {
        return <button onClick={() => {
            setShowModal(true)
        }} className="btn btn-small info download-resume-btn btn-border-colors"><i className="fa fa-download"></i>Resume</button>
    }
})
export default ModalCmp