import React, { Component } from 'react';
import NavigationBar from '../../components/navigation';


class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                        <NavigationBar/>
                </div>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Welcome to React</h2>
                </div>
            </div>
            </div>
        );
    }
}

export default Home;
