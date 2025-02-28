import { inject, Injectable } from "@angular/core";
import { WidgetState } from "./widget-state.service";


@Injectable()
export class WidgetActions {

    state = inject(WidgetState, { self: true });

    reload() {
        this.state.lastUpdated = new Date();
        console.log('Reloaded widget data...');
    }

    copyData() {
        console.log('Copied widget data...');
    }
}