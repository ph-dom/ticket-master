import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = props => {
    if(props.role === 'admin') {
        return (
            <Route {...props}/>
        );
    } else {
        return (
            <Route {...props} component={() => <Redirect to="/" />} />
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role
});

export default connect(mapStateToProps)(AdminRoute);

