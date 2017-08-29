import React, { Component } from 'react';
import NavigationBar from '../../components/navigation';


class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <NavigationBar/>
                </div>
                <div className="jumbotron">
                    <h2>About</h2>
                </div>
                <div className="row">
                    <p className="lead">I am a doctor and such and such</p>
                </div>
            </div>
        );
    }
}

export default About;
