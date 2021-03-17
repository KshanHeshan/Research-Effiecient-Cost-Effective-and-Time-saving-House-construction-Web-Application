import React, { Fragment } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import cookie from 'js-cookie';
import {FaBell} from 'react-icons/fa';

// Components imports
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import ErrorPage from '../pages/Error404';
import DashboardPage from '../user/Dashboard';
import DashboardServiceProviderPage from '../user/DashboardSP';
import ProfilePage from '../user/UserProfile';
import ReviewListPage from '../Review/ReviewList';
import ReviewEditPage from '../Review/ReviewEdit';
import ShowReviewPage from '../Review/ShowReview';
import AddWorksDonePage from '../Works/AddWorksDone';
import EditWorksDone from '../Works/EditWorksDone';
import CostPrediction from '../ML/CostPrediction';
import CarpenterSelection2 from '../carpenter/CarpenterSelection2';
import CarpentryCostPrediction from '../ML/CarpentryCostPrediction';
import MasonryCostPrediction from '../ML/MasonryCostPrediction';
import ShowWorksDone from '../Works/ShowWorkDone';
import CarpenterProfile from '../carpenter/CarpenterProfile';
import MasonProfile from '../mason/MasonProfile';
import LoginPage from '../user/Login';
import RegisterMainPage from '../user/RegisterMainPage';
import CustomerRegisterPage from '../user/CustomerRegister';
import ServiceProviderRegistrationPage from '../user/ServiceProviderRegister';
import PasswordResetPage from '../user/PasswordReset';
import Process from '../pages/Process';
import UpdateProcess from '../pages/UpdateProcess';

// Construction Projects files imports
import ShowConstructionPage from '../construction/ShowConstruction';
// For testing purposes
import TestingPage from '../Testing/MultipleImageUploads';
import ImageUploadTestingPage1 from '../Testing/Test1';
import UserImageUpload from '../Testing/SingleImageUpload';

// Authenticated Routes
import GuestRoute from '../user/GuestRoute';
import AuthRoute from '../user/AuthRoute';
import AuthRouteSP from '../user/AuthRouteSP';
import AuthRouteCus from '../user/AuthRouteCus';
import MultiPics from '../Testing/MultiplePics';

// Image Imports
import HeaderLogo from '../css/img/Home_Construction_logo_White.png';
import { connect } from 'react-redux';

function Header(props) {
    // Logout function
    const handleLogout = (e) => {
        e.preventDefault();
        cookie.remove('token');
        props.logout();
    }

    let imgURL = props.imageUrl

        return (
                <header>
                    {/* Navbar starts from here */}
                        <nav className="fire_gradient navbar navbar-expand-md navbar-dark text-light shadow">
                            <div className="container">
                                <Link to="/" className="navbar-brand text-white"><img className="header_image" src={HeaderLogo} alt="" /> Home Construction</Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarResponsive">
                                        <ul className="navbar-nav ml-auto float-right text-right">
                                            <li className="nav-item">
                                                <Link className="nav-link text-white" to="/">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-white" to="/about">About</Link>
                                            </li>
                                            {
                                                !props.loggedIn ? 
                                                (<Fragment>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-white" to="/login">Login</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-white" to="/register">Register</Link>
                                                </li>
                                                </Fragment>)
                                                :
                                
                                                (<Fragment>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-white" to="/#" onClick={handleLogout}>Logout</Link>
                                                </li>
                                                <li className="nav-item nav-user-img">
                                                    <div className="dropdown dropDown_sizing">
                                                        <button className="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        </button>

                                                        <div className="dropdown-menu dropDown_menu_sizing" aria-labelledby="dropdownMenu2">
                                                            <Link className="dropdown-item btn-sm text-left" type="button" to="/dashboard">Dashboard</Link>
                                                            <a className="dropdown-item btn-sm text-left" type="button" onClick={handleLogout}>Logout</a>
                                                        </div>
                                                    </div>
                                                </li></Fragment>)
                                            }                                                                       
                                        </ul>
                                    </div>
                            </div>
                        </nav>
                        {/* Navbar ends from here */}

                        {props.children}
                        <div>
                            {/* Routes */}
                            <Switch>
                                {/* Other Routes */}
                                <Route exact path='/' component={HomePage} />
                                <GuestRoute exact path='/login' component={LoginPage} />
                                <GuestRoute exact path='/register' component={RegisterMainPage} />
                                <GuestRoute exact path='/cus_register' component={CustomerRegisterPage} />
                                <GuestRoute exact path='/provi_register' component={ServiceProviderRegistrationPage} />
                                <Route exact path='/reset' component={PasswordResetPage} />
                                <Route exact path='/about' component={AboutPage} />
                                <AuthRouteCus exact path='/dashboard' component={DashboardPage} />
                                <AuthRouteSP exact path='/dashboard_sp' component={DashboardServiceProviderPage} />
                                <AuthRouteCus exact path='/profile' component={ProfilePage} />
                                <AuthRouteCus exact path='/cost_predict' component={CostPrediction} />
                                <AuthRouteCus exact path="/car_selecttion2" component={CarpenterSelection2}/>
                                <AuthRouteCus exact path='/process' component={Process} />

                                {/*Routes for constructions*/}
                                <AuthRouteCus exact path='/process/edit/:id' component={UpdateProcess} />
                                <AuthRouteCus exact path='/constructions/:id' component={ShowConstructionPage} />

                                {/* Routes for Reviews */}
                                <AuthRoute exact path='/reviews' component={ReviewListPage} />
                                <AuthRoute exact path='/reviews/edit/:id' component={ReviewEditPage} />
                                <AuthRoute exact path='/reviews/:id' component={ShowReviewPage} />
                                
                                {/* Routes for Work dones */}
                                <AuthRouteSP exact path='/addWorks_done' component={AddWorksDonePage} />
                                <AuthRouteSP exact path='/works_done/edit/:id' component={EditWorksDone} />
                                <AuthRouteSP exact path='/works_done/:id' component={ShowWorksDone} />

                                {/* Routes for ML tasks */}
                                <AuthRouteCus exact path='/carpenter_cost_predict' component={CarpentryCostPrediction} />
                                <AuthRouteCus exact path='/mason_cost_predict' component={MasonryCostPrediction} />
                            
                                {/* Routes for carpenter and mason components */}
                                <AuthRouteCus exact path="/carpenter/:id" component={CarpenterProfile}/>
                                <AuthRouteCus exact path="/mason/:id" component={MasonProfile}/>

                                {/* Routes for testing purpose */}
                                <Route exact path='/testing' component={TestingPage} />
                                <Route exact path='/testing2' component={ImageUploadTestingPage1} />
                                <Route exact path='/multipics' component={MultiPics} />
                                <Route exact path='/testing_user_image' component={UserImageUpload} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </div>
                </header>
           
        );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        imageUrl: state.auth.user.image_url
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: 'SET_LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

