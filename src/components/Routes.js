import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import BavariaHome from "./bavaria/BavariaHome";
import FDAHome from "./fda/FDAHome";
import JHHome from "./janehopkins/JHHome";
import JHTable from "./janehopkins/JHTable";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/Bavaria" element={BavariaHome}/>
                <Route path="/FDA" element={FDAHome}/>
                <Route path="/JH" element={JHHome}/>
                <Route path="/JHTable" element={JHTable}/>
            </Switch>
        </BrowserRouter>
    )

}

export default Routes;