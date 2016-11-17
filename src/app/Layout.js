import React from 'react';
//import { Link } from 'react-router';

import Menu from './Menu';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Layout extends React.Component {
	
	goPage = this.goPage.bind(this)
 
	goPage(e) {
		let route = e.target.id
		this.props.history.push(route)
		//this.context.router.push(route)
	}
	
	render() {
		const { goPage } = this
		
		const AppNavbar = (
		  <Navbar inverse collapseOnSelect>
			<Navbar.Header>
			  <Navbar.Brand>
				<div onClick={goPage} id="/">MAP Stats</div>
			  </Navbar.Brand>
			  <Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
			  <Nav>
				<NavItem eventKey={1} href="#">Link</NavItem>
				<NavItem eventKey={2} href="#">Link</NavItem>
				<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
				  <MenuItem eventKey={3.1}>Action</MenuItem>
				  <MenuItem eventKey={3.2}>Another action</MenuItem>
				  <MenuItem eventKey={3.3}>Something else here</MenuItem>
				  <MenuItem divider />
				  <MenuItem eventKey={3.3}>Separated link</MenuItem>
				</NavDropdown>
			  </Nav>
			  <Nav pullRight>
				<NavItem eventKey={1} onClick={goPage} id="about">About</NavItem>
				<NavItem eventKey={2} href="#">Link Right</NavItem>
			  </Nav>
			</Navbar.Collapse>
		  </Navbar>
		);
		return(
			<div>
				{AppNavbar}
				{this.props.children}
			</div>
		)
  }
}

