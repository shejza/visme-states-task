import { observable, action } from "mobx";
import getData from './api';

export class StatesStore {
  @observable isLoadingStates = false;
  @observable stateErrors = undefined;
  @observable states = null;

  @action loadStates() {
    this.isLoadingStates = true;
    this.stateErrors = undefined;

    //Load states from json file and update mobx store state in order to make states array accessible from elsewhere within the application
    return getData()
      .then((response) => response.text())
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
