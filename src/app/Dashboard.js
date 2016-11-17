import React from "react";
import { Form, Glyphicon, FormGroup, FormControl, ControlLabel, Panel, Grid, Row, Col } from "react-bootstrap";

export default class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			panel1Open: true,
			panel2Open: true
		}
		this.country = 'prueba'
		
		this.panel1Toggle = this.panel1Toggle.bind(this)
		this.panel2Toggle = this.panel2Toggle.bind(this)
		setTimeout(function() {
			this.load_map('world') }.bind(this)
		  , 1000)
	}
	
	panel1Toggle = () => this.setState({panel1Open: !this.state.panel1Open})
	
	panel2Toggle = () => this.setState({panel2Open: !this.state.panel2Open})
	
	load_world = () => this.load_map('world')
	
	load_map(map) {
		document.getElementById('theMap').innerHTML = ''
		new Datamap({
            //scope: 'world',
			//scope: 'usa',
			scope: map,
			//projection: 'mercator',
            element: document.getElementById('theMap'),
			// Zoom 
			/*setProjection: function(element) {
				var projection = d3.geo.equirectangular()
					//Africa
					//.center([23, 2])
					//.rotate([4.4, 0])
					//.scale(300)
					// Europa
					.center([23, 52])
					.rotate([4.4, 0])
					.scale(600)
					.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
					var path = d3.geo.path()
					.projection(projection);

				return {path: path, projection: projection};
			},*/
			height: 380,
			geographyConfig: {
              borderColor: '#444',
              borderWidth: 0.5,
			  popupTemplate: function(geography, data) {
				//Load some data
				this.country = geography.properties.iso
				return '<div class="hoverinfo">Country: ' + geography.properties.name 
				//+ '<br>Population: '+data.population+'</div>'
			  },
            },
			fills: {
              'Red': 'red',
			  'defaultFill': '#dddddd'
			  
			},
			data:{
				"USA": {
					"fillKey": "Red",
					"population": 1000
				}
			}
		})
	}
	
	loadx_map () {
		var election = new Datamap({
            scope: 'usa',
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
              //'defaultFill': '#dddddd',
			  'defaultFill': '#e99b63',
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
	
	change_map(e) {
		console.log()
		this.load_map(e.target.value)
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
						<option value="fra">France</option>
						<option value="world">World</option>
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
					<div id="theMap">Loading Map...</div>
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
				{this.country}
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

