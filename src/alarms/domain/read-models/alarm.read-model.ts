export class AlarmReadModel {
    id: string;
    name: string;
    severity: string;
    triggereedAt: Date;
    isAcknowledged: boolean;
    items: Array<{
        name: string;
        type: string;
    }>;
}
