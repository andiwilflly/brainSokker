// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, runInAction, spy } from 'mobx';
// Models
import netModel from "./models/net.model";
import playersModel from "./models/players.model";
// Components
import CurrentTransfersTable from "./components/CurrentTransfersTable.component";
import LearnedPlayersTable from "./components/LearnedPlayersTable.component";
import Interface from "./components/interface/Interface.component";


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
		//playersModel.getTrainPlayers();
		playersModel.getCurrentTransfersPlayers();

		// this['getTrainPlayers -> create NET'] = reaction(
		// 	()=> this.trainPlayers.status === 'fulfilled',
		// 	()=> {
		// 		let learnedData = _.map(this.trainPlayers.value.values(), (row)=> {
		// 			delete row.player.input.name;
		// 			delete row.player.input.id;
		// 			delete row.player.input._id;
		// 			delete row.player.input.estimated;
		// 			delete row.player.input.profit;
		//
		// 			return row.player;
		// 		});
		// 		console.log(learnedData);
		// 		netModel.trainNet(learnedData);
		// 	}
		// );
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
		if(window.location.pathname === '/interface') return <Interface />;

		return (
			<div style={{
				fontSize: '16',
				fontFamily: "Arial",
				lineHeight: '150%',
				marginTop: 220
			}}>
				<div style={{
					width: 1000,
					backgroundColor: 'lightslategrey',
					margin: '0 auto',
					padding: 20
				}}>
					<div style={{ position: 'fixed', top: 0, left: 0 , right: 0, backgroundColor: '#d2cfcf' }}>
						<a href="/">home</a><br/>
						<a href="/learnedPlayers">learnedPlayers</a><br/>
						<a href="/interface">interface</a>
						<div>
							0.1 GK, <br/>
							0.2 DEF, <br/>
							0.3 MID, <br/>
							0.4 ATT <br/>
						</div>
					</div>

					{ this.renderRouter() }

				</div>
			</div>
		);
	}
}

export default App;

