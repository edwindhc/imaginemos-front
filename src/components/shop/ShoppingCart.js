import React, { Component } from 'react';
import { Table, Container, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getShoppingCart, getRefreshCart, generateOrder } from '../../actions/shoppingCart'
import { textAlert } from '../../actions/alerts'
import { deleteProduct } from '../../actions/shoppingCart'
import { Alert } from 'reactstrap';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cart: [],
        alert: false,
        textAlert: ''
    }
  }

  async deleteProduct(id){
    await this.props.deleteProduct(id);
    this.setState({textAlert: 'Producto Eliminado'})
    this.onShowAlert()
  }

  async componentDidMount(){
    await this.props.getShoppingCart();
  }

  async orderGeneration(data){
    const { cart } = this.props

    this.setState({cart})
    await this.props.generateOrder(cart)
    await this.props.getShoppingCart();
    this.setState({textAlert: 'Orden Generada'})
    this.onShowAlert()
  }

  onShowAlert = ()=>{
    this.setState({alert:true},()=>{
      window.setTimeout(()=>{
        this.setState({alert:false})
      },2000)
    });
  }

  render() {
      const {cart, totalToPay} = this.props.cart;
    return (
      <div className='shoppingCartPage'>
          <Container>
              <Col xs='12' sm='12' className='title'>
                <h2>Carrito de Compras</h2>
                <Button onClick={() => this.orderGeneration()}>Generar Orden</Button>
              </Col>
              <Col xs='12' sm='12'>
              <Table responsive>
                <thead>
                  <tr>
                      <th>#</th>
                      <th>Nombre de Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      cart.length ? (
                        cart.map((c, key) => {
                                return <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{c._doc.name}</td>
                                            <td>{c._doc.stock}</td>
                                            <td>$ {c._doc.price}</td>
                                            <td onClick={() => this.deleteProduct(c.id)}><span className="fa fa-trash delete"></span></td>
                                        </tr>
                           })
                        ) : (
                            <tr>
                              <td colSpan='5'>No tiene productos en tu carrito</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan='4'>Total a Pagar </th>
                    <th>$ {totalToPay}</th>
                  </tr>
                </tfoot>
            </Table>
              </Col>
          </Container>

          <div className='alert'>
            {<Alert color="success" isOpen={this.state.alert}>
                <h4 className="alert-heading"><span className='fa fa-check-circle success'> </span> {this.state.textAlert}</h4>
            </Alert>}
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    generateOrder: (data) => dispatch(generateOrder(data)),
    deleteProduct: (id) => {dispatch(deleteProduct(id))},
    getShoppingCart: () => dispatch(getShoppingCart()),
    getRefreshCart: () => dispatch(getRefreshCart()),
    textAlert: (message) => dispatch(textAlert(message)),
  })
}

const mapStateToProps = state => ({
  textAlertI: state.authentication.alert,
  cart: state.shoppingCart
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);