/** @ngInject */
export class ScenarioModalCtrl {
  constructor(ScenariosService) {
    this.scenariosService = ScenariosService;
    this.state = {
      name: '',
      version: ''
    }
  }
  ok() {
    this.scenariosService.addScenario(this.state);
    this.close({$value: this.state});
  }

  cancel() {
    this.dismiss({$value: this.state});
  }
}
