import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import { Allusers,EditAdmin,AddUser,viewAdmin } from 'components/Allusers';
import { Allparents,editParent,viewParent,AddParentChild} from 'components/Allparents';
import {AllMentors,EditMentor,AddMentor,ViewMentor} from 'components/Allmentors';
import Login from 'components/Login';
import ForgotPassword from 'components/ForgotPassword';
import SetadminPassword from 'components/SetadminPassword';
import SetPassword from 'components/SetPassword';
import SetparentPassword from 'components/setParentpassword';
import SetChildPassword from 'components/setChildpassword';
import DashboardPage from 'pages/DashboardPage';
import { AllChildren,AddChild,EditChild,ViewChild,assignHabits,assignMentor } from 'components/Children';
import { Program,EditProgram,AddProgram} from 'components/Allprograms';
import { Store,EditStore,AddStore} from 'components/Allstores';
import { Device,EditDevice,AddDevice} from 'components/Alldevices';
import { Brand,EditBrand,AddBrand} from 'components/Allbrands';
import { Service,EditService,AddService} from 'components/Allservices';

import { Languages,AddLanguage,EditLanguage} from 'components/language';
import { Resources,AddResource,EditResource,viewResource} from 'components/Resources';
import { Events,AddEvent,EditEvent} from 'components/Events';
import { Cms,AddCms,EditCms } from 'components/CMS';
import { ThermoQues,AddTques,EditTques } from 'components/ThermometerQues';
import { AllStudentTodos,AddStudentTodo,EditStudentTodo,AllParentTodos,AllMentorTodos} from 'components/AllTodos';
import { HelpQuestions,ViewHelp,AllHelpSuggestions,AddHelpSuggestion,EditHelpSuggestion } from 'components/Help';
import { FeelingJournals,ViewFeelingJournal } from 'components/FeelingJournal';
// import { AppFeedback,EventFeedback } from 'components/Feedback';
import { AppFeedback,EventFeedback,ViewEventFeedback,ViewAppFeedback } from 'components/Feedback';

