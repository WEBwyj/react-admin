import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// 引用组件
import Login from './views/login/Index';
import Index from './views/index/Index';
// 引用私有组件
import PrivateRouter from './components/privateRouter/Index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact render={()=> <Login/>} path="/" />
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
