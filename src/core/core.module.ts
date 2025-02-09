import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions) {
        const imports = 
        options.driver === 'orm'
         ? [
            // We are going to hardcode the connection options for simplicity
            // but you can use a configuraton file or environment variables
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                //password: 'pass123',
                password: '',
                username: 'postgres',
                autoLoadEntities: true,
                synchronize: true,
                }),
                MongooseModule.forRoot('mongodb:/localhost:27017/vf-read-db'),
            ]
        : [];
        
        return {
            module: CoreModule,
            imports,
        };
    }
}
