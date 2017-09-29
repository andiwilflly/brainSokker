// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import netModel from "./models/net.model";
import playersModel from "./models/players.model";
// Components
import CurrentTransfersTable from "./components/CurrentTransfersTable.component";


@observer
class App extends React.Component {

	componentDidMount() {
		playersModel.getTrainPlayers();
		playersModel.getCurrentTransfersPlayers();

		this['getTrainPlayers -> create NET'] = reaction(
			()=> this.trainPlayers.status === 'fulfilled',
			()=> {
				let learnedData = _.map(this.trainPlayers.value, (row)=> {
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


	render() {
		return (
			<div style={{
				fontSize: '16',
				fontFamily: "Arial",
				lineHeight: '150%'
			}}>
				<div style={{
					width: 1000,
					backgroundColor: 'whitesmoke',
					margin: '0 auto',
					padding: 20
				}}>
					<h4>Brain sokker predictor</h4>

					<CurrentTransfersTable />
				</div>
			</div>
		);
	}
}

export default App;

