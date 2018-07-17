/** @ngInject */
export class ScenariosService {

  constructor(DataService) {
    this.dataService = DataService;
  }

  getScenarios(){
    return this.dataService.getData('scenarios');
  }

  addScenario(scenario){
    scenario.id = +new Date;
    scenario.stepIds = [];
    this.dataService.saveData('scenarios', scenario);
  }

  updateScenario(id, scenario){
    this.dataService.updateDataById(id, 'scenarios', scenario)
  }

}
