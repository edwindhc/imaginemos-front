import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts } from '../actions/products'
import CardItem from './shop/CardItem'
import PaginationShop from './shop/PaginationShop'
import { withRouter } from 'react-router-dom';
import {Col} from 'reactstrap';
import Filter from './shop/Filter'

class ProductList extends Component {
    state = {
        products: [],
        total: 0,
        perPage:20,
        currentPage:1
    }
    static propTypes = {
        products: PropTypes.object
    }
    async componentDidMount(){
        await this.getAllProducts()
        this.setState({total: this.props.products.totals,products: this.props.products.data})
    };
    async getAllProducts(perPage = this.state.perPage, currentPage = this.state.currentPage, name = '', category = ''){

        const products = await this.props.getProducts(perPage, currentPage, name, category);
        this.setState({total: this.props.products.totals,products: this.props.products.data, currentPage})
        return products
    }

    render() {
        let prod = this.state.products.map((p,key) => <CardItem key={key} product={p} />)
        return (
            <div className='product'>
                <Col xs='12' sm='12' className='filter-box'>
                    <Col xs='9' sm='6' className='filter'>
                    <Filter
                        filter={this.getAllProducts.bind(this)}
                        perPage={this.state.perPage}
                        currentPage={this.state.currentPage}
                    />
                    </Col>
                    <Col xs='3' sm='6' className='total'>
                        {this.state.total} Productos
                    </Col>
                </Col>
                <Col md='12' sm='12' className='cardItem'>
                    {prod}
                </Col>
                <Col md='12' sm='12'>
                    <PaginationShop
                    paginate={this.getAllProducts.bind(this)}
                    totals={this.props.products.totals}
                    perPage={this.state.perPage}
                    currentPage={this.state.currentPage} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products
})

export default withRouter(connect(mapStateToProps, {getProducts})(ProductList));