import 'angular';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-drag-and-drop-lists';
import 'ngclipboard';
import './services/yaml.service';
import {YAMLConstructorCtrl} from "./components/yaml-constructor/yaml-constructor";
import templateYAMLConstructorCtrl from "./components/yaml-constructor/yaml-constructor.html";
import {ScenarioModalCtrl} from "./components/scenario-modal/scenario-modal";
import templateScenarioModalCtrl from "./components/scenario-modal/scenario-modal.html";
import {StepModalCtrl} from "./components/step-modal/step-modal";
import templateStepModalCtrl from "./components/step-modal/step-modal.html";
import {YAMLService} from "./services/yaml.service";
import {DataService} from "./services/data.service";
import {ScenariosService} from "./services/scenarios.service";
import {StepsService} from "./services/steps.service";

export default angular.module('app', ['ngSanitize', 'ui.bootstrap', 'dndLists','ngAnimate', 'ngclipboard'])
  .component('yaml', {
    template: templateYAMLConstructorCtrl,
    controller: YAMLConstructorCtrl,
    controllerAs: 'app'
  })
  .component('scenarioModal', {
    template: templateScenarioModalCtrl,
    controller: ScenarioModalCtrl,
    controllerAs: 'app',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    }
  })
  .component('stepModal', {
    template: templateStepModalCtrl,
    controller: StepModalCtrl,
    controllerAs: 'app',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    }
  })
  .service('YAMLService', YAMLService)
  .service('DataService', DataService)
  .service('ScenariosService', ScenariosService)
  .service('StepsService', StepsService);



