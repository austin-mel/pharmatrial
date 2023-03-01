import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'

function BavariaHome() {
    return (
        <div className="bavariahome">
            <div className="bavariaheader">
                <img src="https://i.imgur.com/xYI3rCe.png"></img>
            </div>

            <div className="row">
                <div className="menucolumn"><MenuBar/></div>
                <div className="column"><h2>Test</h2></div>
                <div className="column"><h2>Test</h2><AddPatient/><h2>Test</h2></div>
                <div className="column"><h2>Test</h2><AddPatient/><h2>Test</h2></div>
            </div>

            <div className="footer">
                <p>Footer</p>
            </div>
        </div>
    )
}

export default BavariaHome