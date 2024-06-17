import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
    implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
    constructor(private readonly alarmRepository: FindAlarmsRepository) {}

    async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
        return this.alarmRepository.findAll();        
    }
}
