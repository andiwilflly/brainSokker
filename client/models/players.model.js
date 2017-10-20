// MobX
import {action, reaction, observable, extendObservable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class PlayersModel {

	@observable players = {
		interface: {
			status: 'pending',
			value: observable.map()
		},
		currentTransfers: {
			status: 'pending',
			value: [],
			formatted: {}
		}
	};


	getInterfacePlayers() {
		window.fetch('/interface_players')
			.then((interfacePlayers)=> interfacePlayers.json())
			.then((interfacePlayers)=> {
				runInAction(`PLAYERS-GET-INTERFACE-PLAYERS-SUCCESS`, ()=> {
					this.players.interface.status = 'fulfilled';
					console.log('interface', interfacePlayers);
					_.forEach(interfacePlayers, (player)=> {
						this.players.interface.value.set(player._id, player);
					});
				});
			});
	}


	saveInterfacePlayerData(playerData) {
		console.log('SAVED: ', playerData.output);
		return window.fetch(`/save_interface_player_data?playerData=${JSON.stringify(playerData)}`, { method: "POST" });
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