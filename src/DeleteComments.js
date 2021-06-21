import React from 'react';
import './App.css';
import { Api } from './api';
import { Container, Row, Col, Button, Jumbotron} from 'react-bootstrap';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3001');

class DeleteComments extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
      };
    }

    componentDidMount() {
      socket.emit("initial_data");
      socket.on("commentsFeed", data => {
          this.setState({ comments: data })
      });
      // fetch('http://localhost:3001/getComments').then(res => res.json())
      // .then(result => {
      //   console.log(result);
      //   this.setState({
      //     comments: result
      //   });
      // });
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
    hasComments = () => {
      const { comments } = this.state;
      return (
          <Col>
            <h3> You can delete all comments from here </h3>
            <Button variant="danger" className="float-right" data-testid="deletebutton" onClick={this.deleteComments}>Delete {comments.length} Comment{comments.length > 1 && 's'}</Button>
          </Col>
      );
    }

    deleteComments = () => {
      if (window.confirm('Are you sure you want to delete all the comments?')) {
        Api.delete('/deleteComments').then(() => {
          socket.emit("initial_data");
        });
      }
    }

    render() {
    const {comments} = this.state;
      return (
    <Container className="p-3" fluid="sm">
      <Row>
      <Jumbotron data-testid="deletecomments">
          {comments.length > 0 ? this.hasComments() : 'Sorry, no comments found!'}
      </Jumbotron>
      </Row>
      </Container>
      );
    }
  }
 
  export default DeleteComments;