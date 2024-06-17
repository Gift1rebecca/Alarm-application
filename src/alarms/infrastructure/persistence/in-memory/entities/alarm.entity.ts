import { AlarmItemEntity } from "./alarm-item.entity";

export class AlarmEntity {
    id: string;
    name: string;
    severity: string;
    trigerredAt: Date;
    isAcknowledged: boolean;
    items: Array<AlarmItemEntity>;
}
