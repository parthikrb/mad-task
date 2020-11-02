import React, { lazy, Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import GlobalState from './hooks/useContext/GlobalState';
import { ProtectedRoute } from './routes/ProtectedRoute.js';
import { PublicRoute } from './routes/PublicRoute';
import ErrorBoundary from './HOC/ErrorBoundary/ErrorBoundary';
import Spinner from './components/Loader/Loader';

const SignIn = lazy(() => import('./layouts/Authentication'));
const Home = lazy(() => import('./layouts/Home'));
const NotFound = lazy(() => import('./views/PageNotFound/PageNotFound'));

const asyncComponent = Component => {
  return props => (
    <Suspense fallback={<Spinner active />}>
      <Component {...props} />
    </Suspense>
  );
}
const hist = createBrowserHistory();
function App() {
  return (
    <GlobalState>
      <ErrorBoundary>
        <Router history={hist}>
          <Switch>
            <PublicRoute exact path="/" component={asyncComponent(SignIn)} />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={asyncComponent(Home)}
            />
            <Route path="*" component={asyncComponent(NotFound)} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </GlobalState>
  );
}

export default App;