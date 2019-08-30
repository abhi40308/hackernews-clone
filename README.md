# HackerNews Clone using React, Apollo-React-Client and Hasura GraphQl Engine

This application demonstrates consuming GraphQl Api provided by [Hasura GraphQL Engine](https://hasura.io) using a react app. Uses react-apollo GraphQL client to make requests to the api. Users can create account using [Auth0 JWT authentication](https://auth0.com/) which is then verified by Hasura. React-router is used to provide SPA experience.

Authenticated users can:
* Create new posts
* Upvote posts
* Realtime updates when other users upvote a post or create a new one (updating apollo cache).

## Installation

Installing and running on local system require:
* [Setting up Hasura Server](https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html) (deployed on Heroku), and creating required tables
* [Setting up Auth0](https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0)
* See [this](https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html) guide for Auth0 JWT Integration with Hasura
* Clone or download this repo, install the required packages and run `npm start`

## npm packages:

You will need the following npm packages:
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
* [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
* [apollo-boost](https://www.npmjs.com/package/apollo-boost)
* [@apollo/react-hooks](https://www.npmjs.com/package/@apollo/react-hooks)
* [apollo-link-context](https://www.npmjs.com/package/apollo-link-context)
* [@apollo/react-hoc](https://www.npmjs.com/package/@apollo/react-hoc)
* [graphql](https://www.npmjs.com/package/graphql)
* [@auth0/auth0-spa-js](https://www.npmjs.com/package/@auth0/auth0-spa-js)


## Creating tables 

Following tables required to be created:
```
type Post {
id - integer, primary key
description - text
url - text
created_at - timestamp with time zone
user_id - text
}

type Users {
name - text
last_seen - timestamp with time zone
id - text, primary key
}

type Point {
id - integer, primary key
user_id - text
post_id - integer
}
```
`Post.user_id` and `Users.id` have object relationship. `Point.post_id` and `Post.id` have array relationship. Permissions should be given accordingly.

## User Authentication

See [Setting up Auth0 with react](https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0) and [this](https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html) guide for Auth0 JWT Integration with Hasura. Here we are using Auth0 Universal Login.

## Realtime updates

Using apollo cache and react state, we can give realtime updates for upvotes and new posts. Apollo `refetchQueries` function updates apollo cache with refetched data.
