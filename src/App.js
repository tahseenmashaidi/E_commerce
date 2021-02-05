import React from 'react';
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sing-in-and-sign-up/sing-in-and-sign-up.component";
import {auth,createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.action";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component{
    unsubscribeFromAuth=null;
    componentDidMount() {
        console.log("mount")
        const {setCurrentUser}=this.props
        this.unsubscribeFromAuth=auth.onAuthStateChanged(async user=>{
            if (user){
                const userRef=await createUserProfileDocument(user);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id:snapshot.id,
                        ...snapshot.data()
                    });
                });
            }
            setCurrentUser(user)
        });
    }
    componentWillUnmount() {
        console.log("unmounted")
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route  path={'/shop'} component={ShopPage}/>
                    <Route exact path={'/checkout'} component={CheckoutPage}/>
                    <Route exact path={'/signin'} render={
                        ()=>this.props.currentUser?
                            (<Redirect to={'/'}/>)
                            :(<SignInAndSignUpPage/>)
                    }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser
})
const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
