import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props =>  {
    if (props.uid !== null) {
        return (
            <Route {...props} />
        );
    } else {
        return (
            <Route {...props} component={() => <Redirect to="/login" />} />
        );
    }
}

const mapStateToProps = (state) => ({
    uid: state.user.uid
});

export default connect(mapStateToProps)(PrivateRoute);