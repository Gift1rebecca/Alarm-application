import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { Logger } from "@nestjs/common";
import { AlarmRepository } from "../ports/alarm.repository";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
    implements ICommandHandler<CreateAlarmCommand>
{
    private readonly logger = new Logger(CreateAlarmCommandHandler.name);
       
    constructor(
        private readonly alarmRepository: AlarmRepository,
        private readonly alarmFactory: AlarmFactory,
        private readonly eventBus: EventBus,
    ) {} 
    
    async execute(command: CreateAlarmCommand) {
        this.logger.debug(
            `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
        ); 
        const alarm = this.alarmFactory.create(
            command.name, 
            command.severity,
            command.triggeredAt,
            command.items,
        );
        const newAlarm = await this.alarmRepository.save(alarm);
        
        // This is not yrt the best way to dispatch events.
        // Domain events should be dispatched from the aggregate root, inside the domain layer.
        // We'll cover this in the upcoming lessons. 
        this.eventBus.publish(new AlarmCreatedEvent(alarm));       
    
        return newAlarm;
    }
}
