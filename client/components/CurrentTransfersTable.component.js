// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import netModel from "../models/net.model";
import playersModel from "../models/players.model";


@observer
class CurrentTransfersTable extends React.Component {

	@computed get NET() { return netModel.NET; };

	@computed get trainPlayers() { return playersModel.players.train; };

	@computed get formattedTrainPlayers() { return playersModel.players.formattedTrain; };

	@computed get currentTransfers() { return playersModel.players.currentTransfers; };


	render() {
		if(this.trainPlayers.status === 'pending') return <h4>Loading trainPlayers...</h4>;
		if(this.currentTransfers.status === 'pending') return <h4>Loading currentTransfers...</h4>;

		return (
			<div>
				{ _.map(this.currentTransfers.value, (player, i)=> {

					const formattedPlayer = this.formattedTrainPlayers.value[player.name];
					const quality = Math.round(this.NET.run(formattedPlayer).quality * 10);

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
												<b>{ player[names[0]] }</b>
											</td>
											<td style={{
												width: '25%',
												padding: '0 10px'
											}} key={ names[1] }>
												{ names[1] }:
											</td>
											<td style={{
												width: '25%',
												padding: '0 10px'
											}} key={ index+1 }>
												<b>{ player[names[1]] }</b>
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
								<p>quality: { quality }</p>
							</div>
						</div>
					);
				}) }
			</div>
		);
	}
}

export default CurrentTransfersTable;

