import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          order: []
        };
    }
    render() {
        let cart = this.props.order.cart
        return (
            <Modal isOpen={this.props.modal} toggle={() => this.props.toggle()}>
                <ModalHeader toggle={() => this.props.toggle()}>Orden {this.props.order.status === 'pending' ? 'Pendiente' : 'Confirmada'}</ModalHeader>
                <ModalBody>
                <Table responsive>
                        <thead>
                        <tr>
                            <th>Nombre de Producto</th>
                            <th>Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart ? (
                            cart.map((v, key) => <tr key={key}><td>{v.name}</td><td>{v.price}</td></tr>)
                        ): <tr><td>No hay nada</td></tr>} 
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total a Pagar </th>
                                <th>$ {this.props.order.total}</th>
                            </tr>
                        </tfoot>
                </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.props.toggle()}>Ok</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalProduct;