import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Models
import playersModel from "../../models/players.model";
import InterfaceTabelModel from "./InterfaceTable.model";
// Components
import InterfacePlayerChart from "./InterfacePlayerChart.component";


@observer
class InterfacePlayer extends React.Component {

	output = observable.map({
		GK: '0.0',
		DEF: '0.0',
		MID: '0.0',
		ATT: '0.0'
	});

	@observable isReady = false;


	constructor(props) {
		super();
		this.table = new InterfaceTabelModel();

		window.addEventListener('resize', this.onWindowResize);

		setTimeout(()=> this.isReady = true, props.index * 100);
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}


	@computed get playerData() {
		return {
			input: this.props.player,
			output: this.output.toJS()
		};
	};


	onWindowResize = ()=> {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(()=> this.table.windowWidth = window.innerWidth - this.table.pageScrollBar, 100);
	};


	savePlayerData = ()=> {
		playersModel.saveInterfacePlayerData(this.playerData);
	};


	render() {
		const player = this.props.player;
		const index = this.props.index;

		if(!this.isReady) return (
			<div style={{
				width: this.table.itemWidth,
				height: this.table.itemHeight,
				top: this.table.top(index),
				left: this.table.left(index),
				background: 'transparent',
				position: 'absolute'
			}} />
		);

		return (
			<div style={{
				width: this.table.itemWidth,
				height: this.table.itemHeight,
				top: this.table.top(index),
				left: this.table.left(index),
				background: 'white',
				position: 'absolute',
				transition: '1s background'
			}}>
				<div style={{ float: 'left', padding: '20px 0 0 20px', width: 'calc(45% - 20px)' }}>
					<p style={{ margin: '0 0 10px 0' }}>{ player.name }</p>
					<p>age { player.age * 100 }</p>

					<div style={{ fontSize: '12px', margin: '35px 0 0 0' }}>
						<div key='1' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.stamina * 100) }</b> (stamina)</p>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.keeper * 100) }</b> (keeper)</p>
						</div>
						<div key='2' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.pace * 100) }</b> (pace)</p>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.defender * 100) }</b> (defender)</p>
						</div>
						<div key='3' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.technique * 100) }</b> (technique)</p>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.playmaker * 100) }</b> (playmaker)</p>
						</div>
						<div key='4' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.passing * 100) }</b> (passing)</p>
							<p style={{ padding: '10px' }}><b>{ Math.round(player.striker * 100) }</b> (striker)</p>
						</div>
					</div>
				</div>

				<div style={{ float: 'right', width: '55%', height: 280, marginTop: 20 }}>
					<InterfacePlayerChart playerData={ this.playerData } />
				</div>

				<div style={{
					float: 'right',
					display: 'flex',
					justifyContent: 'space-between',
					boxSizing: 'border-box',
					width: '50%',
					padding: '0 20px 0 0'
				}}>
					<p>
						<span>GK</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('GK') }
								   onChange={ (e)=> this.output.set('GK', e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>DEF</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('DEF') }
								   onChange={ (e)=> this.output.set('DEF', e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>MID</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('MID') }
								   onChange={ (e)=> this.output.set('MID', e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>ATT</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('ATT') }
								   onChange={ (e)=> this.output.set('ATT', e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
				</div>

				<button style={{
					margin: '0 0 0 20px',
					float: 'left',
					border: 'none',
					padding: 10,
					color: 'white',
					background: 'rgb(61, 117, 160)',
					outline: 'none',
					cursor: 'pointer'
				}} onClick={ this.savePlayerData }>Save</button>
			</div>
		);
	}
}

export default InterfacePlayer;

