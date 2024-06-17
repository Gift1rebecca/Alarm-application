import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FindAlarmsRepository } from "../../../../application/ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
    constructor(
        @InjectModel(MaterializedAlarmView.name)
        private readonly alarmModel: Model<MaterializedAlarmView>,
    ) {}
         
    async findAll(): Promise<AlarmReadModel[]> {
        return await this.alarmModel.find();
    }
}
