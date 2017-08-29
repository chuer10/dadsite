import React, { Component } from 'react';
import NavigationBar from '../../components/navigation';
import '../../style/app.css';


class ArticlePage extends Component {
    render() {
        return (
            <div className="container text-center">
                <NavigationBar/>
                <div className="jumbotron">
                    <h2 className="text-center" classID="articleHeader">Articles</h2>
                </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <h4>First Article</h4>
                            <p>fjdsoafnmioasdfnjo</p>
                            <a className="btn btn-secondary" role="button">See whole article »</a>
                        </div>
                        <div className="col-lg-4">
                            <h4>First Article</h4>
                            <p>fjdsoafnmioasdfnjo</p>
                            <a className="btn btn-secondary" role="button">See whole article »</a>
                        </div>
                        <div className="col-lg-4">
                            <h4>First Article</h4>
                            <p>fjdsoafnmioasdfnjo</p>
                            <a className="btn btn-secondary" role="button">See whole article »</a>
                        </div>
                    </div>
            </div>
        );
    }
}

export default ArticlePage;
