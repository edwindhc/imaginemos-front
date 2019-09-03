import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import '../../App.scss';
import { loginUser, logout } from '../../actions/users'
import {connect} from 'react-redux';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom'
import {loggedUser} from '../../helpers'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      submitted: false,
      validate: {
        emailState: '',
        passwordState: ''
      },
    }
    this.props.logout();
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success';
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  validatePassword(e){
    const {password, validate} = this.state;
    password.length < 5 ? validate.passwordState = 'has-danger' : validate.passwordState = 'has-success';
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  submitForm(e) {
    e.preventDefault();

  this.setState({ submitted: true });

  const { email, password } = this.state;
    if (email && password) {
      this.props.login({email, password});
    }
  }
  isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
  }



  componentDidUpdate(){
    const { authentication } = this.props
    loggedUser(this.props,authentication,'/home')
  }

  render() {
    const {email, password, loading} = this.state
    return (
      <Container className="login">
        {!loading ? null : <Loading />}
        <h2>LOGIN</h2>
        <Col  xs="9" sm="3" className="login-form">
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={(e) => {
                  this.handleChange(e)
                  this.validateEmail(e)}
                  }
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                valid={ this.state.validate.passwordState === 'has-success' }
                invalid={ this.state.validate.passwordState === 'has-danger' }
                onChange={(e) => {this.handleChange(e)
                  this.validatePassword(e)}
                }
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button disabled={!email || !password}>LOGIN</Button>
        </Form>
        <p>
          <span>¿No tienes cuenta? </span>
          <Link to='/register'>¡Registrate Aqui!</Link>
          </p>
        </Col>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    logout: () => dispatch(logout()),
    login: (user) => {dispatch(loginUser(user))}
  })
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  login: loginUser.login,
  user: state.authentication.user,
  products: state.products.products
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);