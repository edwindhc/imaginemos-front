import React, { Component } from 'react';
import {Col,Button, CardBody, CardTitle, CardText, CardSubtitle, Card} from 'reactstrap';
import ReactImageAppear from 'react-image-appear';
import {connect} from 'react-redux';
import { addProduct } from '../../actions/shoppingCart'



class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addToCart(product){
        this.props.addProductToCart(product)
    }
    render() {
        const { category, name, price, picture } = this.props.product;
        return (
            <Col md='3' sm='6'>
                <Card>
                <ReactImageAppear
                src={picture}
                animation="zoomIn"
                animationDuration="1s"
            />
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardSubtitle>{category}</CardSubtitle>
                        <CardText>${price}</CardText>
                        <Button onClick={() => this.addToCart(this.props.product)}><span className="fa fa-shopping-cart"></span> Agregar</Button>
                    </CardBody>
                </Card>
             </Col>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return({
      addProductToCart: (product) => {dispatch(addProduct(product))}
    })
  }
  const mapStateToProps = state => ({
    authentication: state.authentication,
    user: state.users.users,
    products: state.products.products
  })

export default  connect(mapStateToProps, mapDispatchToProps)(CardItem);