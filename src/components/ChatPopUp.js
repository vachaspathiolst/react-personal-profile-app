import React, { useState, useRef } from "react";
import {sendMessage} from '../firebase/firebaseCrud'
import HeaderAlert from '../components/HeaderAlert';
import * as DOMPurify from 'dompurify';

export default function ChatPopUp () {
    const headerAlertRef = useRef(null)
    const [chatWinOpen, setChatWinOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [senderEmail, setSenderEmail] = useState('')
    const [sender, setSender] = useState('')
    const [contact, setContact] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const messageCln = DOMPurify.sanitize(message, { USE_PROFILES: { html: true } });
        const senderCln = DOMPurify.sanitize(sender, { USE_PROFILES: { html: true } });
        const contactCln = DOMPurify.sanitize(contact, { USE_PROFILES: { html: true } });
        setMessage(messageCln)
        setSender(senderCln)
        setContact(contactCln)
        if (messageCln === '' || senderCln === '') {
            headerAlertRef.current.showMsgFn('Enter plain text')
            return false
        }
        if (message !== undefined && message !== null && message !== '' &&
            sender !== undefined && sender !== null && sender !== ''
        ) {
            // cleaning
            //
            
            setFormLoading(true)
            headerAlertRef.current.showMsgFn('Sending Message...')
            const resp = await sendMessage({
                message: messageCln,
                senderEmail,
                sender: senderCln,
                contact: contactCln
            })
            if (resp === 'SUCCESS') {
                setMessage('')
                setSenderEmail('')
                setSender('')
                setContact('')
                headerAlertRef.current.showMsgFn('Message sent')
                setTimeout(() => {
                headerAlertRef.current.hideMessageFn()
                }, 2000);
            }
            setFormLoading(false)
        }
    }
    return (
        <>
        <button className="open-button" onClick={() => {
            setChatWinOpen(true)
        }}><i className="fa fa-send"></i>Send Message</button>
        
        <div className="chat-popup" id="myForm" style={{ 'display': chatWinOpen ? 'block' : 'none' }}>
                <form action="/action_page.php" className="form-container" onSubmit={handleSubmit}>
                    <div><label>Message</label></div>
                    <textarea placeholder="Type message.." name="msg" required value={message} onChange={(e) => {
                        setMessage(e.target.value)
                    }}></textarea>
                    <div><label>Email</label></div>
                    <input type="email" name="email" required value={senderEmail} onChange={(e) => {
                        setSenderEmail(e.target.value)
                    }} />
                    <div><label>Name</label></div>
                    <input type="text" name="sender" required value={sender} onChange={(e) => {
                        setSender(e.target.value)
                    }} />
                    <div><label>Phone</label></div>
                    <input type="text" name="contact" required value={contact} onChange={(e) => {
                        setContact(e.target.value)
                    }} />

                    <button type="submit" className="btn" disabled={formLoading}>Send</button>
                    <button type="button" className="btn cancel" onClick={() => {
                        setChatWinOpen(false)
                    }}>Close</button>
                </form>
                <HeaderAlert ref={headerAlertRef} />
            </div>
        </>
    )
}