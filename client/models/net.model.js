import brain from "brain";
// MobX
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class NetModel {

	@observable NET = window.NET = new brain.NeuralNetwork();

	@observable isTrained = false;


	trainNet(learnedData = {}) {
		runInAction(`NET-TRAIN-SUCCESS`, ()=> {
			this.NET.train(learnedData);
			this.isTrained = true;
		});
	}
}

export default new NetModel();