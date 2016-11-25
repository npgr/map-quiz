import React from "react";
import { Form, Glyphicon, FormGroup, FormControl, ControlLabel, Panel, Grid, Row, Col } from "react-bootstrap";
import store from "./store/StateStore"
import Map from "./Map.js"

export default class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			panel1Open: true,
			panel2Open: true
		}
		window.country = 'prueba2'
		
		this.panel1Toggle = this.panel1Toggle.bind(this)
		this.panel2Toggle = this.panel2Toggle.bind(this)
		setTimeout(function() {
			//this.load_map('world') }.bind(this)
			Map.load_map('world') }.bind(this)
		  , 1000)
		  
		/*setTimeout(function() {
			store.states.forEach(function(el) {
				console.log('dashboard load: ',el)
			})
		}.bind(this), 2000)*/
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	
	//load_world = () => this.load_map('world')
	
	change_map(e) {
		Map.load_map(e.target.value)
	}
	
	msg() {
		var obj = {}
		obj[window.country.iso] = 'green'
		obj.FRA = 'green'
		//obj[window.country.iso] = {fillKey: 'Red'}
		//this.map.updateChoropleth(obj);
		Map.updateChoropleth(obj);
		console.log(window.country)
		
		setTimeout(function() {
			var obj = {}
			obj.FRA = {fillKey: 'defaultFill'}
			Map.updateChoropleth(obj); 
			 }.bind(this)
		  , 2500)
	}
	
	render() {
		const { panel1Toggle, panel2Toggle } = this
		const { panel1Open, panel2Open } = this.state
		
		const panel1Header = (
			 <Form horizontal>
				  <FormGroup controlId="mapSelected">
					<Col componentClass={ControlLabel} sm={1} md={1} lg={1}>
						Map
					</Col>
					<Col sm={4} md={4} lg={3}>
					  <FormControl onChange={this.change_map.bind(this)} componentClass="select">
						<option value="world">World</option>
						<option value="usa">USA</option>
						<option value="fra">France</option>
					  </FormControl>
					</Col>
				  </FormGroup>
			 </Form>
		)
		
		const panel2Header = (
			<div onClick={panel2Toggle}>Data</div>
		)
	
	  return (
		<Grid>
		  <Row>
		    <Col sm={9} md={9} lg={9}>
			  <Panel header={panel1Header} bsStyle="success" style={{backgroundColor: "#d8ecf3"}}>
					<div id="theMap" onClick={this.msg.bind(this)}>Loading Map...</div>
		      </Panel>
			</Col>
		    <Col sm={3} md={3} lg={3}>
			  <Panel collapsible expanded={panel1Open} header="Select Map" bsStyle="success">
		      <FormGroup controlId="formControlsSelect1">
				<ControlLabel>Select</ControlLabel>
				<FormControl componentClass="select" placeholder="Value 2">
					<option value="select">Value 1</option>
					<option value="other">Value 2</option>
				</FormControl>
			  </FormGroup>
			  </Panel>
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
		</Grid>
	  )
	}
}

