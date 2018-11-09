import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './Login';
import ArtistAlbums from "./ArtistAlbums";
import ArtistSearch from "./ArtistSearch";

const appRoutes = [
  {
    exact: true,
    path: "/",
    component: Login
  },
  {
    exact: false,
    path: "/artistSearch",
    component: ArtistSearch
  },
  {
    exact: false,
    path: "/artistAlbum/:albumId/:albumName",
    component: ArtistAlbums
  }
];

class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRoutes = (routes) => {
        let allRoutes = [];
        routes.map((route,index) => {
            let exact = route.exact ? true : false;
            allRoutes.push(
                <Route
                    exact={exact}
                    path={route.path}
                    component={route.component}
                    key={index}
                    {...this.props}
                />
            );
        })
        return allRoutes;
    }

    render(){
        return <div>{this.renderRoutes(appRoutes)}</div>
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>,
    document.getElementById('spotify-react')
);
