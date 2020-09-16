import React from 'react';
import bn from 'utils/bemnames';
import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import {
  // MdNotificationsActive,
  // MdPersonPin,
  MdClearAll,
  // MdExitToApp,
} from 'react-icons/md';
import { FaRegEdit,FaEye,FaUnlockAlt,FaPowerOff } from "react-icons/fa";
import { UserCard } from 'components/Card';
// import withBadge from 'hocs/withBadge';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser,getProfile} from 'actions/authentication';
import AppConstants from 'AppConstants';

const bem = bn.create('header');

// const MdNotificationsActiveWithBadge = withBadge({
//   size: 'md',
//   color: 'primary',
//   style: {
//     top: -10,
//     right: -10,
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   children: <small>5</small>,
// })(MdNotificationsActive);

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      username:'',
      email:'',
      profile_img:'',
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
    }
  }

  componentDidMount() {
    // console.log(this.props.auth.user);
    this.props.getProfile(this.props.auth.user._id)
  }
  //componentDidMount() { 
   // const that = this;       
    //console.log(process.env.REACT_APP_API_URL+'/users/profile/5bbe07d54d50be868b4ee2b8');
    //this.props.getProfile(this.state._id)
    //process.env.REACT_APP_API_URL
    /* axios.get('/users/profile/'+this.props.auth.user._id)
    .then(res => {      
      if(res.data.Status == "Success"){
        this.setState({
          username:res.data.data.username,
          email:res.data.data.email,
          profile_img:res.data.data.profile_img,
        });
      }
      else{
        console.log('invalid data')
      }
    }) */

    /* fetch(AppConstants.API+'/users/profile/'+this.props.auth.user._id)
    .then(function(res) {
      //console.log(res.status);
      if(res.status == 200){
        return res.json();
      }
    })
    .then(function(data) {
      if(data.Status == "Success"){
        that.setState({
          username:data.data.username,
          email:data.data.email,
          profile_img:data.data.profile_img || '/static/media/100_4.978e51b5.jpg',
        });
      }else
      {
        console.log('invalid data')
      }
    });
  } */

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  /*onProfile = event => { 
    this.toggleUserCardPopover();   
  }
   onEditProfile = event => { 
    this.toggleUserCardPopover();   
  }*/

  /* uploadnaicnigpcodes = event => {
    let path = '/uploadnigpnaic';
    this.toggleUserCardPopover();
    this.props.history.push(path); 
  } */

  onProfile = event => {
    let path = AppConstants.STAGADMIN+'/viewadminprofile';
    this.toggleUserCardPopover();
    this.props.history.push(path);   
  };

  onEditProfile = event => {
    let path = AppConstants.STAGADMIN+'/editadminprofile';
    this.toggleUserCardPopover();
    this.props.history.push(path);   
  };

  passwordChange = event => {
    let path = AppConstants.STAGADMIN+'/changeadminpassword';
    this.toggleUserCardPopover();
    this.props.history.push(path);   
  };

  
  render() {
    // const { isNotificationConfirmed } = this.state;
    const {user} = this.props.auth;
   let userImage ;
	 if(user.profile_img ==='' || user.profile_img === undefined )
	 {
		// console.log("nill image")
		 userImage = 'assets/img/users/avatar-img.png'
	 }
	 else
	 {
		//userImage = 'assets/img/users/100_4.jpg'
		 userImage =  user.profile_img;
		
	 }
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
      

        <Nav navbar className={bem.e('nav-right')}>        

          <NavItem>
            <NavLink id="Popover2">
              {/* <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              /> */}
                
              <img src={userImage} onClick={this.toggleUserCardPopover} alt="pic"
                className="can-click" style={{width: 40, height: 40,borderRadius:50}}/>
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}>
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={user.username}
                  subtitle={user.email}
                  className="border-light adminuser">
                  <ListGroup flush className="adminuser-list">
                    {/* <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin />
                      <Link to={`/viewadminprofile`} style={{color:"#212529"}} onClick={this.onProfile.bind(this)}>View Profile</Link>                      
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> 
                      <Link to={`/editadminprofile`} style={{color:"#212529"}} onClick={this.onEditProfile.bind(this)}>Edit Profile</Link>
                    </ListGroupItem>*/}
                    {/* <ListGroupItem tag="button" action className="border-light" onClick={this.uploadnaicnigpcodes.bind(this)} title="Upload NAIC/NIGP codes">
                      <MdPersonPin /> Upload NAIC/NIGP Codes
                    </ListGroupItem> */}
                    <ListGroupItem tag="button" action className="border-light" onClick={this.onProfile.bind(this)} title="View Profile">
                      <FaEye /> View Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light" onClick={this.onEditProfile.bind(this)} title="Edit Profile">
                      < FaRegEdit/> Edit Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light" onClick={this.passwordChange.bind(this)} title="Change Password">
                      <FaUnlockAlt /> Change Password
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light" onClick={this.onLogout.bind(this)} title="Logout">
                      <FaPowerOff /> Logout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
/* Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
} */

const mapStateToProps = (state) => ({
  auth: state.auth
})
//export default Header;
export default connect(mapStateToProps, { logoutUser,getProfile })(withRouter(Header));
