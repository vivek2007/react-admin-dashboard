//import logo200Image from 'assets/img/logo/logo_200.png';
import logo200Image from 'assets/img/logo/logo.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-1.jpg';
//import SourceLink from 'components/SourceLink';
import React from 'react';
import { connect } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  MdPlayArrow,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import { Link,NavLink } from 'react-router-dom';

import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';



const allItems =[
  { to: '/stores', name: 'Stores', exact: true, Icon: MdPlayArrow },
  //{ to: '/Allparents', name: 'Parents', exact: true, Icon: MdPlayArrow },
  { to:'/brands',name:"Brands",exact:true,Icon:MdPlayArrow},
  { to:'/services',name:"Services",exact:true,Icon:MdPlayArrow},
  { to:'/devices',name:"Devices",exact:true,Icon:MdPlayArrow}
  
]

const navItems = [
  { to: '/dashboard', name: 'dashboard', exact: true, Icon: MdPlayArrow },  
];


// const allTodos = [
//   //{ to:'/allParentTodos',name:"Parent Habits",exact:true,Icon:MdPlayArrow},
//   { to:'/allMentorTodos',name:"Mentor Habits",exact:true,Icon:MdPlayArrow},
// ]
const bem = bn.create('sidebar');

class Sidebar extends React.Component {
	 constructor(props){
    super(props);
    //console.log(this.props.auth.user.user_type);
  this.state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: false, 
  };
}

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    let ActiveSideBar;
    ActiveSideBar=  <Nav vertical>
    {navItems.map(({ to, name, exact, Icon, Class }, index) => (
      <NavItem key={index} className={bem.e('nav-item')}>
        <BSNavLink
          id={`navItem-${name}-${index}`}
          className={Class}
          tag={NavLink}
          to={to}
          activeClassName="active"
          exact={exact}>
          <Icon className={bem.e('nav-item-icon')} />
          <span className="">{name}</span>
        </BSNavLink>
      </NavItem>
    ))}
   
    
    {/* <Collapse isOpen={this.state.isOpenContents}> */}
      {allItems.map(({ to, name, exact, Icon, Class }, index) => (
        <NavItem key={index} className={bem.e('nav-item')}>
          <BSNavLink
            id={`navItem-${name}-${index}`}
            className={Class}
            tag={NavLink}
            to={to}
            activeClassName="active"
            exact={exact}>
            <Icon className={bem.e('nav-item-icon')} />
            <span className="">{name}</span>
          </BSNavLink>
        </NavItem>
      ))}
    {/* </Collapse> */}
    {/* <NavItem
        className={bem.e('nav-item')}
        onClick={this.handleClick('TodosPages')}>
        <BSNavLink className={bem.e('nav-item-collapse')}>
          <div className="d-flex">
            <MdPlayArrow className={bem.e('nav-item-icon')} />
            <span className="">Habits</span>
          </div>
          <MdKeyboardArrowDown
            className={bem.e('nav-item-icon')}
            style={{
              padding: 0,
              transform: this.state.isOpenTodosPages
                ? 'rotate(0deg)'
                : 'rotate(-90deg)',
              transitionDuration: '0.3s',
              transitionProperty: 'transform',
            }}
          />
        </BSNavLink>
      </NavItem>
       */}
    {/* <Collapse isOpen={this.state.isOpenTodosPages}>
      {allTodos.map(({ to, name, exact, Icon, Class }, index) => (
        <NavItem key={index} className={bem.e('nav-item')}>
          <BSNavLink
            id={`navItem-${name}-${index}`}
            className={Class}
            tag={NavLink}
            to={to}
            activeClassName="active"
            exact={exact}>
            <Icon className={bem.e('nav-item-icon')} />
            <span className="">{name}</span>
          </BSNavLink>
        </NavItem>
      ))}
    </Collapse> */}

    {/* <Collapse isOpen={this.state.isOpenContents}> */}
      {/* {allAfterTodo.map(({ to, name, exact, Icon, Class }, index) => (
        <NavItem key={index} className={bem.e('nav-item')}>
          <BSNavLink
            id={`navItem-${name}-${index}`}
            className={Class}
            tag={NavLink}
            to={to}
            activeClassName="active"
            exact={exact}>
            <Icon className={bem.e('nav-item-icon')} />
            <span className="">{name}</span>
          </BSNavLink>
        </NavItem>
      ))} */}
    {/* </Collapse> */}
           

    {/* <NavItem
        className={bem.e('nav-item')}
        onClick={this.handleClick('HelpPages')}>
        <BSNavLink className={bem.e('nav-item-collapse')}>
          <div className="d-flex">
          
            <MdPlayArrow className={bem.e('nav-item-icon')} />
            <span className="">Help</span>
          </div>
          <MdKeyboardArrowDown
            className={bem.e('nav-item-icon')}
            style={{
              padding: 0,
              transform: this.state.isOpenHelpPages
                ? 'rotate(0deg)'
                : 'rotate(-90deg)',
              transitionDuration: '0.3s',
              transitionProperty: 'transform',
            }}
          />
        </BSNavLink>
      </NavItem> */}
    {/* <Collapse isOpen={this.state.isOpenHelpPages}>
      {allHelp.map(({ to, name, exact, Icon, Class }, index) => (
        <NavItem key={index} className={bem.e('nav-item')}>
          <BSNavLink
            id={`navItem-${name}-${index}`}
            className={Class}
            tag={NavLink}
            to={to}
            activeClassName="active"
            exact={exact}>
            <Icon className={bem.e('nav-item-icon')} />
            <span className="">{name}</span>
          </BSNavLink>
        </NavItem>
      ))}
    </Collapse> */}


    {/* <Collapse isOpen={this.state.isOpenContents}>
            {allAfterHelp.map(({ to, name, exact, Icon, Class }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className={Class}
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Collapse>

          {!this.props.auth.user.user_type ?  <Collapse isOpen={this.state.isOpenContents}>
      {navAdmin.map(({ to, name, exact, Icon, Class }, index) => (
        <NavItem key={index} className={bem.e('nav-item')}>
          <BSNavLink
            id={`navItem-${name}-${index}`}
            className={Class}
            tag={NavLink}
            to={to}
            activeClassName="active"
            exact={exact}>
            <Icon className={bem.e('nav-item-icon')} />
            <span className="">{name}</span>
          </BSNavLink>
        </NavItem>
      ))}
    </Collapse>:""} */}

    {/* <Collapse isOpen={this.state.isOpenContents}>
            {allAfterCms.map(({ to, name, exact, Icon, Class }, index) => (
              <NavItem key={index} className={bem.e('nav-item')} style={{'display':'none'}}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className={Class}
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Collapse> */}
    
     </Nav>
	  
    return (
      <aside className={bem.b()}
       data-image={sidebarBgImage}
       >
        
        <div className={bem.e('content')}>
        <PerfectScrollbar>
          <Navbar>
            {/* <SourceLink className="navbar-brand d-flex"> */}
            <Link to={"/dashboard"} className="navbar-brand d-flex text-muted" title="Dashboard">
              <img
                src={logo200Image}
                width="160"
                height=""
                className="pr-2"
                alt=""
              />
                </Link>
              
            {/* </SourceLink> */}
          </Navbar>
          

           
            { /* <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem> */}
            {ActiveSideBar}
            {/* <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
          {/* </Nav> */}
          
          </PerfectScrollbar>
        </div>
        
      </aside>
    );
  }
}

//export default Sidebar;

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export  default connect(mapStateToProps, {})(Sidebar);

