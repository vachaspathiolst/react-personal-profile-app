import React, {forwardRef, useImperativeHandle, useReducer } from 'react'
const initState = {
    show: false,
    message: 'Default msg'
}
function msgReducer (state, action) {
    switch (action.action) {
        case 'SHOWMSG':
            return {
                show: true,
                message: action.message
            }
        case 'HIDEMSG':
            return {
                show: false,
                message: 'Default msg'
            }
        default:
            return state
    }
}
const HeaderAlert = forwardRef((props, ref) => {
    const [state, dispatch] = useReducer(msgReducer, initState)
    useImperativeHandle(ref, () => ({
        hideMessageFn () {
            dispatch({action: 'HIDEMSG'})
        },
        showMsgFn(msg){
            dispatch({action: 'SHOWMSG', message: msg})
        }
    }))
    if (state.show === false) return <div></div>
    return (
        <div className="alert-message info">
            <div style={{width:'90%'}}>{state.message}</div>
            <button className='alert-btn btn btn-small info' onClick={() => {dispatch({action: 'HIDEMSG'})}}>Close</button>
        </div>
    )
})
export default HeaderAlert