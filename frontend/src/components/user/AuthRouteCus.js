import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {

  // Route authentication
    return (
      <Route
        {...rest}
        render={props =>
          rest.loggedIn ? (
            rest.user_type == 'customer'?(
            <Component {...props}/>
            )
            :
            (
                <Redirect
                    to={{
                        pathname:"/dashboard_sp",
                        state: {from: props.location}
                    }}
                />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  const mapStateToProps = state => {
    return {
        loggedIn : state.auth.loggedIn,
        user_type: state.auth.user.service_type
    }
}

export default connect(mapStateToProps)(AuthRoute)