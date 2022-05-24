import { Injectable } from "@angular/core";

/* @Injectable({
    providedIn: 'root'
}) */
export class DummyService {
    logMessage: string;

    printLog(message: string) {
        console.log(message);
        console.log(this.logMessage);
        this.logMessage = message;
    }
}