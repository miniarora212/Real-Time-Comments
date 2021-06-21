import React from 'react';
import { Api } from './api';
import './App.css';
import { Button, Container, Form, Media, Row, Col, Jumbotron} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import socketIOClient from "socket.io-client";
import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
const socket = socketIOClient('http://localhost:3001');

const DEFAULT_FORM_STATE = {
  name: '',
  message: '',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_FORM_STATE,
      comments:[]   
    };
  }

  onChange = event => {
    const { currentTarget } = event;
    const { name, value } = currentTarget;
    const input = {};
    input[name] = value;
    this.setState(input);
  }

  onSubmit = event => {
    const { name, message } = this.state;
    event.preventDefault();
    Api.post('/createComment', {
      name,
      message,
    }).then(() => {
      this.setState(DEFAULT_FORM_STATE);
      socket.emit("initial_data");
      store.addNotification({
        title: "New Comment!",
        message: "A new comment just got posted!",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    });
  }

componentDidMount() {
    socket.emit("initial_data");
    socket.on("commentsFeed", data => {
        this.setState({ comments: data })
    });
}

  render() {
    const { name, message, comments } = this.state;
    return (
      <Container className="p-3" fluid="sm">
        <ReactNotification />
        <Jumbotron>
        <Row>
          <h3 className="mx-auto">Post Your Comments</h3>
        </Row>
        <Row>
          <Col>
            <Form data-testid="postcomments" onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name"  value={name} required onChange={this.onChange} placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="4" name="message" required  value={message} onChange={this.onChange} placeholder="Enter Message" />
              </Form.Group>
              <Button variant="primary" type="submit"> Post Comment</Button>
            </Form>
          </Col>
        </Row>
        </Jumbotron>
        <Row>
        <Col>
        <Jumbotron>
        <h3 className="text-center">Comments</h3>
        {comments.length ? comments.map(comment => {
            return(
              <Media key={comment.id} className="commentbox mb-2">
              <span className="author-image">{comment.name.substring(0,1)}</span>
              <Media.Body>
                <h5>{comment.name} <span className="created-at"><FontAwesomeIcon icon={faClock} /> {comment.created}</span></h5>
                <p>
                  {comment.message}
                </p>
              </Media.Body>
            </Media>
            );
          }) :
          <h5>Sorry, no comments found... </h5>
        }
      </Jumbotron>
      </Col>
      </Row>
      </Container>
    );
  }
}

export default App;
