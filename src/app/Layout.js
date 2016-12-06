import React from 'react';
//import { Link } from 'react-router';

//import Menu from './Menu';

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
				<div>MAP Quiz</div>
			  </Navbar.Brand>
			  <Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
			  <Nav>
				<NavDropdown eventKey={1} title="Country" id="basic-nav-dropdown">
				  <MenuItem eventKey={1.1} href="index.html">USA</MenuItem>
				  <MenuItem eventKey={1.2} href="Espana.html">España</MenuItem>
				  <MenuItem eventKey={1.3} href="Portugal.html">Portugal</MenuItem>
				  <MenuItem divider />
				  <MenuItem eventKey={1.4} href="world.html">World</MenuItem>
				  <MenuItem eventKey={1.5} href="europe.html">Europe</MenuItem>
				  <MenuItem eventKey={1.6} href="america.html">America</MenuItem>
				</NavDropdown>
				<NavDropdown eventKey={2} title="Language" id="basic-nav-dropdown">
				  <MenuItem eventKey={2.1}>English</MenuItem>
				  <MenuItem eventKey={2.2}>Spanish</MenuItem>
				  <MenuItem eventKey={2.3}>Portuguese</MenuItem>
				</NavDropdown>
			  </Nav>
			  <Nav pullRight>
				<NavItem eventKey={5} onClick={goPage} id="about">About</NavItem>
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

