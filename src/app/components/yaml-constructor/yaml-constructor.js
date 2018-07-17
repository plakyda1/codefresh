import {keyBy, clone} from "lodash";
import '../../../style/common/common.scss'
import './yaml-constructor.scss';
import './dndStyle.scss';

/** @ngInject */
export class YAMLConstructorCtrl {
    constructor($uibModal, YAMLService, ScenariosService, StepsService) {

        this.YAMLService = YAMLService;
        this.$uibModal = $uibModal;
        this.scenariosService = ScenariosService;
        this.stepsService = StepsService;
        this.scenarios = [];
        this.steps = [];
        this.selectedStep = null;
        this.selectedScenario = {};
        this.yamlStringPreview = '';
        this.loadData();
    }

    openScenarioModal() {
        let _this = this;
        let modalInstance = this.$uibModal.open({
            animation: true,
            component: 'scenarioModal',
            resolve: {
                selectedScenario: function () {
                    return _this.selectedScenario ? _this.selectedScenario : false;
                }
            }
        });

        modalInstance.result.then(
            () => {
                this.loadData()
            },
            () => {
                this.loadData();
                console.log('modal-component dismissed at: ' + new Date())
            });
    }

    openStepModal(step) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            component: 'stepModal',
            resolve: {
                selectedStep: function () {
                    return step ? step : false;
                }
            }
        });

        modalInstance.result.then(
            () => {
                this.loadData();
            }, () => {
                this.loadData();
                console.log('modal-component dismissed at: ' + new Date())
            });
    }

    loadData() {
        this.scenarios = this.scenariosService.getScenarios();
        this.steps = this.stepsService.getSteps();
        this.stepsById = keyBy(this.steps, o => o.id);
    }

    selectScenario(scenarioId) {
        this.selectedScenario = Object.assign({}, this.scenarios.find(sc => sc.id === scenarioId));
        this.selectedScenario.steps = this.selectedScenario.stepIds.map(id => this.stepsById[id]);
        this.yaml();
    }

    getSelectedScenarioStepIds() {
        return this.selectedScenario.steps.map(step => step.id);
    }

    getSelectedScenariosStepsObject() {
        return this.selectedScenario.stepIds.reduce((accum, curr) => {
            accum[this.stepsById[curr].key] = this.stepsById[curr].details;
            return accum;
        }, {});
    }

    removeStepFromScenario(index) {
        this.selectedScenario.steps.splice(index, 1);
        this.applyNewStepIds();
    }

    movedStepInSelectedScenario(index) {
        this.selectedScenario.steps.splice(index, 1);
        this.applyNewStepIds();
    }

    applyNewStepIds() {
        this.selectedScenario.stepIds = this.getSelectedScenarioStepIds();
        let scenario = clone(this.selectedScenario);
        scenario.stepIds = this.getSelectedScenarioStepIds();
        delete scenario.steps;
        this.scenariosService.updateScenario(scenario.id, scenario);
        this.yaml();
    }

    yaml() {
        let scenario = clone(this.selectedScenario);
        scenario.steps = this.getSelectedScenariosStepsObject();
        delete scenario.id;
        delete scenario.stepIds;
        this.yamlStringPreview = this.YAMLService.convertToYAML(scenario);
        this.loadData();
    }
}
