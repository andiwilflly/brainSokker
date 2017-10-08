// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, runInAction, spy } from 'mobx';
// Models
import netModel from "./models/net.model";
import playersModel from "./models/players.model";
// Components
import CurrentTransfersTable from "./components/CurrentTransfersTable.component";
import LearnedPlayersTable from "./components/LearnedPlayersTable.component";


@observer
class App extends React.Component {


	constructor() {
		super();
		// @SOURCE: https://mobxjs.github.io/mobx/refguide/spy.html
		spy((event)=> {
			if(event.type === 'action') {
				if(event.name.match('FORM-')) return;

				if(event.name.match('-ERROR')) return console.log('%c' + event.name, 'color: darkred');
				if(event.name.match('-SUCCESS')) return console.log('%c' + event.name, 'color: #03a528;');
				if(event.name.match('@reaction')) return console.log('%c' + event.name, 'color: orange;');
				console.log('%c' + event.name, 'color: lightblue');
			}
		});
	}


	componentDidMount() {
		playersModel.getTrainPlayers();
		playersModel.getCurrentTransfersPlayers();

		this['getTrainPlayers -> create NET'] = reaction(
			()=> this.trainPlayers.status === 'fulfilled',
			()=> {
				let learnedData = _.map(this.trainPlayers.value.values(), (row)=> {
					delete row.player.input.name;
					delete row.player.input.id;
					delete row.player.input._id;
					delete row.player.input.estimated;
					delete row.player.input.profit;

					row.player.output.quality = (+row.player.output.quality) / 10;
					return row.player;
				});
				netModel.trainNet(learnedData);
			}
		);
	}


	componentWillUnmount() {
		this['getTrainPlayers -> create NET']();
	}


	@computed get trainPlayers() { return playersModel.players.train; };


	renderRouter = ()=> {
		switch(window.location.pathname) {
			case '/learnedPlayers':
				return (
					<LearnedPlayersTable />
				);
			default:
				return <CurrentTransfersTable />
		}
	};


	render() {
		return (
			<div style={{
				fontSize: '16',
				fontFamily: "Arial",
				lineHeight: '150%'
			}}>
				<div style={{
					width: 1000,
					backgroundColor: 'lightslategrey',
					margin: '0 auto',
					padding: 20
				}}>
					<h4>Brain sokker predictor</h4>
					<a href="/">home</a><br/>
					<a href="/learnedPlayers">learnedPlayers</a>

					{ this.renderRouter() }

				</div>
			</div>
		);
	}
}

export default App;

