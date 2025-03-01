import "reflect-metadata"
import { DataSource } from "typeorm"
import { model,user_datas } from '../entity/model'

class Database {

    private AppDataSource:DataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "ARMINbaba10101024",
        database: "postgres",
        synchronize: true,
        logging: false,
        entities: [model,user_datas],
        migrations: [],
        subscribers: [],
    });

    public async chechkUser(username: string, password: string): Promise<boolean> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }
        try {
            if (password !== null && password !== undefined)  {
                if (await this.AppDataSource.manager.findOne(user_datas, { where: { username: username, password: password } })) {
                    return true;
                } else return false;
            } else return false;
        } catch (error) {
            console.log("Error in Check User:", error);
            return false;
        }
    }

    public async AddRow(Model: model, username: string, password: string): Promise<string> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }

        if (await this.chechkUser(username,password) != true) {
            return "Error in user details"
        } else {
            try {
                await this.AppDataSource.manager.getRepository(model).save(Model);
            } catch (error) {
                console.log("Error in Save to DB:", error);
                return "Error in Save to DB";
            }
            return "Succesfully added!";    
        }
    }

    public async removeRow(id: number,username: string,password: string): Promise<string> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }

        if (await this.chechkUser(username,password) != true) {
            return "Error in user details";
        } else {
            try {
                const rowTodelete = await this.AppDataSource.manager.getRepository(model).findOneBy({ id: id, owner: username, owner_password:password });
                await this.AppDataSource.manager.getRepository(model).remove(rowTodelete);
        
                if (this.AppDataSource.manager.findOne(model, { where: { id: id, owner: username, owner_password:password } })) {
                    console.log("Row not removed");
                    return "Row not removed";
                } else return "Row removed";
        
            } catch (error) {
                console.log("Error in Delete from DB:", error);
                return "Error in Delete from DB";
            }
        }   
    }  

    public async updateRow(id: number, model_: model,username:string,password: string): Promise<model | string> {
        if (!this.AppDataSource.isConnected) {
            await this.AppDataSource.connect();
        }

        if (await this.chechkUser(username,password) != false) {
            return "Error in user details";
        } else {
            try {
                
                if (!this.AppDataSource.manager.findOne(model, { where: { id: id, owner: username, owner_password: password } })) {
                    console.log("Row not found");
                    return "Row not found";
                }
                
                const rowToUpdate = await this.AppDataSource.manager.getRepository(model).findOneBy({ id: id, owner: username, owner_password: password });
                await this.AppDataSource.manager.getRepository(model).update(rowToUpdate, model_);
                return "Row Updated";
            } catch (error) {
                console.log("Error in Update to DB:", error);
                return "Error in Update to DB";
                
            }
        }
    }

    public async getRowByName(name: string,username: string,password: string): Promise<model | string> {
        if (!this.AppDataSource.isInitialized) {
            await this.AppDataSource.initialize();
        }
        
        if (await this.chechkUser(username,password) != true) {
            return "Error in user details"
        } else {
            try {
                return await this.AppDataSource.manager.findOne(model, { where: { name: name, owner: username, owner_password: password } });
            } catch (error) {
                console.log("Error in Get from DB:", error);
                return "Error in Get from DB";
            }
        }
    }

    public async getAllRows(username: string,password: string): Promise<model[] | string> {
        if (!this.AppDataSource.isInitialized) {
            await this.AppDataSource.initialize();
        }

        if (await this.chechkUser(username,password) != true) {
            return "Error in User details"
        } else {
            try {
                return await this.AppDataSource.getRepository(model).find({where: {owner: username, owner_password: password}});
            } catch (error) {
                console.log("Error in Get from DB:", error);
                return "Error in Read from DB";
            }
        }
    }

    public async DB_CON_CHECK(): Promise<boolean> {
        return this.AppDataSource.isConnected;
    }

}

export default Database;