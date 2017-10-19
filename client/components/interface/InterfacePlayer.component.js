import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
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


	@computed get playerData() {
		return {
			input: this.props.player,
			output: this.output.toJS()
		};
	};


	savePlayerData = ()=> {
		console.log('save??', this.playerData);
	};


	render() {
		const player = this.props.player;

		return (
			<div style={{ width: 700, height: 350, background: 'white', margin: 20, float: 'left' }}>
				<div style={{ float: 'left', padding: '20px 0 0 20px', width: 250 }}>
					<p style={{ margin: '0 0 10px 0' }}>{ player.name }</p>
					<p>age { player.age }</p>

					<div style={{ fontSize: '14px', margin: '35px 0 0 0' }}>
						<div key='1' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}>{ player.stamina } (stamina)</p>
							<p style={{ padding: '10px' }}>{ player.keeper } (keeper)</p>
						</div>
						<div key='2' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}>{ player.pace } (pace)</p>
							<p style={{ padding: '10px' }}>{ player.defender } (defender)</p>
						</div>
						<div key='3' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}>{ player.technique } (technique)</p>
							<p style={{ padding: '10px' }}>{ player.playmaker } (playmaker)</p>
						</div>
						<div key='4' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
							<p style={{ padding: '10px' }}>{ player.passing } (passing)</p>
							<p style={{ padding: '10px' }}>{ player.striker } (striker)</p>
						</div>
					</div>
				</div>
				<div style={{ float: 'right', width: 400, height: 280, marginTop: 20 }}>
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

