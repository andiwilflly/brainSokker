// MobX
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class PlayersModel {

	@observable players = {
		train: {
			status: 'pending',
			value: []
		},
		currentTransfers: {
			status: 'pending',
			value: []
		}
	};


	getTrainPlayers() {
		window.fetch('/learned')
			.then((trainPlayers)=> trainPlayers.json())
			.then((trainPlayers)=> {
				console.log(trainPlayers, 'trainPlayers!');

				runInAction(`PLAYERS-GET-TRAIN-PLAYERS-SUCCESS`, ()=> {
					this.players.train.status = 'fulfilled';
					this.players.train.value = trainPlayers;
				});
			});
	}


	getCurrentTransfersPlayers() {
		window.fetch('/current_transfers')
			.then((currentTransfersPlayers)=> currentTransfersPlayers.json())
			.then((currentTransfersPlayers)=> {
				console.log(currentTransfersPlayers, 'currentTransfersPlayers!');

				runInAction(`PLAYERS-GET-CURRENT-TRANSFERS-PLAYERS-SUCCESS`, ()=> {
					this.players.currentTransfers.status = 'fulfilled';
					this.players.currentTransfers.value = currentTransfersPlayers;
				});
			});
	}
}

export default new PlayersModel();