import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/index.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import Profile from "./Profile";
import Post from "./Post";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import SecuredRoute from "./SecuredRoute";

// post sorted in descending order by time of creation
const POSTS_LIST = gql`
  {
    post(order_by: { created_at: desc }) {
      id
      created_at
      url
      description
      user {
        id
        name
      }
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(POSTS_LIST);
  const { isAuthenticated, user } = useAuth0();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container className="postlist">
      <ol>
        {data.post.map((post, index) => (
          <>
            <Post key={index} post={post} />
          </>
        ))}
      </ol>
    </Container>
  );
}

export default withApollo(PostList);
