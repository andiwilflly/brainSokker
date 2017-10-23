// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, runInAction, spy } from 'mobx';
// Models
import playersModel from "./models/players.model";
// Components
import Interface from "./components/interface/Interface.component";


@observer
class App extends React.Component {


	constructor() {
		super();
		// @SOURCE: https://mobxjs.github.io/mobx/refguide/spy.html
		spy((event)=> {
			if(event.type === 'action') {
				if(event.name.match('FORM-')) return;

				if(event.name.match('-ERROR')) return console.log('%c' + event.name, 'color: darkred');
				if(event.name.match('-SUCCESS')) return console.log('%c' + event.name, 'color: #03a528;');
				if(event.name.match('@reaction')) return console.log('%c' + event.name, 'color: orange;');
				console.log('%c' + event.name, 'color: lightblue');
			}
		});
	}


	componentDidMount() {
		playersModel.getCurrentTransfersPlayers();
	}

	render() {
		return <Interface />;
	}
}

export default App;

