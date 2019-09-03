import React, { Component } from 'react';
import ProductList from '../ProducList'
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state = {  }
    render() {
        return (
            <div>
                <ProductList />
            </div>
        );
    }
}

export default withRouter(Home);