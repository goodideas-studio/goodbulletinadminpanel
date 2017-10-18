import React from 'react';
// import package
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

// import relative path
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';

// class MainComponent extends React.Component {
//   componentWillMount = () => {
//     import('./Home').then((Component) => {
//       this.Component = Component;
//       this.forceUpdate();
//     });
//   }
//   render = () => (
//     this.Component ? <this.Component.default /> : null
//   )
// }

const Main = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Main;
