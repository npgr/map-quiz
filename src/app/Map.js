//import "../assets/maps/topojson.min.js"
//import "../assets/maps/d3.min.js"
//import "../assets/maps/datamaps.all.hires.min.js"

class MapClass {


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
		document.getElementById('theMap').innerHTML = ''
		this.map = new Datamap({
            //scope: 'world',
			//scope: 'usa',
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
					return '<div class="hoverinfo">' + geography.properties.name 
				//+ '<br>Population: '+data.population+'</div>'
			  },
            },
			fills: {
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
		})
	}
	
	updateChoropleth(obj) {
		this.map.updateChoropleth(obj);
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