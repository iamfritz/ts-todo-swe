const BaseService = require("./BaseService");
import Task from '../models/task.model';

class TaskService extends BaseService {
  constructor() {
    super(Task);
  }

  async getUserTask(userId : string) {
    try {
      const models = await this.Model.find({ userId })
                                      .populate('category', 'name')
                                      .populate('userId', 'name');
      return models;
    } catch (error) {
      throw error;
    }
  }

  // You can add model-specific methods here
}

module.exports = new TaskService();