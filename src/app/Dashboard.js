import "../assets/css/Dashboard.css"
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
			panel2Open: true,
		}
		var country = document.getElementById('app').getAttribute('map')
		//console.log('Country: ', country)
		store.load_from_url(country)
		if (store.map == '') store.map = country
		this.stateAnswer = ''
		this.panel1Toggle = this.panel1Toggle.bind(this)
		this.panel2Toggle = this.panel2Toggle.bind(this)
		setTimeout(function() {
			Map.load_map(store.map, store.showPopUp) }.bind(this)
		  , 1000)
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	
	changeMode(e) {
		var mode = e.target.value
		store.setMode(mode)
		if (mode == 'quiz')
			Map.resetChoropleth()
	}
	
	changeLanguage(e) {
		store.changeLanguage(e.target.value)
	}
	
	msg() {
		//console.log('answer: ', store.answer(), ' ,click: ', window.country) 
		if  (store.appState != 'AskQuestion' || store.mode == 'learning') return
		store.appState = 'AnswerQuestion'
		store.result.questions++
		if (store.answer().name == window.country.name)
		{
			store.result.rigth++
			var obj = {}
			obj[store.answer().code] = 'green'
			Map.updateChoropleth(obj, -1, false, false)
			store.next()	
		}
		 else
		{
			store.result.wrong++
			var obj = {}
			obj[store.answer().code] = 'green'
			Map.updateChoropleth(obj, 700, true, false)
			
			store.incorrectList.unshift({
					code: store.answer().code,
					name: store.answer().name
			})
		}
	}
	
	start() {
		store.start()
	}
	
	next() {
		store.next()
	}
	
	answer() {
		/** From Click on Button "Get Answer" **/
		if  (store.appState != 'AskQuestion') return
		store.appState = 'AnswerQuestion'
		store.result.questions++
		store.result.wrong++
		
		var obj = {}
		obj[store.answer().code] = 'Green'
		//obj[window.country.iso] = {fillKey: 'Red'}
		//this.map.updateChoropleth(obj);

		store.incorrectList.unshift({
					code: store.answer().code,
					name: store.answer().name
		})
		Map.updateChoropleth(obj, 700, true, false);
	}
	
	showPopUp(e) {
		store.showPopUp = e.target.value
		Map.load_map(store.map, store.showPopUp)
	}
	
	showAnswer(e) {
		/** Click on incorrect List or in Learning Mode **/
		if  (store.appState == 'AnswerQuestion') return
		this.stateAnswer = e.target.id
		if (this.stateAnswer == '') return
		
		if (store.mode == 'quiz')
		{
			store.prevState = store.appState
			store.appState = 'AnswerQuestion'
		}
		
		var stateSelected = false
		var timeout = 700
		if (store.mode == 'learning')
		{
			timeout = -1
			var change = true
			stateSelected = store.stateSelected(this.stateAnswer, change)
			//console.log('stateSelected: ', stateSelected)
		}
		var obj = {}
		if (stateSelected)
		{
			obj[this.stateAnswer] = 'green'
			e.target.setAttribute('selected','')
		}
		 else 
		 {
			obj[this.stateAnswer] = {fillKey: 'defaultFill'}
			e.target.removeAttribute('selected')
		 }
		
		Map.updateChoropleth(obj, timeout, false, true);
	}
	
	render() {
		const { panel1Toggle, panel2Toggle } = this
		const { panel1Open, panel2Open } = this.state
		
		const panel1Header = (
			<Row> 
				<Col sm={1} md={1} lg={1} style={{marginTop: "10px", marginLeft: "25px"}} componentClass={ControlLabel}>
					Mode
				</Col>
				<Col sm={2} md={2} lg={2}>
				  <FormControl value={store.mode} onChange={this.changeMode.bind(this)} componentClass="select">
					<option value="learning">Learning</option>
					<option value="quiz">Quiz</option>
				  </FormControl>
				</Col>
				<Col sm={2} md={2} lg={2} style={{marginTop: "10px", marginLeft: "25px"}} componentClass={ControlLabel}>
					Show names
				</Col>
				<Col sm={2} md={2} lg={2}>
				  <FormControl value={store.showPopUp} onChange={this.showPopUp.bind(this)} componentClass="select">
					<option value="yes">Yes</option>
					<option value="no">No</option>
				  </FormControl>
				</Col>
			</Row>
		)	
		/*const panel1Header = (
			<div onClick={panel1Toggle}>Question</div>
		)*/
		
		const panel2Header = (
			<div onClick={panel2Toggle}>Result</div>
		)
	
		var bottom = (<div></div>)
		if (store.appState == "NoQuestion")
			bottom = (<Button bsStyle="success" onClick={this.start.bind(this)}>Start</Button>)
		 else if (store.appState == "AnswerQuestion")
			bottom = (<Button bsStyle="success" disabled>Get Answer</Button>)
		 else
			bottom = (<Button bsStyle="success" onClick={this.answer.bind(this)}>Get Answer</Button>)

		if (store.mode == 'quiz')
		{
			var incorrectList = []
			store.incorrectList.forEach(function(el) {
				incorrectList.push(
					<div id={el.code}> 
						{el.name}
					</div>)
			})
			var panels = ([
				<Panel header="Question" collapsible expanded={panel1Open} bsStyle="success">
					<div>{store.quiz.question}</div>
					<div>{store.quiz.answer}</div>
					<div style={{marginTop: '10px'}}>{bottom}</div>
				</Panel>,
				<Panel style={{padding:"0"}} collapsible expanded={panel2Open} header={panel2Header} bsStyle='primary'>
					<div>Questions: {store.result.questions}</div>
					<div>Correct: {store.result.rigth}</div>
					<div>Incorrect: {store.result.wrong}</div>
				</Panel>,
				<Panel id="IncorrectPanel" header="Incorrect Answers" bsStyle="warning" 
					   onClick={this.showAnswer.bind(this)}>
					<div style={{height:"100px", overflowY:"scroll", padding:"10px 15px"}}>
						{incorrectList}
					</div>
				</Panel>
			])
		}
		else /** store.mode == 'learning' **/
		{
			var statesList = []
			store.states.forEach(function(el) {
				if (el.selected)
				{
				  //console.log('state updated: ', el.code)
				  statesList.push(
				    /** This does not work **/
					<div id={el.code} style={{backgroundColor:"gainsboro"}}> 
						{el.name}
					</div>)
				}
				 else 
					statesList.push(
					<div id={el.code}> 
						{el.name}
					</div>)
			})
			var panels = (
				<Panel id="IncorrectPanel" header={'States ('+store.states.length+')'} bsStyle="warning" 
					   onClick={this.showAnswer.bind(this)}>
					<div style={{height:"370px", overflowY:"scroll", padding:"10px 15px"}}>
						{statesList}
					</div>
				</Panel>
			)
		}
	  return (
		<Grid>
		  <Row>
		    <Col>
			  <Panel header={panel1Header} bsStyle="success" style={{backgroundColor: "#d8ecf3"}}>
				  <Col style={{padding:"5px"}} sm={9} md={9} lg={9}>
					<div id="theMap" onClick={this.msg.bind(this)}>Loading Map...</div>
				  </Col>
				  <Col style={{padding:"0"}} sm={3} md={3} lg={3}>
					  {panels}
				  </Col>
			  </Panel>
			</Col>
		    
		  </Row> 
		</Grid>
	  )
	}
}

