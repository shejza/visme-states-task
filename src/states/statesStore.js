import { observable, action } from "mobx";
import getData from './api';

export class StatesStore {
  @observable isLoadingStates = false;
  @observable stateErrors = undefined;
  @observable states = null;

  @action loadStates() {
    this.isLoadingStates = true;
    this.stateErrors = undefined;

    return getData().then(response => response.text())
      .then(
       action((responseText) => {
          const responseContent = JSON.parse(responseText);
          this.states = responseContent.states;
        })
      )
      .catch(
        action((err) => {
          this.stateErrors = err;
            throw err;
        })
      )
      .finally(
        action(() => {
          this.isLoadingStates = false;
        })
      );
  }
}

export default new StatesStore();
