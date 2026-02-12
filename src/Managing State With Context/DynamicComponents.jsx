import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';

const MyApp = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path='/' component={LandingPage} />
      <Route path='/register' component={SignUpPage} />
      <Route path='/login' component={SignInPage} />

      <Footer />
    </div>
  </Router>
);

export { MyApp }