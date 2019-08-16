import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/index.css";
import { useAuth0 } from "../auth/react-auth0-wrapper";

function Post(props) {

  const { isAuthenticated, user } = useAuth0();

  return (
    <Row className="post" key={props.index}>
      {/* key is just a react thing, you can read it here : https://reactjs.org/docs/lists-and-keys.html#keys */}
      <Col>
        <Row>
          <li className="post-id">
            <a className="anchor" href={props.post.url}>
              {props.post.description}
            </a>
          </li>
        </Row>
        <Row>
          <span className="post-id">
            created at {Date(props.post.created_at).toString()} by &nbsp;
          </span>
          <Link className="anchor post-id" to={"/user/" + props.post.user.id}>
            {props.post.user.name}
          </Link> 
        </Row>
      </Col>
    </Row>
  );
}

export default Post;
