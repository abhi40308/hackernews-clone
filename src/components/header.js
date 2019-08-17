import React from "react";
import { withRouter } from "react-router";
import { Navbar, Container, Row } from "react-bootstrap";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div className="header">
      <Container className="navbar">
        <Navbar>
          <Row>
            <Link className="fw anchor" to="/">
              &nbsp; Hacker News
            </Link>
          </Row>
          <Row className="ml-auto">
            {!isAuthenticated && (
              <>
                <button
                  className="auth-button"
                  onClick={() => loginWithRedirect({})}
                >
                  Log in
                </button>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link className="anchor" to="/new-post">
                  submit
                </Link>
                <span> &nbsp;|&nbsp; </span>
                <span className="anchor">
                  user :
                  <Link className="anchor" to={"/user/" + user.sub}>
                    {user.nickname}
                  </Link>
                </span>
                <span> &nbsp;|&nbsp; </span>
                <button className="auth-button" onClick={() => logout()}>
                  Log out
                </button>
              </>
            )}
          </Row>
        </Navbar>
      </Container>
    </div>
  );
}

export default withRouter(Header);
