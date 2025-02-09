import { AlarmItem } from "./alarm-item";
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
        public name: string;
        public severity: AlarmSeverity;
        public trigerredAt: Date;
        public isAcknowledged = false;
        public items = new Array<AlarmItem>();

        constructor(public id: string) {}

        acknowledged() {
            this.isAcknowledged =true;
        }

        addAlarmItem(item: AlarmItem) {
            this.items.push(item);
        }
}
