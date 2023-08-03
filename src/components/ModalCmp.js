import React, { forwardRef, useImperativeHandle, useState } from "react";
const ModalCmp = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false)
    useImperativeHandle(ref, () => ({
        showModalFn () {
            setShowModal(true)
        },
        hideModalFn(){
            setShowModal(false)
        }
    }))
    if (showModal) {
        return (<>
    
            <div id="myModal" className="modal" style={{ display: showModal ? 'block' : 'none' }}>
    
            <div className="modal-content">
                <div className="modal-header">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h4>{props.header}</h4>
                </div>
                <div className="modal-body">
                {props.children}
                </div>
                <div className="modal-footer" style={{textAlign:'right'}}>
                    <button className="btn info" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
    
            </div>
            </>
        )
    } else {
        return ''
    }
})
export default ModalCmp