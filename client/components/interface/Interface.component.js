// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import playersModel from "../../models/players.model";
// Components
import InterfacePlayer from "./InterfacePlayer.component";


// create edit form for each player
// save to [interface]
@observer
class Interface extends React.Component {


	@observable sortedPlayers = _.take(playersModel.players.currentTransfers.value, 5);

	@observable sortBy = '';

	@computed get currentTransfers() { return _.take(playersModel.players.currentTransfers.value, 5); };


	render() {
		if(playersModel.players.currentTransfers.status !== 'fulfilled') return <p>Loading...</p>;

		return (
			<div style={{ fontFamily: 'Arial' }}>

				<div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1, display: 'flex', justifyContent: 'space-around' }}>
					<button style={{
						margin: '20px 0',
						float: 'left',
						border: 'none',
						padding: '15px 25px',
						color: 'white',
						background: 'rgb(193, 53, 63)',
						cursor: 'pointer',
						outline: 'none',
						fontSize: 25
					}}
					onClick={ ()=> {
						this.sortBy = this.sortBy === 'age:down' ? 'age:up' : 'age:down';
						this.sortedPlayers = _.sortBy(this.currentTransfers, (player)=> this.sortBy === 'age:down' ? -player.age : player.age )
					}}
					>age {
						this.sortBy === 'age:down' ?
							'⬇'
							:
							this.sortBy === 'age:up' ? '⬆' : ' '
					}</button>
				</div>

				<div style={{ marginTop: 80, position: 'relative' }}>
					{ _.map(this.sortedPlayers, (player, i)=> {
						return <InterfacePlayer player={ player } key={player.name} index={i} />
					}) }
				</div>
			</div>
		);
	}
}

export default Interface;

