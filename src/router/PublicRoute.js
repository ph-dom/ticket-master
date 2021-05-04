import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = props => {
    if (props.uid !== null) {
        return (
            <Route {...props} component={() => <Redirect to="/" />} />
        );
    } else {
        return (
            <Route {...props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    uid: state.user.uid
});

export default connect(mapStateToProps)(PublicRoute);