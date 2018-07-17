/** @ngInject */
export class StepsService {

  constructor(DataService) {
    this.dataService = DataService;
  }

  getSteps(){
    return this.dataService.getData('steps');
  }

  addStep(step){
    step.id = +new Date;
    this.dataService.saveData('steps', step);
  }

  updateStep(id, step){
    this.dataService.updateDataById(id, 'steps', step)
  }


}
