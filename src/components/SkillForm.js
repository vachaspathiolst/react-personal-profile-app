import React, { useState, useRef } from "react";
import {addSkillDoc} from '../firebase/firebaseCrud'
import HeaderAlert from '../components/HeaderAlert';
import * as DOMPurify from 'dompurify';

export default function ChatPopUp ({skills, loadFn}) {
    const headerAlertRef = useRef(null)
    // experience_years, name, notes, specification
    // const [chatWinOpen, setChatWinOpen] = useState(true)
    const chatWinOpen = true
    const [skillName, setSkillName] = useState('')
    const [experienceYrs, setExperienceYrs] = useState('')
    const [notes, setNotes] = useState('')
    const [specification, setSpecification] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const skillNameCln = DOMPurify.sanitize(skillName, { USE_PROFILES: { html: true } });
        const experienceYrsCln = DOMPurify.sanitize(experienceYrs, { USE_PROFILES: { html: true } });
        const notesCln = DOMPurify.sanitize(notes, { USE_PROFILES: { html: true } });
        const specificationCln = DOMPurify.sanitize(specification, { USE_PROFILES: { html: true } });
        setSkillName(skillNameCln)
        setExperienceYrs(experienceYrsCln)
        setNotes(notesCln)
        setSpecification(specificationCln)
        if (skillNameCln === '') {
            headerAlertRef.current.showMsgFn('Enter plain text')
            return false
        }
        if (skillName !== undefined && skillName !== null && skillName !== '') {
            
            setFormLoading(true)
            headerAlertRef.current.showMsgFn('Saving Data ...')
            const resp = await addSkillDoc({
                name: skillNameCln,
                experience_years: experienceYrsCln,
                notes: notesCln,
                specification: specificationCln
            })
            if (resp === 'SUCCESS') {
                setSkillName('')
                setExperienceYrs('')
                setNotes('')
                setSpecification('')
                headerAlertRef.current.showMsgFn('Skill saved')
                setTimeout(() => {
                headerAlertRef.current.hideMessageFn()
                }, 2000);
            }
            setFormLoading(false)
            loadFn()
        }
    }
    return (
        <>
        {/* <button className="open-button" onClick={() => {
            setChatWinOpen(true)
        }}>Send Message</button> */}
        
        <div className="skill-popup" id="skillform" style={{ 'display': chatWinOpen ? 'block' : 'none' }}>
                <form action="/action_page.php" className="form-container" onSubmit={handleSubmit}>
                    <h3>Add Skill</h3>
                    <div><label>Skill</label></div>
                    <input type="text" name="skill" required value={skillName} onChange={(e) => {
                        setSkillName(e.target.value)
                    }} />
                    <div><label>Experience (yrs)</label></div>
                    <input type="text" name="experience" required value={experienceYrs} onChange={(e) => {
                        setExperienceYrs(e.target.value)
                    }} />
                    <div><label>Specification</label></div>
                    <input type="text" name="specification" required value={specification} onChange={(e) => {
                        setSpecification(e.target.value)
                    }} />
                    <div><label>Notes</label></div>
                    <textarea name="notes" required value={notes} onChange={(e) => {
                        setNotes(e.target.value)
                    }} />

                    <button type="submit" className="btn" disabled={formLoading}>Save</button>
                </form>
                <HeaderAlert ref={headerAlertRef} />
                <table>
                    <thead>
                        <tr>
                        <th>Skill</th>
                        <th>Experience in Years</th>
                        </tr>
                    </thead>
                <tbody>
                {
                skills.map(item => {
                        return <tr key={item.id}>
                            <td>{item.name}</td><td>{item.experience_years}</td>
                        </tr>
                    })
                }
                    </tbody>
                </table>
            </div>
        </>
    )
}