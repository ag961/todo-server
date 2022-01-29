'use strict';

class Collections {
  constructor(model){
    this.model = model;
  }
  async create(json){
    try {
      let record = await this.model.create(json);
      return record
    } catch(err){
      console.error(`Error creating data model for model ${this.model.name}`)
      return err
    }
  }

  async read(){
    try{
      let records = await this.model.findAll({})
      return records
    } catch (err){
      console.error(`Error reading data model for model ${this.model.name}`);
      return err
    }
  }

  async update(id, json){
    try{

      let record = await this.model.findOne({where: {id}});
      let updatedRecord = await record.update(json);
      return updatedRecord;
    } catch (err){
      console.error(`Error updating data model for model ${this.model.name}`);
      return err
    }
  }

  async delete(id){
    try {

      let record = await this.model.destroy({where: {id}})
      return record;
    } catch (err){
      console.error(`Error deleting data for model : ${this.model.name}`);
      return err;
    }
  }
}

module.exports = Collections;