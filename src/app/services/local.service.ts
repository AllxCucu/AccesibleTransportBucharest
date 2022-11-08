import { Injectable } from '@angular/core';
import { SavedData } from '../dtos/saved-data.dto';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  key = "lastThree";

  constructor() { }

  public saveData(savedData: SavedData) {

    let saveArray: SavedData[] = this.getData();

    if (saveArray == null) {
      saveArray = [];
    }
    switch (saveArray.length) {
      case 0: {
        saveArray[0] = savedData;
        break;
      }
      case 1: {
        saveArray[1] = saveArray[0];
        saveArray[0] = savedData;
        break;
      }
      default: {
        saveArray[2] = saveArray[1];
        saveArray[1] = saveArray[0];
        saveArray[0] = savedData;
        break;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(saveArray));
  }

  public getData() {
    let value = localStorage.getItem(this.key);
    if (value != null) {
      return JSON.parse(value);
    }
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
