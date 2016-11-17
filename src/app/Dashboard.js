import React from "react";
import { Glyphicon, FormGroup, FormControl, ControlLabel, Panel, Jumbotron, Grid, Row, Col } from "react-bootstrap";

export default class Dashboard extends React.Component {

	/*constructor(props) {
		super(props)
		console.log('About')
	}*/
	 
  render() {
	
	return (
		<Grid>
		  <Row>
		    <Col xs={6} sm={6} md={6} lg={6}>
			  <Panel header="Type">
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
		      <Panel header="Data">
				<FormGroup controlId="formControlsSelect2">
				<FormControl componentClass="select">
					<option value="select">Value 1</option>
					<option value="other">Value 2</option>
				</FormControl>
			  </FormGroup>
		      </Panel>
			</Col>
		  </Row>
		  <Row className="show-grid">
		    <Col>
		      <Panel header={<div><Glyphicon glyph="star"/> MAP</div>}>
				<Glyphicon glyph="star" /> MAP
		      </Panel>
			</Col>
		  </Row>
		  
		</Grid>
	)
  }
}

