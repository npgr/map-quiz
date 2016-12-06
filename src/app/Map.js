//import "../assets/maps/topojson.min.js"
//import "../assets/maps/d3.min.js"
//import "../assets/maps/datamaps.all.hires.min.js"
import store from "./store/StateStore"

class MapClass {

	stateAnswer = ''
	/*load_map(map) {
		var my_awesome_script = document.createElement('script');
		my_awesome_script.setAttribute('src','assets/maps/datamaps.all.hires.min.js');
		var x = document.getElementById('xx')
		x.appendChild(my_awesome_script)
		//document.body.appendChild(my_awesome_script);
		my_awesome_script.onload = this.load_map2(map);
		//this.load_map2(map)
	}*/
	
	load_map(map, showPopUp) {
		
		var mapObj = {
			scope: map,
			projection: 'mercator',
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
			height: 420,
			geographyConfig: {
              borderColor: '#444',
              borderWidth: 0.5,
			  //popupOnHover: showPopUp,
			  popupTemplate: function(geography, data) {
				//Load some data
				window.country = geography.properties
				if (showPopUp=='yes')
					if (map == 'esp')
						return '<div class="hoverinfo">' + geography.properties.name 
                                + '<br>'+data.region+'</div>' 
					else
					  return '<div class="hoverinfo">' + geography.properties.name 
				//+ '<br>Population: '+data.population+'</div>'
			  },
            },
			fills: {
              'Brown': 'brown',
			  'Blue': 'blue',
			  'Pink': 'pink',
			  'Orange': 'orange',
			  'Yellow': 'yellow',
              'Red': 'red',
			  'Green': 'green',
			  'defaultFill': '#dddddd' 
			},
			data:{
				/*"USA": {
					"fillKey": "Red",
					"population": 1000
				},
				"PRT": {
					"fillKey": "Red",
					"population": 1000
				},
				"TX": {
					"fillKey": "Red",
					"population": 1000
				},
				"AK": {
					"fillKey": "Red",
					"population": 1000
				}*/
			}
		}
		if (map == 'prt')
		{
			mapObj.setProjection = 
				function(element, options) {
					var projection, path;
                    projection = d3.geo.mercator()
                       .center([-8.80, 39.50])
                       .scale(3300)
                       .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                         path = d3.geo.path().projection( projection );
                       return {path: path, projection: projection};
                }
				
			//mapObj.geographyConfig.dataJson= 'https://rawgit.com/markmarkoh/datamaps/master/src/js/data/prt.json'
		}
		if (map == 'esp')
		{
			mapObj.setProjection = 
				function(element, options) {
					var projection, path;
                    projection = d3.geo.mercator()
                       .center([-93.00, 40.08])
					   .rotate([-90.0, 0])
                       .scale(2300)
                       .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                         path = d3.geo.path().projection( projection );
                       return {path: path, projection: projection};
                }
			mapObj.data = {
				"CT": {
					"region": "Cataluña",
				},
				"PV": {
					"region": "Pais Vasco",
				},
				"CM": {
					"region": "Castilla - La Mancha",
				},
				"VC": {
					"region": "Comunidad Valenciana",
				},
				"AN": {
					"region": "Andalucia",
				},
				"AS": {
					"region": "Principado Asturias",
				},
				"CL": {
					"region": "Castilla y León"
				},
				"EX": {
					"region": "Extremadura"
				},
				"PM": {
					"region": "Islas Baleares"
				},
				"CT": {
					"region": "Cataluña"
				},
				"CB": {
					"region": "Cantabria"
				},
				"MD": {
					"region": "Comunidad de Madrid"
				},
				"AR": {
					"region": "Aragón"
				},
				"GA": {
					"region": "Galicia"
				},
				"LO": {
					"region": "La Rioja"
				},
				"CM": {
					"region": "Castilla - La Mancha"
				},
				"NA": {
					"region": "Navarra"
				},
				"MU": {
					"region": "Murcia"
				},
			}
		}
		document.getElementById('theMap').innerHTML = ''
		this.map = new Datamap(mapObj)
	}
	
	updateChoropleth(obj, timeout, next, prevState) {
		this.map.updateChoropleth(obj);
		this.stateAnswer = Object.keys(obj)[0]
		if (timeout != -1)
		{
		  if (next)
			setTimeout(function() {
				var obj = {}
				//obj[store.answer().code] = {fillKey: 'defaultFill'}
				obj[this.stateAnswer] = {fillKey: 'defaultFill'}
				this.map.updateChoropleth(obj); 
				store.next()
			}.bind(this)
		    , timeout)
		  else if (prevState)
			setTimeout(function() {
				var obj = {}
				obj[this.stateAnswer] = {fillKey: 'defaultFill'}
				this.map.updateChoropleth(obj); 
				store.appState = store.prevState
			}.bind(this)
		    , timeout)
		  else 
			setTimeout(function() {
				var obj = {}
				obj[this.stateAnswer] = {fillKey: 'defaultFill'}
				this.map.updateChoropleth(obj); 
			}.bind(this)
		    , timeout)
		}
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
}

var Map = new MapClass

export default Map