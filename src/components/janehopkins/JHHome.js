import React from 'react'
import App from '../../App'
import AddPatient from '../AddPatient'
import MenuBar from '../MenuBar'
import Login from './Login'

function JHHome() {
    return (
        <div className="jhhome">
            <div className="jhheader">
                <img src="https://i.imgur.com/9xdqAdI.png"></img>
            </div>

            <div className="row">
                <div className="menucolumn"><MenuBar/></div>
                <div className="column"><Login/></div>
            </div>

            <div className="footer">
                <p>Footer</p>
            </div>
        </div>
    )
}

export default JHHome