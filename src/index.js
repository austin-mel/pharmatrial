import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BavariaHome from './components/bavaria/BavariaHome';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JHHome from './components/janehopkins/JHHome';
import FDAHome from './components/fda/FDAHome';

const router = createBrowserRouter([
  {
    path: "bavariahome",
    element: <BavariaHome/>,
  },
  {
    path: "fdahome",
    element: <FDAHome/>,
  },
  {
    path: "jhhome",
    element: <JHHome/>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


