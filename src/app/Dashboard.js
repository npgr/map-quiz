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
		setTimeout(function() {
			document.getElementById('theMap').innerHTML = ''
			this.load_map() }.bind(this)
		  , 1000)
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	 
	load_map() {
		new Datamap({
            //scope: 'world',
			//projection: 'mercator',
            element: document.getElementById('theMap'),
			height: 380,
			geographyConfig: {
              borderColor: '#444',
              borderWidth: 0.5
            },
			fills: {
              'defaultFill': '#dddddd'
			}
		})
	}
	
	loadx_map () {
		var election = new Datamap({
            scope: 'world',
            element: document.getElementById('theMap'),
			height: 520,
            geographyConfig: {
              borderColor: '#444',
              borderWidth: 0.5
            },
            bubblesConfig: {
			        //animate: false,
              borderColor: '#000',
              borderWidth: 1,
              fillOpacity: 1.0,
              filterKey: 'dropShadow',
              popupTemplate: function(geography, data) {
                return '<div class="hoverinfo">Some From New: data about ' + data.centered + '</div>'
              }
            },
            fills: {
              'defaultFill': '#dddddd',
              'good': 'url(#good)',
              'medium': 'url(#medium)',
              'bad': 'url(#bad)',
              'horizontalStripe': 'url(#horizontal-stripe)',
              'diagonalStripe': 'url(#diagonal-stripe)'
            },
            filters: {
              'dropShadow': 'url(#dropShadow)',
              'bigShadow': 'url(#bigShadow)'
            },
            data:{
              'TX': {fillKey: 'diagonalStripe'}
            }
          });
	}
	 
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
		    <Col sm={9} md={9} lg={9}>
		      <Panel header="Map" bsStyle="success">
				<div id="theMap">Loading Map...</div>
		      </Panel>
			</Col>
		    <Col sm={3} md={3} lg={3}>
			  <Panel collapsible expanded={panel1Open} header={panel1Header} bsStyle="success">
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

