// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import playersModel from "../../models/players.model";
import netModel from "../../models/net.model";
// Components
import InterfacePlayer from "./InterfacePlayer.component";


// create edit form for each player
// save to [interface]
@observer
class Interface extends React.Component {


	constructor() {
		super();
		playersModel.getInterfacePlayers();
	}


	 componentDidMount() {
		 this['@reaction getInterfacePlayers -> create and learn NET'] = reaction(
			 ()=> this.interfacePlayers.status === 'fulfilled',
			 ()=> {
				 let learnedData = _.map(this.interfacePlayers.value.toJS(), (row)=> {
					 delete row.player.input.name;
					 return row.player;
				 });
				 netModel.trainNet(learnedData);
			 },
			 {name: '@reaction getInterfacePlayers -> create and learn NET'}
		 );

		 this['@reaction getTransfersPlayers -> render'] = reaction(
			 ()=> this.currentTransfers.status === 'fulfilled',
			 ()=> {
				 this.sortedPlayers = playersModel.players.currentTransfers.value;
			 },
			 { name: '@reaction getInterfacePlayers -> render'}
		 );
	 }


	@observable sortedPlayers = [];

	@observable sortBy = '';


	@computed get NET() { return netModel.NET; };

	@computed get interfacePlayers() { return playersModel.players.interface; };

	@computed get currentTransfers() { return playersModel.players.currentTransfers; };


	render() {
		if(!netModel.isTrained) return <p>NET Loading...</p>;
		if(this.currentTransfers.status !== 'fulfilled') return <p>currentTransfers Loading...</p>;

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
						this.sortedPlayers = _.sortBy(this.currentTransfers.value, (player)=> this.sortBy === 'age:down' ? -player.age : player.age )
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

