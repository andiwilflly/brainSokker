// MobX
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class PlayersModel {

	@observable players = {
		train: {
			status: 'pending',
			value: []
		},
		formattedTrain: {
			status: 'pending',
			value: {}
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
				runInAction(`PLAYERS-GET-CURRENT-TRANSFERS-PLAYERS-SUCCESS`, ()=> {
					this.players.currentTransfers.status = 'fulfilled';
					this.players.currentTransfers.value = currentTransfersPlayers;

					let formattedTrainPlayers = {};
					_.forEach(currentTransfersPlayers, (player)=> {
						let formattedTrainPlayer = {};
						_.forEach(player, (skill, skillName)=> {
							if(skillName === 'name') return;
							formattedTrainPlayer[skillName] = skill / 100;
						});
						formattedTrainPlayers[player.name] = formattedTrainPlayer;
					});

					this.players.formattedTrain.status = 'fulfilled';
					this.players.formattedTrain.value = formattedTrainPlayers;
				});
			});
	}
}

export default new PlayersModel();