import ViewadminProfile from 'pages/ViewadminProfile';
import Editprofile from 'pages/Editprofile';
import ChangepasswordPage from 'pages/ChangepasswordPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.css';
/** Redux process */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
//import { setCurrentUser, logoutUser,setCurrentRider } from './actions/authentication';
import { setCurrentUser, logoutUser } from './actions/authentication';
if(localStorage.jwtToken) {

  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //const decoded1 = jwt_decode(localStorage.jwtTokenrider);
  //store.dispatch(setCurrentRider(decoded1));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/'
  }
}
const getBasename = () => {	 
  //return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <BrowserRouter basename={getBasename()}>
            <GAListener>
              <Switch>       
                <LayoutRoute
                  exact
                  path="/"
                  layout={EmptyLayout}
                  component={Login}
                />
                <LayoutRoute
                  exact
                  path="/forgotpassword"
                  layout={EmptyLayout}
                  component={ForgotPassword}
                />
                <LayoutRoute
                  exact
                  path="/setadminpassword/:id"
                  layout={EmptyLayout}
                  component={SetadminPassword}
                />
                 <LayoutRoute
                  exact
                  path="/setparentPassword/:id"
                  layout={EmptyLayout}
                  component={SetparentPassword}
                />
                <LayoutRoute
                  exact
                  path="/setchildpassword/:id"
                  layout={EmptyLayout}
                  component={SetChildPassword}
                /> 
                <LayoutRoute
                  exact
                  path="/setpassword/:id"
                  layout={EmptyLayout}
                  component={SetPassword}
                />               
                <LayoutRoute
                  exact
                  path="/dashboard"
                  layout={MainLayout}
                  component={DashboardPage}
                />
                <LayoutRoute
                  exact
                  path="/changeadminpassword"
                  layout={MainLayout}
                  component={ChangepasswordPage}
                />                
                <LayoutRoute
                  exact
                  path="/viewadminprofile"
                  layout={MainLayout}
                  component={ViewadminProfile}
                />
                <LayoutRoute
                  exact
                  path="/editadminprofile"
                  layout={MainLayout}
                  component={Editprofile}
                />                
			      	  <LayoutRoute
                  exact
                  path="/allUsers"
                  layout={MainLayout}
                  component={Allusers}
                /> 
                <LayoutRoute
                  exact
                  path="/allChildren"
                  layout={MainLayout}
                  component={AllChildren}
                />
                <LayoutRoute
                  exact
                  path="/addChild"
                  layout={MainLayout}
                  component={AddChild}
                /> 
                <LayoutRoute
                  exact
                  path="/editchild/:id"
                  layout={MainLayout}
                  component={EditChild}
                /> 
                 <LayoutRoute
                  exact
                  path="/assignHabits/:id"
                  layout={MainLayout}
                  component={assignHabits}
                /> 
                 <LayoutRoute
                  exact
                  path="/assignMentor/:id"
                  layout={MainLayout}
                  component={assignMentor}
                /> 
                
                <LayoutRoute
                  exact
                  path="/viewChild/:id"
                  layout={MainLayout}
                  component={ViewChild}
                /> 
                <LayoutRoute
                  exact
                  path="/allmentors"
                  layout={MainLayout}
                  component={AllMentors}
                />
                <LayoutRoute
                  exact
                  path="/addmentor"
                  layout={MainLayout}
                  component={AddMentor}
                /> 
                <LayoutRoute
                  exact
                  path="/editmentor/:id"
                  layout={MainLayout}
                  component={EditMentor}
                />
                <LayoutRoute
                  exact
                  path="/viewMentor/:id"
                  layout={MainLayout}
                  component={ViewMentor}
                />
                <LayoutRoute
                  exact
                  path="/editUser/:id"
                  layout={MainLayout}
                  component={EditAdmin}
                /> 
				        <LayoutRoute
                  exact
                  path="/AddUser"
                  layout={MainLayout}
                  component={AddUser}
                /> 
                <LayoutRoute
                  exact
                  path="/viewAdmin/:id"
                  layout={MainLayout}
                  component={viewAdmin}
                />   
                 <LayoutRoute
                exact
                path="/Allparents"
                layout={MainLayout}
                component={Allparents}
                />
                <LayoutRoute
                exact
                path="/editParent/:id"
                layout={MainLayout}
                component={editParent}
                /> 

                <LayoutRoute
                  exact
                  path="/viewParent/:id"
                  layout={MainLayout}
                  component={viewParent}
                />
                <LayoutRoute
                  exact
                  path="/AddParentChild/:id"
                  layout={MainLayout}
                  component={AddParentChild}
                />
                
                <LayoutRoute
                  exact
                  path="/programs"
                  layout={MainLayout}
                  component={Program}
                />
                 <LayoutRoute
                  exact
                  path="/addprogram"
                  layout={MainLayout}
                  component={AddProgram}
                />
                <LayoutRoute
                  exact
                  path="/editprogram/:id"
                  layout={MainLayout}
                  component={EditProgram}
                />

                <LayoutRoute
                  exact
                  path="/stores"
                  layout={MainLayout}
                  component={Store}
                />
                 <LayoutRoute
                  exact
                  path="/addstore"
                  layout={MainLayout}
                  component={AddStore}
                />
                <LayoutRoute
                  exact
                  path="/editstore/:id"
                  layout={MainLayout}
                  component={EditStore}
                />
                <LayoutRoute
                  exact
                  path="/services"
                  layout={MainLayout}
                  component={Service}
                />
                 <LayoutRoute
                  exact
                  path="/addservice"
                  layout={MainLayout}
                  component={AddService}
                />
                <LayoutRoute
                  exact
                  path="/editservice/:id"
                  layout={MainLayout}
                  component={EditService}
                />

                <LayoutRoute
                  exact
                  path="/brands"
                  layout={MainLayout}
                  component={Brand}
                />
                 <LayoutRoute
                  exact
                  path="/addbrand"
                  layout={MainLayout}
                  component={AddBrand}
                />
                <LayoutRoute
                  exact
                  path="/editbrand/:id"
                  layout={MainLayout}
                  component={EditBrand}
                />

              <LayoutRoute
                  exact
                  path="/devices"
                  layout={MainLayout}
                  component={Device}
                />
                 <LayoutRoute
                  exact
                  path="/adddevice"
                  layout={MainLayout}
                  component={AddDevice}
                />
                <LayoutRoute
                  exact
                  path="/editdevice/:id"
                  layout={MainLayout}
                  component={EditDevice}
                />


                <LayoutRoute exact path="/Languages" layout={MainLayout} component={Languages} />
                <LayoutRoute exact path="/AddLanguage" layout={MainLayout} component={AddLanguage} />
                <LayoutRoute exact path="/EditLanguage/:id" layout={MainLayout} component={EditLanguage} />

                <LayoutRoute exact path="/Resources" layout={MainLayout} component={Resources} />
                <LayoutRoute exact path="/AddResource" layout={MainLayout} component={AddResource} />
                <LayoutRoute exact path="/EditResource/:id" layout={MainLayout} component={EditResource} />
                <LayoutRoute exact path="/viewResource/:id" layout={MainLayout} component={viewResource} />
                
                <LayoutRoute
                  exact
                  path="/events"
                  layout={MainLayout}
                  component={Events}
                />
                
                <LayoutRoute
                  exact
                  path="/AddEvent"
                  layout={MainLayout}
                  component={AddEvent}
                /> 
                <LayoutRoute
                  exact
                  path="/EditEvent/:id"
                  layout={MainLayout}
                  component={EditEvent}
                />
                <LayoutRoute
                  exact
                  path="/cms"
                  layout={MainLayout}
                  component={Cms}
                />
                <LayoutRoute
                  exact
                  path="/AddCms"
                  layout={MainLayout}
                  component={AddCms}
                /> 
                <LayoutRoute
                  exact
                  path="/EditCms/:id"
                  layout={MainLayout}
                  component={EditCms}
                />
                <LayoutRoute
                  exact
                  path="/thermoques"
                  layout={MainLayout}
                  component={ThermoQues}
                />
                <LayoutRoute
                  exact
                  path="/addthermoques"
                  layout={MainLayout}
                  component={AddTques}
                /> 
                <LayoutRoute
                  exact
                  path="/editQuestion/:id"
                  layout={MainLayout}
                  component={EditTques}
                /> 
                <LayoutRoute
                  exact
                  path="/allStudentTodos"
                  layout={MainLayout}
                  component={AllStudentTodos}
                /> 
                
                
                 <LayoutRoute
                  exact
                  path="/addStudentTodo/:user_type"
                  layout={MainLayout}
                  component={AddStudentTodo}
                /> 
                <LayoutRoute
                  exact
                  path="/editStudentTodo/:id/:user_type"
                  layout={MainLayout}
                  component={EditStudentTodo}
                /> 
                 <LayoutRoute
                  exact
                  path="/allParentTodos"
                  layout={MainLayout}
                  component={AllParentTodos}
                /> 
                 <LayoutRoute
                  exact
                  path="/allMentorTodos"
                  layout={MainLayout}
                  component={AllMentorTodos}
                /> 
                
                <LayoutRoute
                  exact
                  path="/helpQuestions"
                  layout={MainLayout}
                  component={HelpQuestions}
                />
                <LayoutRoute
                  exact
                  path="/viewhelp/:id"
                  layout={MainLayout}
                  component={ViewHelp}
                />
                 <LayoutRoute
                  exact
                  path="/Allhelpsuggestions"
                  layout={MainLayout}
                  component={AllHelpSuggestions}
                />
                 <LayoutRoute
                  exact
                  path="/addHelpSuggestion"
                  layout={MainLayout}
                  component={AddHelpSuggestion}
                /> 
                 <LayoutRoute
                  exact
                  path="/editHelpSuggestion/:id"
                  layout={MainLayout}
                  component={EditHelpSuggestion}
                />
                
                <LayoutRoute
                exact
                path="/allFeelingjournals"
                layout={MainLayout}
                component={FeelingJournals}
                />
                 <LayoutRoute
                exact
                path="/viewFeelingJournal/:id"
                layout={MainLayout}
                component={ViewFeelingJournal}
                />
                <LayoutRoute
                exact
                path="/appFeedback"
                layout={MainLayout}
                component={AppFeedback}
                />
                <LayoutRoute
                exact
                path="/eventFeedback"
                layout={MainLayout}
                component={EventFeedback}
                />
                <LayoutRoute
                exact
                path="/viewEventFeedback/:id"
                layout={MainLayout}
                component={ViewEventFeedback}
                />
                <LayoutRoute
                exact
                path="/viewAppFeedback/:id"
                layout={MainLayout}
                component={ViewAppFeedback}
                />
                  
                <Redirect to="/" />
              </Switch>
            </GAListener>
          </BrowserRouter>
        </Router>
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
