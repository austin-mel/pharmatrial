import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    return ( 
        <div className="Menu">
            <div className="container">
                <button type="button" class="button">
                    ☰
                </button>
                <div className="dropdown">
                    <ul>
                        <li><Link to ="/bavariahome">Bavaria</Link></li>
                        <li><Link to ="/jhhome">Jane Hopkins</Link></li>
                        <li><Link to ="/fdahome">FDA</Link></li>
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;