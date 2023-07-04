import { makeAutoObservable } from "mobx";

export default class ShowStore {
    constructor() {
        makeAutoObservable(this);
    }
}