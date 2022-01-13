import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

//Component creates a sign up page for users that are not authenticated
class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName:'',
        emailAddress: '',
        password: '',
        confirmedPassword: '',
        errors: []
      }
      render() {
          const {
              firstName,
              lastName,
              emailAddress,
              password,
              confirmedPassword,
              errors
          }= this.state;

       // Renders form
       return(
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmedPassword" 
                  name="confirmedPassword"
                  type="password"
                  value={confirmedPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
       )   
      }

      change = e => {
          const name = e.target.name;
          const value = e.target.value;

          this.setState(() => {
              return {
                  [ name ]: value
              }
          })
      }

      submit = () => {
          const { context } = this.props;
          const {
              firstName,
              lastName,
              emailAddress,
              password,
              confirmedPassword
          } = this.state;

          // Creates user
          const user = {
              firstName,
              lastName,
              emailAddress,
              password,
              confirmedPassword
          }
          
          // Catches and displays errors
          context.data.createUser(user)
          .then(errors => {
              if (errors.length) {
                  this.setState({errors});
                  console.log(errors);
              } else {
                  context.actions.signIn(emailAddress, password)
                  .then(() => {
                      this.props.history.push('/');
                      console.log(`${emailAddress} was succesfully signed up a new user!`);
                  })
                  .catch(error => {
                      this.props.history.push('/error')
                      console.log(error);
                  })
              }
          })

          }
          cancel = () => {
            this.props.history.push('/');
      }
}
    


export default UserSignUp