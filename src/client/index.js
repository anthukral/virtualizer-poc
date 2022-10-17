import React from 'react';
import { hydrate } from 'react-dom';
import {createFrontloadState} from "react-frontload"
import App from '../shared/App';
import {BrowserRouter} from 'react-router-dom'
import { FrontloadProvider } from 'react-frontload'

/**
 * Renders a react component into the #react-root div container.
 * Since react 16, the `hydrate` method is used instead of `render` when dealing
 * with server side rendering.
 *
 * @param Component React component that should be rendered
 */


const render = (Component) => {
    const frontloadState = createFrontloadState.client({
        // inject client impl of api for use in data loading functions.
        // will probably make HTTP calls to the server  
        // hydrate state from SSR
        context:{},
        serverRenderedData: window._frontloadData
     });
    hydrate(
        <FrontloadProvider frontloadState={frontloadState}>

        <BrowserRouter>       <Component frontloadState={frontloadState}/></BrowserRouter>
        </FrontloadProvider>
        ,
        document.getElementById('react-root'),
    );
};

render(App);

/**
 * This script provides hot module reloading in development mode.
 */
if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/App', () => {
        const NextApp = require('../shared/App').default;
        render(NextApp);
    });
}
