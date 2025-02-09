import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AlarmsInfrastructureModule } from "./alarms/infrastructure/alarms-infrastrucure.module";
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/application/alarms.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule.forRoot(), CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
