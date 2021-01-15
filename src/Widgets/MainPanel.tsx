import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ResultPanel } from './ResultPanel';

import { VotePanel } from './VotePanel';

export const MainPanel = () => <Switch>
    <Route exact path={["/", "/vote"]} component={VotePanel} />
    <Route path="/results" component={ResultPanel} />
    <Redirect to="/" />
</Switch>;