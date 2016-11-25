/** A Classical Storage as a ES6 Class **/
/** Loading data from rest service - Using Axios **/
//import { observable } from "mobx"
import axios from "axios";
//import mydata from "../../data/usa2"

class StateStore {
	
	states = []
	
	constructor() {
		
		/** Load States Data **/
		this.load_from_url()
		//console.log('MyData: ', mydata)
	}
	
	load_from_url() {
		/*fetch('data/usa2.json')
		.then(function(res) {
				console.log('fetch maps: ', res)
				store.states = res.data
			})*/
		axios.get('data/usa.json')
			.then(function(res) {
				this.states = res.data
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
}

//var store = window.store = new CustomerStore

var store = new StateStore

export default store

/*autorun( function() {
	//console.log('[autorun] filter: ',store.filter)
	console.log(store.states)
})*/