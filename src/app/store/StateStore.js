/** A Classical Storage as a ES6 Class **/
/** Loading data from rest service - Using Axios **/
import { observable } from "mobx"
import axios from "axios";
//import states from "../../data/usa2"

class StateStore {

	/** NoQuestion, AskQuestion, AnswerQuestion **/
	@observable	appState = 'NoQuestion'
	
	prevState = ''
	
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
	
	@observable	incorrectList = []
	
	@observable	showPopUp = 'yes'
	
	@observable	map = ''
	
	@observable mode = 'learning'
	
	@observable states = []
	
	constructor() {
		
		/** Load States Data **/
		//console.log('this.states: ', this.states) 
		//this.load_from_url('usa')
		//console.log('MyData: ', mydata)
	}
	
	setMode(mode)
	{
		function compare(a,b) {
				if (a.name < b.name)
					return -1;
				if (a.name > b.name)
					return 1;
				return 0;
		}
		this.mode = mode
		
		if (mode == 'learning')
		{
			this.states = this.states.sort(compare)
			this.appState = 'NoQuestion'
		}
		else /** mode = quiz **/
		{
			this.appState = 'NoQuestion'
			this.quiz =
			{
				id: -1,
				question: 'Press Button for Starting Quiz',
				answer: ''
			}
			this.result = 
			{
				questions: 0,
				rigth: 0,
				wrong: 0
			}
			this.incorrectList = []
		}
	}
	
	start() {
		this.quiz.id = -1
		this.incorrectList = []
		this.result = 
		{
			questions: 0,
			rigth: 0,
			wrong: 0
		}
		this.shuffle(this.states)
		this.next()
	}
	
	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) 
		{
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	
	next() {
		if (this.quiz.id+1 < this.states.length)
		{
			this.appState = 'AskQuestion'
			this.quiz.id++
			this.quiz.question = 'Where is located '+this.states[this.quiz.id].name+'?'
			//this.result.questions++
			//this.result.rigth++
		}
		else
		{
			this.appState = 'NoQuestion'
			this.quiz.question = 'End of Quiz'
		}
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
				function compare(a,b) {
					if (a.name < b.name)
						return -1;
					if (a.name > b.name)
						return 1;
					return 0;
				}
				this.states = res.data.sort(compare)
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