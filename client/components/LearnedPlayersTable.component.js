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


	render() {
		if(this.trainPlayers.status === 'pending') return <h4>Loading trainPlayers...</h4>;

		return (
			<div>
				{ _.map(this.trainPlayers.value.values(), (playerData, i)=> {
					let player = playerData.player.input;
					let output = playerData.player.output;

					delete player.current;
					player.name = playerData._id;

					_.forEach(player, (skill, skillName)=> {
						if(_.isNull(skill)) player[skillName] = 0;
					});

					return (
						<div key={i} style={{
							margin: '20px 0',
							border: '1px solid gray'
						}}>
							<table style={{
								width: '100%'
							}}>
								<tbody>
								{ _.map(_.chunk(Object.keys(player), 2), (names, index)=> {
									return (
										<tr key={ index } style={{
											height: 45,
											backgroundColor: index % 2 ? 'whitesmoke' : 'lightgray'
										}}>
											<td style={{
												width: '25%',
												padding: '0 10px'
											}} key={ names[0] }>
												{ names[0] }:
											</td>
											<td style={{
												width: '25%',
												padding: '0 10px'
											}} key={ index }>
												<b>{ _.isNumber(player[names[0]]) ? Math.round(player[names[0]] * 100) : player[names[0]] }</b>
											</td>
											<td style={{
												width: '25%',
												padding: '0 10px'
											}} key={ names[1] }>
												{ player[names[1]] ? names[1] + ':' : '' }
											</td>
											<td style={{
												width: '25%',
												padding: '0 10px'
												}} key={ index+1 }>
												<b>{ _.isNumber(player[names[1]]) ? Math.round(player[names[1]] * 100) : player[names[1]] }</b>
											</td>
										</tr>
									)
								}) }
								</tbody>
							</table>

							<div style={{
								padding: 10,
								backgroundColor: 'lightblue',
								borderTop: '1px solid gray'
							}}>
								<p>
									quality: <input type="text"
												   value={ output.quality }
												   onChange={ (e)=> playersModel.changeTrainPlayerQuality(player.name, +e.nativeEvent.target.value) } />
								</p>
							</div>
							<div style={{
								padding: 10,
								backgroundColor: 'lightblue',
								borderTop: '1px solid gray'
							}}>
								<p>
									position: <input type="text"
													value={ output.position || '' }
													onChange={ (e)=> playersModel.changeTrainPlayerPosition(player.name, e.nativeEvent.target.value) }/>
								</p>
							</div>
							<div>
								<button onClick={ ()=> playersModel.saveTrainPlayer(playerData) }>Save changes</button>
							</div>
						</div>
					);
				}) }
			</div>
		);
	}
}

export default LearnedPlayersTable;

