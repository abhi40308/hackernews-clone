import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/index.css";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { POSTS_LIST } from "./PostList";
import { useAuth0 } from "../auth/react-auth0-wrapper";

const UPVOTE_POST = gql`
  mutation($postId: Int!, $userId: String!) {
    insert_point(objects: [{ post_id: $postId, user_id: $userId }]) {
      affected_rows
    }
  }
`;

function Post(props) {
  const { isAuthenticated, user } = useAuth0();

  let loggedUserId = "";
  if (isAuthenticated) {
    loggedUserId = user.sub;
  }

  const postdate = new Date(props.post.created_at);

  const [upvotePost] = useMutation(UPVOTE_POST, {
    variables: { postId: props.post.id, userId: loggedUserId },
    refetchQueries: [{ query: POSTS_LIST }]
  });

  return (
    <Row className="post" key={props.index}>
      {/* key is just a react thing, you can read it here : https://reactjs.org/docs/lists-and-keys.html#keys */}
      <Col>
        <Row>
          <li className="post-id">
            {isAuthenticated && (
              <span className="anchor cursor" onClick={upvotePost}>
                ▲
              </span>
            )}
            &nbsp;
            <a className="anchor" href={props.post.url}>
              {props.post.description}
            </a>
          </li>
        </Row>
        <Row>
          <span className="post-id">
            {props.post.points_aggregate.aggregate.count} points | by&nbsp;
          </span>
          <Link className="anchor post-id" to={"/user/" + props.post.user.id}>
            {props.post.user.name}
          </Link>
          <span className="post-id">
            &nbsp;created at {postdate.toString()};
          </span>
        </Row>
      </Col>
    </Row>
  );
}

export default Post;
