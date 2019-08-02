'use strict'

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';

const Container = () => {
    return(
        <Switch>
            {/* TODO: CREATE COMPONENTS FOR PATHS */}
            <Route path="/api/home" component = {(Home)} /> 
            <Route path="/api/register" />
            <Route path="/api/logout" /> 
        </Switch>
    );
}

export default Container;
