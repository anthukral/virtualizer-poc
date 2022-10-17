import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { createFrontloadState, frontloadServerRender } from 'react-frontload'
import {StaticRouter} from "react-router-dom/server"
import createDocument from './document';
import App from '../shared/App';
import {makeApiCall} from "../shared/helpers/apis"
/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {

    const api= async(id, page)=>{
        
       
        return  await makeApiCall(id, page);
    };
    const frontloadState = createFrontloadState.server({
        // inject server impl of api for use in data loading functions.
        // might make SQL queries directly instead of making HTTP calls if those
        // endpoints are on this same server
        context: { api: api }
      });

  
    const { rendered, data } = await frontloadServerRender({
        frontloadState,
        render: () => ReactDOM.renderToString(   
             <StaticRouter location={req.url}>
            <App frontloadState={frontloadState} />
            </StaticRouter>)
    })
    const appString =rendered
    const helmet = Helmet.renderStatic();
    const chunkNames = flushChunkNames();
    const { js, styles } = flushChunks(clientStats, { chunkNames });
    const document = createDocument({
        appString,
        js,
        styles,
        helmet,
        data
    });

    res.set('Content-Type', 'text/html').end(document);

};
