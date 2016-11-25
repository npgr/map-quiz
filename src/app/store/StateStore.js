/** A Classical Storage as a ES6 Class **/
/** Loading data from rest service - Using Axios **/
import { observable } from "mobx"
import axios from "axios";
//import mydata from "../../data/usa2"

class StateStore {

	@observable 
	quiz =
	{
		id: -1,
		question: 'Press Button for Starting Quiz',
		answer: ''
	}
	
	@observable
	result =
	{
		questions: 0,
		rigth: 0,
		wrong: 0
	}
	
	states = []
	
	constructor() {
		
		/** Load States Data **/
		//this.load_from_url()
		//console.log('MyData: ', mydata)
	}
	
	next() {
		if (this.quiz.id+1 < this.states.length)
		{
			this.quiz.id++
			this.quiz.question = 'Where is located '+this.states[this.quiz.id].name+'?'
			//this.result.questions++
			//this.result.rigth++
		}
		else
			this.quiz.question = 'End of Quiz'
	}
	
	answer() {
		return this.states[this.quiz.id]
	}
	
	load_from_url(country) {
		/*fetch('data/usa2.json')
		.then(function(res) {
				console.log('fetch maps: ', res)
				store.states = res.data
			})*/
		axios.get('data/'+country+'.json')
			.then(function(res) {
				this.states = res.data
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
}

//var store = window.store = new StateStore

var store = new StateStore

export default store

/*autorun( function() {
	//console.log('[autorun] filter: ',store.filter)
	console.log(store.states)
})*/