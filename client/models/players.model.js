// MobX
import {action, reaction, observable, extendObservable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class PlayersModel {

	@observable players = {
		train: {
			status: 'pending',
			value: observable.map()
		},
		currentTransfers: {
			status: 'pending',
			value: [],
			formatted: {}
		}
	};


	getTrainPlayers() {
		window.fetch('/learned')
			.then((trainPlayers)=> trainPlayers.json())
			.then((trainPlayers)=> {
				runInAction(`PLAYERS-GET-TRAIN-PLAYERS-SUCCESS`, ()=> {
					this.players.train.status = 'fulfilled';
					_.forEach(trainPlayers, (player)=> {
						player.player.output.position = player.player.output.position || '';
						this.players.train.value.set(player._id, player);
					});

				});
			});
	}


	saveTrainPlayer(playerData) {
		
		const player = JSON.stringify({
			input: playerData.player.input,
			output: {
				quality: playerData.player.output.quality,
				position: playerData.player.output.position
			}
		});
		window.fetch(`/learn_save_player?player=${player}`,
			{ method: "POST" }).then((e)=> {
				console.log('SAVED');
		});
	}


	changeTrainPlayerQuality(playerName, quality) {
		let currentPlayer = this.players.train.value.get(playerName);
		if(!currentPlayer) return runInAction(`PLAYERS-CHANGE-TRAIN-PLAYER-QUALITY-ERROR ${playerName}`, ()=> {});

		runInAction(`PLAYERS-CHANGE-TRAIN-PLAYER-QUALITY-SUCCESS ${playerName}`, ()=> {
			currentPlayer.player.output.quality = quality;
			this.players.train.value.set(playerName, currentPlayer);
		});
	}


	changeTrainPlayerPosition(playerName, position) {
		let currentPlayer = this.players.train.value.get(playerName);
		if(!currentPlayer) return runInAction(`PLAYERS-CHANGE-TRAIN-PLAYER-POSITION-ERROR ${playerName}`, ()=> {});

		runInAction(`PLAYERS-CHANGE-TRAIN-PLAYER-POSITION-SUCCESS ${playerName}`, ()=> {
			currentPlayer.player.output.position = position;
			this.players.train.value.set(playerName, currentPlayer);
		});
	}


	getCurrentTransfersPlayers() {
		window.fetch('/current_transfers')
			.then((currentTransfersPlayers)=> currentTransfersPlayers.json())
			.then((currentTransfersPlayers)=> {
				runInAction(`PLAYERS-GET-CURRENT-TRANSFERS-PLAYERS-SUCCESS`, ()=> {
					this.players.currentTransfers.status = 'fulfilled';
					this.players.currentTransfers.value = currentTransfersPlayers;

					let formattedPlayers = {};
					_.forEach(currentTransfersPlayers, (player)=> {
						let formattedPlayer = {};
						_.forEach(player, (skill, skillName)=> {
							if(skillName === 'name') return;
							formattedPlayer[skillName] = skill / 100;
						});
						formattedPlayers[player.name] = formattedPlayer;
					});

					this.players.currentTransfers.formatted = formattedPlayers;
				});
			});
	}
}

export default new PlayersModel();