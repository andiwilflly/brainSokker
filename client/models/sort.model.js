import brain from "brain";
// MobX
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';


class SortModel {

	@observable sortBy = '';

}

export default new SortModel();