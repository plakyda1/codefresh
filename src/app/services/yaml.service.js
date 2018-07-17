import yaml from 'js-yaml';

/** @ngInject */
export class YAMLService {

  constructor() {
  }

  convertToYAML(jsObject){
    return yaml.dump(jsObject);
  }

}
