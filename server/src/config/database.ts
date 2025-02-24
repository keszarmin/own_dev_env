import "reflect-metadata"
import { DataSource } from "typeorm"
import { model }  from '../entity/model'

class Database {

    public constructor() {
        this.getAllRows();
    }

    private AppDataSource:DataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "ARMINbaba10101024",
        database: "postgres",
        synchronize: true,
        logging: false,
        entities: [model],
        migrations: [],
        subscribers: [],
    });

    public async AddRow(model: model): Promise<model> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }
        await this.AppDataSource.manager.save(model);
        return model;    
    }

    public async removeRow(id: number): Promise<void> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }
        await this.AppDataSource.manager.delete(model, id);
    }

    public async updateRow(id: number, model_: model): Promise<model> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }
        await this.AppDataSource.manager.update(model, id, model_);
        return model_;
    }

    public async getRowByName(name: string): Promise<model> {
        if (!this.AppDataSource.isInitialized) {
            await this.AppDataSource.initialize();
        }        
        return await this.AppDataSource.manager.findOne(model, { where: { name: name } });
    }

    public async getAllRows(): Promise<model[]> {
        if (!this.AppDataSource.isInitialized) {
            await this.AppDataSource.initialize();
        }
        return await this.AppDataSource.getRepository(model).find();
    }

    public async DB_CON_CHECK(): Promise<boolean> {
        return this.AppDataSource.isConnected;
    }

}

export default Database;