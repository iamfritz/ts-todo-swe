const BaseService = require("./BaseService");
import Task from '../models/task.model';

class TaskService extends BaseService {
  constructor() {
    super(Task);
  }

  // You can add model-specific methods here
}

module.exports = new TaskService();
