// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import netModel from "../models/net.model";
import playersModel from "../models/players.model";


@observer
class LearnedPlayersTable extends React.Component {

	@computed get NET() { return netModel.NET; };

	@computed get trainPlayers() { return playersModel.players.train; };

	@computed get formattedTrainPlayers() { return playersModel.players.formattedTrain; };


	render() {
		if(this.trainPlayers.status === 'pending') return <h4>Loading trainPlayers...</h4>;

		console.log(this.trainPlayers, 42);

		return (
			<div>
				Learned Table
			</div>
		);
	}
}

export default LearnedPlayersTable;

