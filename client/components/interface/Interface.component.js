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


	@computed get currentTransfers() { return _.take(playersModel.players.currentTransfers.value, 50); };


	render() {
		return (
			<div style={{ fontFamily: 'Arial' }}>
				{ _.map(this.currentTransfers, (player, i)=> {
					return <InterfacePlayer player={ player } key={i} />
				}) }
			</div>
		);
	}
}

export default Interface;

