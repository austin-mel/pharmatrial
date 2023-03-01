import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'

function FDAHome() {
    return (
        <div className="fdahome">
            <div className="fdaheader">
                <img src="https://www.fda.gov/media/99788/download"></img>
            </div>

            <div className="row">
                <div className="menucolumn"><MenuBar/></div>
                <div className="column"><h2>Test</h2></div>
                <div className="column"><h2>Test</h2><AddPatient/><h2>Test</h2></div>
            </div>

            <div className="footer">
                <p>Footer</p>
            </div>
        </div>
    )
}

export default FDAHome