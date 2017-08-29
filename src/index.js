import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style/app.css';
import './style/bootstrap/css/bootstrap.min.css';
import './style/font-awesome-4.7.0/css/font-awesome.min.css'
import './style/font-awesome-4.7.0/fonts/fontawesome-webfont.svg';
import Home from './containers/home';
import registerServiceWorker from './registerServiceWorker';
import ArticlePage from "./containers/article-page/index";
import About from './containers/about/index';
import Login from "./containers/login/index";
import NewArticle from "./containers/newarticle/index";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/newarticle" component={NewArticle}/>
                <Route path="/loginpage" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/articles" component={ArticlePage} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
