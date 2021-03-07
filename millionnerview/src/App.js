
import './App.css';
import Cardholder from './components/Cardholder'
import Loginadmin from './components/Loginadmin'
import Loginuser from './components/Loginuser'
import Gifttable from './components/gifttable';
import Questiontable from './components/questiontable';
import Navbarcom from './components/navbar'
import Container from 'react-bootstrap/Container'
import Accountstable from './components/activationtable'
import Signupuser from './components/signUpuser'
import Userlanding from './components/userlanding';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
    <Router> 
          <Switch>
          <Route exact path="/">
            <Cardholder/>
          </Route>
           <Route exact path="/user">
            <Loginuser />
          </Route>
          <Route exact path="/admin">
            <Loginadmin loginfo="admin"/>
          </Route>
          <Route exact path="/gifts">
           <Container>
           <Navbarcom />
            <Gifttable />
            </Container>
          </Route>
             <Route exact path="/questions">
           <Container>
           <Navbarcom />
            <Questiontable />
            </Container>
          </Route>
          <Route exact path="/accounts">
          <Container>
          <Navbarcom />
          <Accountstable />
          </Container>
          </Route>
          <Route exact path="/signup">
          <Container>
          <Signupuser />
          </Container>
          </Route>
          <Route exact path="/userlanding">
            <Userlanding/>
          </Route>
        </Switch>
   </Router>
    </>
  );
}

export default App;
