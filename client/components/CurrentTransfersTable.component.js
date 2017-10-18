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

	@computed get currentTransfers() { return playersModel.players.currentTransfers; };

	@computed get formattedCurrentTransfers() { return playersModel.players.currentTransfers.formatted; };


	positions = {
		'0.1': 'GK',
		'0.2': 'DEF',
		'0.3': 'MID',
		'0.4': 'ATT',
	};


	render() {
		if(this.trainPlayers.status === 'pending') return <h4>Loading trainPlayers...</h4>;
		if(this.currentTransfers.status === 'pending') return <h4>Loading currentTransfers...</h4>;

		return (
			<div>
				{ _.map(this.currentTransfers.value, (player, i)=> {

					const formattedPlayer = this.formattedCurrentTransfers[player.name];
					const netRunData = this.NET.run(formattedPlayer);
					const quality = Math.round(netRunData.quality * 10);
					const position = netRunData.position.toFixed(1);

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

								<p>position: { this.positions[position] } ({ netRunData.position }/{ position })</p>
							</div>
						</div>
					);
				}) }
			</div>
		);
	}
}

export default CurrentTransfersTable;

