import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/index';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Affiliate from './pages/affiliate';
import AccountOverview from './pages/account-overview';
import Signin from './pages/signin';
import ResetPassword from './pages/reset-password';
import Signup from './pages/signup';
import ProtectedRoute from '../ProtectedRoutes';
// import ChatSupport from './pages/ChatSupport';
import Reset from './pages/reset';
import Verify from './pages/verify';

import { useAppContext } from '../AppContext';
class Index extends Component {
    render() {
        const { auth } = this.props;
        return (
            <>
                <BrowserRouter>
                        <Switch>
                            {/* Public Route */}
                            <Route path='/' exact component={Homepage} />
                            <Route path='/reset' component={Reset} />
                            <Route path='/reset-password/:userId/:resetString' component={ResetPassword} />
                            <Route path='/signin' component={Signin} />
                            <Route path='/signup/:referral?' component={Signup} />
                            <Route path='/verify/:userId/:uniqueString' component={Verify} />
                            

                        <div id="main-wrapper">
                            {/* Private Route */}
                            <ProtectedRoute path="/dashboard" component={Dashboard} auth={auth} />
                            <ProtectedRoute path='/wallet' component={AccountOverview} auth={auth} />
                            <ProtectedRoute path='/affiliate' component={Affiliate} auth={auth}/>
                            {/* <ProtectedRoute path='/chat-support' component={ChatSupport} auth={auth}/> */}
                            <ProtectedRoute path='/settings' component={Settings} auth={auth}/>
                        </div>
                        </Switch>
                </BrowserRouter>

            </>
        );
    }
}
function AppWrapper() {
    const { auth } = useAppContext();

    return <Index auth={auth} />;
}

export default AppWrapper;