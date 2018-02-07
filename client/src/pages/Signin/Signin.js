import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom';

import Jumbotron from "../../components/Jumbotron";
// import {SignUpLink} from '../SignUp';
// import PasswordForgetLink from '../PasswordForget';

// import API from "../../utils/API";

//may need signup link and password forget link

import { Col, Row, Container } from "../../components/Grid";
// import { Input, FormBtn } from "../../components/Form";
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';


const SignInPage = ({ history }) =>
    <div>
        
        <SignInForm history={history} />
        <Link to="/passwordforget">Forget Password?</Link>
        <br></br>
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    
};



class SignInForm extends Component {
  constructor(props) {
        super(props);
        //   this.state = { ...INITIAL_STATE };
        this.state = {
            email: "",
            password: "",
            error: "",
            validEmail: ""
        }
  }



  onSubmit = (event) => {
      const { validEmail, email, password } = this.state;
      const { history } = this.props;


    // console.log(this.state)
      auth.doSignInWithEmailAndPassword(email, password)
          .then(() => {
            //   this.setState(() => ({ ...INITIAL_STATE}));
            //   history.push(routes.BOOKS);
            this.setState({"validEmail": email})
            console.log("validEmail: " + this.state.validEmail)

          })
          .catch(error => {
              this.setState(byPropKey('error', error));
          });

      event.preventDefault();
  }


// class Books extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: [],
//       title: "",
//       author: "",
//       synopsis: ""
//     };
//   }

//   handleRoute = event => {
//     event.preventDefault();
//     window.location.href="/books"
// }
  // When the component mounts, load all books and save them to this.state.books
//   componentDidMount() {
//     this.loadBooks();
//   }

  // Loads all books  and sets them to this.state.books
//   loadBooks = () => {
//     API.getBooks()
//       .then(res =>
//         this.setState({ books: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };

  // Deletes a book from the database with a given id, then reloads books from the db
//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

  // Handles updating component state when the user types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  handleChange = (event) => {
      console.log(event.target)
      const { placeholder, value } = event.target

      console.log(placeholder)
      console.log(value)
      this.setState({
          [placeholder]: value
      })
    console.log(this.state);
    // this.setState(byPropKey('email', event.target.value));
  }

  render() {
//     const {
//       email,
//       password,
//       error,
//   } = this.state;

  const isInvalid = this.state.password === '' || this.state.email === '';

    return (
      <form>
            <input
            value={this.state.email}
            onChange={event => this.handleChange(event)}
            type="text"
            placeholder="email"
            />
            <input
            value={this.state.password}
            // onChange={event =>this.setState(byPropKey('password', event.target.value))}
            onChange={event => this.handleChange(event)}
            type="password"
            placeholder="password"
            />
            <button onClick={this.onSubmit} 
                    // disabled={isInvalid} 
                    type="submit">
                    Sign In
            </button>

            { this.state.error && <p>{this.state.error.message}</p>}
        </form>
            
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
