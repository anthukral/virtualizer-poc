import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ListingPage from './components/Listing';
import { FrontloadProvider } from 'react-frontload'

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
export default function App(props){   
    return (   
          
            <ListingPage/>
        );
 
}
