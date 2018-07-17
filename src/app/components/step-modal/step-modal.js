import './step-modal.scss';

/** @ngInject */
export class StepModalCtrl {
  constructor(StepsService) {
    this.stepsService = StepsService;
    this.state = {
      key: 'key',
      details: {
        title: '',
        image: '',
        commands: ['']
      }
    }
  }

  $onInit() {
    if(this.resolve.selectedStep){
      this.state = this.resolve.selectedStep;
    }
  };

  addNewCommand(){
    this.state.details.commands.push('');
  }

  removeCommand(index){
    this.state.details.commands.splice(index, 1);
  }

  ok() {
    this.resolve.selectedStep ? this.stepsService.updateStep(this.state.id, this.state) : this.stepsService.addStep(this.state);
    this.close({$value: this.state});
  }

  cancel() {
    this.dismiss({$value: this.state});
  }

}
