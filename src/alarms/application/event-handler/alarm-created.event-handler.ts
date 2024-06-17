import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
    implements IEventHandler<AlarmCreatedEvent>
{
    private readonly logger = new Logger(AlarmCreatedEventHandler.name);

    constructor(
        private readonly upsertMatrializedAlarmRepository: UpsertMaterializedAlarmRepository,
    ) {}

    async async (event:AlarmCreatedEvent) {
        this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);

        // In a real-world application, we would have to ensure that this operation is atomis
        // with the creation of the alarm. Otherwise, we could end up with an alarm that is not reflected
        // in the read model (e.g. because the database operation fails).
        // For more information, check out "Transactional inbox/outbox patterns".
        await this.upsertMatrializedAlarmRepository.upsert({
            id: event.alarm.id,
            name: event.alarm.name,
            severity: event.alarm.severity.value,
            triggereedAt: event.alarm.trigerredAt,
            isAcknowledged: event.alarm.isAcknowledged,
            items: event.alarm.items,
        });
    }
    
    handle(event: AlarmCreatedEvent) {
        this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);
    }
}
