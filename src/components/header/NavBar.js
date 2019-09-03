import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Badge } from 'reactstrap';
  import { connect } from 'react-redux';
  import { getUsers } from '../../actions/users'
  import { isLogged } from '../../helpers'
  import { getShoppingCart } from '../../actions/shoppingCart'


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      cart: []
    };
  }

  async componentDidMount(){
    const { auth } = this.props
    await this.props.getUsers();
    let status = isLogged(auth);
    if (status){
      await this.props.getShoppingCart();
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toClick(to){
    this.props.history.push('/');
  }
  render() {
      const { auth } = this.props
      const totalProductInCart = this.props.cart.length
      const userAuth = isLogged(auth)
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={require('../../assets/imaginamos-logo-morado.png')} alt="imaginamos logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="/">Inicio</Link>
                </NavItem>
                <NavItem>
                    <Link to="/orders">Ordernes</Link>
                </NavItem>
              { userAuth ? (
                <div>
                  <NavItem>
                    <Link to="/login"><span className='fa fa-arrow-circle-right'></span> Salir</Link>
                  </NavItem>
                </div>
              ) : (
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
              )
              }
              <NavItem>
                <Link to='/shoppingCart'>
                <Button >
                  <span className="fa fa-shopping-cart"></span> Carrito {totalProductInCart > 0 ? <Badge color="danger">{totalProductInCart}</Badge> : null}
                </Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    products: state.products.products,
    auth: state.authentication.user,
    cart: state.shoppingCart.cart
})

export default connect(mapStateToProps, {getUsers, getShoppingCart})(NavBar);