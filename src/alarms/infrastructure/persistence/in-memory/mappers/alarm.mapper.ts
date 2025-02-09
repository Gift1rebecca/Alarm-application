import { AlarmItem } from "../../../../domain/alarm-item";
import {Alarm  } from "../../../../domain/alarm";
import { AlarmSeverity } from "../../../../domain/value-objects/alarm-severity";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmItemEntity } from "../entities/alarm-item.entity";


export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity): Alarm{
        const alarmSeverity = new AlarmSeverity(
            alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
        );
        const alarmModel = new Alarm(alarmEntity.id);
            alarmModel.name = alarmEntity.name;
            alarmModel.severity = alarmSeverity;
            alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
            alarmModel.trigerredAt = alarmEntity.trigerredAt;
            alarmModel.items = alarmEntity.items.map(
                (item) => new AlarmItem(item.id, item.name, item.type),
            );

        return alarmModel;
    }

    static toPersistence(alarm: Alarm) {
        const entity = new AlarmEntity();
        entity.id = alarm.id;
        entity.name = alarm.name;
        entity.severity = alarm.severity.value;
        entity.trigerredAt = alarm.trigerredAt;
        entity.items = alarm.items.map((item) => {
            const itemEntity = new AlarmItemEntity();
            itemEntity.id = item.id;
            itemEntity.name = item.name;
            itemEntity.type = item.type;
            return itemEntity;
        });
        return entity;
    }
}
