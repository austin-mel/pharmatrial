import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BavariaHome from './components/bavaria/BavariaHome';
import JHHome from './components/janehopkins/JHHome';
import FDAHome from './components/fda/FDAHome';
import { ProSidebarProvider } from 'react-pro-sidebar';
import {createBrowserRouter, RouterProvider, BrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <JHHome/>,
  },
  {
    path: "Bavaria",
    element: <BavariaHome/>,
  },
  {
    path: "FDA",
    element: <FDAHome/>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <ProSidebarProvider>
    <RouterProvider router={router} />
  </ProSidebarProvider>
</React.StrictMode>);