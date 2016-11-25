import React from "react";
import { observer } from "mobx-react"
import { Form, FormGroup, FormControl, ControlLabel, Button, Glyphicon, Panel, Grid, Row, Col } from "react-bootstrap";
import store from "./store/StateStore"
import Map from "./Map.js"

@observer
export default class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			panel1Open: true,
			panel2Open: true
		}
		
		this.panel1Toggle = this.panel1Toggle.bind(this)
		this.panel2Toggle = this.panel2Toggle.bind(this)
		store.load_from_url('usa')
		setTimeout(function() {
			//this.load_map('world') }.bind(this)
			Map.load_map('usa') }.bind(this)
		  , 1000)
		  
		/*setTimeout(function() {
			store.states.forEach(function(el) {
				console.log('dashboard load: ',el)
			})
		}.bind(this), 2000)*/
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	
	change_map(e) {
		Map.load_map(e.target.value)
	}
	
	msg() {
		store.result.questions++
		//console.log('answer: ', store.answer(), ' ,click: ', window.country.name) 
		if (store.answer().name == window.country.name)
		{
			store.result.rigth++
			alert('Correct !!!')
		}
			
		 else
		{
			store.result.wrong++
			alert('Incorrect !!!') 
		}
		store.next()	
		/*var obj = {}
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
		  , 2500)*/
	}
	
	next() {
		store.next()
	}
	
	answer() {
		store.result.questions++
		store.result.wrong++
		
		var obj = {}
		obj[store.answer().code] = 'green'
		//obj[window.country.iso] = {fillKey: 'Red'}
		//this.map.updateChoropleth(obj);
		Map.updateChoropleth(obj);
		//console.log(window.country)
		
		setTimeout(function() {
			var obj = {}
			obj[store.answer().code] = {fillKey: 'defaultFill'}
			Map.updateChoropleth(obj); 
			store.next()
			}.bind(this)
		  , 2000)
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
						<option value="usa">USA</option>
						<option value="world">World</option>
					  </FormControl>
					</Col>
				  </FormGroup>
			 </Form>
		)
		
		/*const panel1Header = (
			<div onClick={panel1Toggle}>Question</div>
		)*/
		
		const panel2Header = (
			<div onClick={panel2Toggle}>Result</div>
		)
	
		var bottom = (<div></div>)
		if (store.quiz.id == -1)
			bottom = (<Button bsStyle="success" onClick={this.next.bind(this)}>Start</Button>)
		 else if (store.quiz.question != 'End of Quiz')
			bottom = (<Button bsStyle="success" onClick={this.answer.bind(this)}>Get Answer</Button>)
		
	  return (
		<Grid>
		  <Row>
		    <Col sm={9} md={9} lg={9}>
			  <Panel header={panel1Header} bsStyle="success" style={{backgroundColor: "#d8ecf3"}}>
					<div id="theMap" onClick={this.msg.bind(this)}>Loading Map...</div>
		      </Panel>
			</Col>
		    <Col sm={3} md={3} lg={3}>
			  <Panel collapsible expanded={panel1Open} header="Question" bsStyle="success">
				  <div>{store.quiz.question}</div>
				  <div>{store.quiz.answer}</div>
				  <div>{bottom}</div>
			  </Panel>
			  <Panel collapsible expanded={panel2Open} header={panel2Header} bsStyle="primary">
				<div>Questions: {store.result.questions}</div>
				<div>Rigth: {store.result.rigth}</div>
				<div>Wrong: {store.result.wrong}</div>
		      </Panel>
			</Col>
		  </Row> 
		</Grid>
	  )
	}
}

