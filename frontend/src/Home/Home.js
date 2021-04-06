import React from 'react';
import { connect } from 'react-redux';

const Home = ({session, token}) => { 
  if (!session || !token) {
    return (
      <section>
        <h4>Login!</h4>
      </section>
    )
  }

  return (
    <section>
      <h4>Access Token: {token.access_token}</h4>
    </section>
  );
}

export default connect(({ session, token }) => ({ session, token }))(Home);