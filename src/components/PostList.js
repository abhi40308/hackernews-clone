import React from "react";
import { Container } from "react-bootstrap";
import "../styles/index.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import Post from "./Post";

// post sorted in descending order by time of creation
export const POSTS_LIST = gql`
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
      points_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(POSTS_LIST);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container className="postlist">
      <ol>
        {data.post.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ol>
    </Container>
  );
}

export default withApollo(PostList);
