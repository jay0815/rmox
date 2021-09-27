import { FC } from 'react';
import Observer from '../helpers/observer';
export default class Rmox {
  static _instance: Rmox | null = null;
  store: { [key: string]: Observer<any> } = {};
  globalModel: Record<string, FC<any>> = {};
  observer = new Observer<any>();
  public static getInstance() {
    if (Rmox._instance === null) {
      Rmox._instance = new Rmox();
    }
    return Rmox._instance!;
  }
}
