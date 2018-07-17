/** @ngInject */
export class DataService {

  constructor() {
    if(!localStorage.getItem('scenarios')){
      DataService.initStorage();
    }
  }

  static initStorage(){
      localStorage.setItem('scenarios', JSON.stringify([]));
      localStorage.setItem('steps', JSON.stringify([]));
  }

  getData(key){
    return JSON.parse(localStorage.getItem(key));
  }

  saveData(key, data){
    let newData = this.getData(key);
    newData.push(data);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  updateDataById(id, key, data){
    localStorage.setItem(key, JSON.stringify(this.getData(key).map(item => item.id === id ? data : item)))
  }

  deleteDataById(id, key){
    localStorage.setItem(key, JSON.stringify(this.getData(key).filter(item => item.id !== id)))
  }

}
