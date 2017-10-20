// MobX
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class InterfaceTableModel {

	@observable windowWidth = window.innerWidth;

	itemHeight = 350;

	itemMinWidth = 500;

	itemBetweenDistance = 20;


	get itemsInRow() { return Math.floor((this.windowWidth - this.itemBetweenDistance*3) / this.itemMinWidth); };

	get itemWidth() { return this.windowWidth / this.itemsInRow - (this.itemBetweenDistance * (this.itemsInRow + 1)); };

	currentRow(index) { return (Math.ceil((index+1) / this.itemsInRow)); };

	top(index) { return this.itemHeight * (this.currentRow(index) - 1) + (this.itemBetweenDistance * this.currentRow(index)); };

	left(index) { return (index % this.itemsInRow) * this.itemWidth + ((index % this.itemsInRow + 1) * this.itemBetweenDistance); };

}

export default InterfaceTableModel;