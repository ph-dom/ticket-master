import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../config/firebase';
import { loginUser, logoutUser, getUserData } from '../../redux/user/actions';
import { startGetBoardData } from '../../redux/board/actions';
import { startGetUserTickets } from '../../redux/ticket/actions';
import NavComponent from './Nav/NavComponent';
import LoadingComponent from './Loading/LoadingComponent';
import ModalComponent from './Modal/ModalComponent';
import FooterComponent from './Footer/FooterComponent';

class BaseComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            appLoaded: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(this.handleAuthStateChange);
    }

    handleAuthStateChange = async (user) => {
        if(user) {
            const idToken = await user.getIdToken();
            const data = await getUserData(user.uid);
            const userData = {
                uid: user.uid,
                email: user.email,
                phoneNumber: user.phoneNumber,
                displayName: user.displayName,
                projects: data.projects,
                idToken,
                role: data.role
            }
            this.props.loginUser(userData);
            await this.props.startGetBoardData();
            await this.props.startGetUserTickets();
        } else {
            this.props.logoutUser();
        }
        if(!this.state.appLoaded) {
            this.setState({
                appLoaded: true
            });
        }
    };
    
    render() {
        if(this.state.appLoaded) {
            return (
                <React.Fragment>
                    <NavComponent />
                    {this.props.children}
                    <ModalComponent />
                    <FooterComponent />
                </React.Fragment>
            );
        } else {
            return (
                <LoadingComponent />
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (userData) => dispatch(loginUser(userData)),
    logoutUser: () => dispatch(logoutUser()),
    startGetBoardData: () => dispatch(startGetBoardData()),
    startGetUserTickets: () => dispatch(startGetUserTickets())
});

export default connect(undefined, mapDispatchToProps)(BaseComponent);