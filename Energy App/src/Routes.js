import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { MainRoute } from './routers';

import { MainLayout } from './layout';
import { NewMainLayout } from './layout'

const Login = lazy(() => import('./Pages/Home/Login'));
const DashboardPage1 = lazy(() => import('./Pages/Dashboard1'));
const DashboardPage2 = lazy(() => import('./Pages/Dashboard2'));
// const Maintenance = lazy(() => import('./Pages/Maintenance'));
const MainDevice = lazy(() => import('./Pages/MainDevice'));

const Routes = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
          />
          <MainRoute
            exact
            path="/device"
            layout={NewMainLayout}
            component={MainDevice}
          />
          <MainRoute
            exact
            path="/energy-meter-dashboard"
            layout={MainLayout}
            component={DashboardPage1}
          />
          {/* <MainRoute
            exact
            path='/Maintenance'
            layout={NewMainLayout}
            component={() =>
              window.location.replace("http://184.73.50.107:5252/Dashboard?LoginName=Operator")
            }
          /> */}
          {/* <MainRoute
            exact
            path='/Maintenance'
            layout={NewMainLayout}
            component={Maintenance}
          /> */}
          <MainRoute
            exact
            path="/energy-meter-real-time"
            layout={MainLayout}
            component={DashboardPage2}
          />

          <Route path="*" component={() => <center><h4>Invalid URL...</h4></center>} />
        
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;