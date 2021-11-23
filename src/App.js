import './App.css';
import {Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Search from './pages/Search';
import Archives from './pages/Archives';
import NewPost from './pages/NewPost';

import Header from './components/Header';
import ScrollUp from './components/ScrollUp';

import hocAuth from './utilities/hocAuth';
import EditPost from './pages/EditPost';

import NoService from './pages/NoService';

import Footer from './components/Footer';


// APP
// Contient les différentes Routes d'accès aux pages
// Sécurisé par un HOC d'Authentification (hocAuth)

function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <Switch>
          <Route exact path="/"  component={hocAuth(Home)}/>
          <Route exact path="/about" component={hocAuth(About)}/>
          <Route exact path="/post/:id" component={hocAuth(PostDetail)}/>
          <Route exact path="/search" component={hocAuth(Search)}/>
          <Route exact path="/archives" component={hocAuth(Archives)}/>
          <Route exact path="/login" component={hocAuth(Login)}/>
          <Route exact path="/logout" component={hocAuth(Logout)}/>
          <Route exact path="/register" component={hocAuth(Register)}/>
          <Route exact path="/newPost" component={hocAuth(NewPost, true)}/>
          <Route exact path="/editPost/:id" component={hocAuth(EditPost, true)}/>
          <Route exact path="/noService" component={NoService}/>
          <Redirect to="/"/>
        </Switch>
        <ScrollUp/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
