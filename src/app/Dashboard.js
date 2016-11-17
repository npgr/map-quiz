import React from "react";
import { Glyphicon, FormGroup, FormControl, ControlLabel, Panel, Grid, Row, Col } from "react-bootstrap";

export default class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			panel1Open: true,
			panel2Open: true
		}
		
		this.panel1Toggle = this.panel1Toggle.bind(this)
		this.panel2Toggle = this.panel2Toggle.bind(this)
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	 
	render() {
		const { panel1Toggle, panel2Toggle } = this
		const { panel1Open, panel2Open } = this.state
		
		const panel1Header = (
			<div onClick={panel1Toggle}>
				<Glyphicon glyph="star"/> MAP
			</div>
		)
		
		const panel2Header = (
			<div onClick={panel2Toggle}>Data</div>
		)
	
	  return (
		<Grid>
		  <Row>
		    <Col xs={6} sm={6} md={6} lg={6}>
			  <Panel collapsible expanded={panel1Open} header={panel1Header} bsStyle="success">
		      <FormGroup controlId="formControlsSelect1">
				<ControlLabel>Select</ControlLabel>
				<FormControl componentClass="select" placeholder="Value 2">
					<option value="select">Value 1</option>
					<option value="other">Value 2</option>
				</FormControl>
			  </FormGroup>
			  </Panel>
			</Col>
			<Col xs={6} sm={6} md={6} lg={6}>
		      <Panel collapsible expanded={panel2Open} header={panel2Header} bsStyle="primary">
				<FormGroup controlId="formControlsSelect2">
				<FormControl componentClass="select">
					<option value="select">Value 1</option>
					<option value="other">Value 2</option>
				</FormControl>
			  </FormGroup>
		      </Panel>
			</Col>
		  </Row>
		  <Row>
		    <Col>
		      <Panel>
				<Glyphicon glyph="star" /> MAP
		      </Panel>
			</Col>
		  </Row>
		  
		</Grid>
	  )
	}
}

