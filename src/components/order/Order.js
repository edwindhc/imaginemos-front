import React, { Component } from 'react'
import { Table, Container, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getMyOrders } from '../../actions/orders'
import Moment from 'react-moment';
import ModalProduct from './ModalProduct'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleModal: false,
            modal: false,
            order: []
        }
    }

    async componentDidMount() {
        await this.props.getMyOrders()
    }

    toggle(c = []) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            order: c
        }));
    }
    render() {
        const { orders } = this.props
        return (
            <div className='orderPage'>
                <Container>
                    <Col xs='12' sm='12' className='title'>
                        <h2>Ordenes de compra</h2>
                    </Col>
                    <Col xs='12' sm='12'>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Numero de productos</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                                {
                                orders.length ? (
                                    orders.map((c, key) => {
                                            return <tr key={key} onClick={() => this.toggle(c)}>
                                                        <th scope="row">{key + 1}</th>
                                                        <td>{c.cart.length}</td>
                                                        <td>$ {c.total}</td>
                                                        <td><Moment format="DD/MM/YYYY">{c.createdAt}</Moment></td>
                                                        <td>{c.status === 'pending' ? 'Pendiente' : "Confirmada"}</td>
                                                    </tr>
                                    })
                                    ) : (
                                        <tr>
                                        <td colSpan='5'>No tienes ordenes registradas</td>
                                        </tr>
                                    )
                                }
                        </tbody>
                    </Table>
                    </Col>
                </Container>
                <ModalProduct toggle={() => this.toggle()} modal={this.state.modal} order={this.state.order} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return({
      getMyOrders: () => dispatch(getMyOrders()),
    })
  }

  const mapStateToProps = state => ({
    orders: state.order.orders
  })


export default connect(mapStateToProps, mapDispatchToProps)(Order);