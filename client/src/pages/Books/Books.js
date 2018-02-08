import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import Dropdown from "../../components/Dropdown";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { auth } from '../../firebase';
import SignInForm from '../Signin';
// Import other components hereeeeee

import withAuthorization from '../../components/Authorization';
import { firebase } from '../../firebase';

class Books extends React.Component {
  constructor(props, { authUser }) {
    super(props);
    this.state = {
      books: [],
      title: "",
      author: "",
      synopsis: "",
      sLocation: "",
      unique: [],
      email: ""
    };
  }


  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
    firebase.auth.onAuthStateChanged(authUser => {
        this.setState({"email": authUser.email});
    })
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    if (this.state.sLocation === "" || this.state.sLocation === "All Locations" || this.state.sLocation === "Select Location"){
    API.getBooks()
      .then(res =>{
        console.log("RES ---------------- " + res.data);
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
        console.log("RES2 ---------------- " );
      })
      .catch(err => console.log(err));
    } else {
      API.getLocation(this.state.sLocation)
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
        
      )
      .catch(err => console.log(err));
    }
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value});
  };
  handleLocationChange = event => {
    this.setState({unique: []});
    console.log(this.state.unique);
    console.log(event.target.value);
    console.log("1st sLocation: "+ this.state.sLocation);
    this.setState({sLocation: event.target.value},this.loadBooks);
    console.log(event.target.value);
    console.log("2nd sLocation: "+ this.state.sLocation);
    // this.loadBooks(this.state.sLocation);

    
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    // this.setState({unique: []});
    // console.log(this.state.unique);
console.log("++++++++++++++++++" + this.state.email);
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
        email: this.state.email
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Find My Shit</h1>
            </Jumbotron>
            <div className="form-group">
        <select className="form-control"
        value={this.state.sLocation}
        onChange={this.handleLocationChange}
        // onClick={this.loadBooks(this.handleLocationChange)}
        name="sLocation"
        
        >
          <option value="Select Location">Select Location</option>
          <option value="All Locations">All Locations</option>
          
          {this.state.books.map(book => {
            console.log(this.state.unique);
            console.log(book);
            if (this.state.unique.indexOf(book.author) < 0){
              console.log("here " + this.state.unique);
              this.state.unique.push(book.author);
            return (
              <option value={book.author}>{book.author}</option>   
                   
            );
          } 
          })}
    
              <option value={this.state.unique[0]}>{this.state.unique[0]}</option>
        </select>
      </div>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {

                  if(book.email === this.state.email){

                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  );
                }

                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create an Item</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Location"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Additional Notes"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const authCondition = (authUser) => !!authUser;


export default withAuthorization(authCondition)(Books);
