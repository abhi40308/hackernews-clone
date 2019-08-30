import React, { useState } from "react";
import "../styles/index.css";
import { Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { withApollo } from "@apollo/react-hoc";
import {POSTS_LIST} from "./PostList";

const SUBMIT_POST = gql`
  mutation ($description: String!, $url: String!, $userId: String!) {
    insert_post(objects: [{description: $description, url: $url, user_id:$userId}])
    {
      affected_rows
    } 
  }
`;

function NewPost() {
  const { user } = useAuth0();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [submitPost] = useMutation(SUBMIT_POST);

  return (
    <>
      <Container className="postlist">
      <form
        onSubmit={e => {
          e.preventDefault();
          submitPost({ 
            variables: { description, url, userId: user.sub },
            refetchQueries: [{query: POSTS_LIST}]
           })
          .catch(function(error) {
            console.log(error);
            setError(error.toString());
          });
          //You are having a controlled component where input value is determined by this.state.city. 
          // So once you submit you have to clear your state which will clear your input automatically.
          setDescription('');
          setUrl('');
        }
      }
      >
        <Row>
          <Col>
            <span className="post-id">Post Title:</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              value={description}
              onChange={e => setDescription( e.target.value )}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="post-id">Url (Enter a valid url, doesn't check for validity currently):</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              value={url}
              onChange={e => setUrl( e.target.value )}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="submit" value="Submit"/>
          </Col>
        </Row>
      </form>

      {error}
      </Container>
    </>
  );
}

export default withApollo(NewPost);
