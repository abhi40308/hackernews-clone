import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { withRouter } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { gql } from "apollo-boost";

const USER_INFO = gql`
  query($id: String!) {
    users(where: { id: { _eq: $id } }) {
      last_seen
      name
    }
  }
`;

function Profile(props) {
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { id: props.match.params.id }
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Container className="postlist">
        {data.users.map((user, index) => (
          <>
            <Row className="post">
              <Col>user : {user.name}</Col>
            </Row>
            <Row className="post">
              <Col>last seen : {new Date(user.last_seen).toString()}</Col>
            </Row>
          </>
        ))}
      </Container>
    </>
  );
}

export default withRouter(Profile);
