const TaskService = require("../services/task.service");
const CategoryService = require("../services/category.service");
const mongoose = require("mongoose");

let result = {
  status: "error",
  message: "",
};

//get all task
const getAllTask = async (req: Request, res: Response) => {

  try {  
    const taskItems = await TaskService.getAllWithPopulation({}, "category");
    const items = taskItems.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    if (items.length === 0) {    
      result["status"] = "error";
      result["message"] = `No Record found.`;

      res.status(400).json(result);
    } else {
      let { page, limit } = req.query;

      page = page ? parseInt(page) : 1;
      page = page <= 0 ? 1 : page;
      limit = limit ? parseInt(limit) : 10;
      limit = limit <= 0 ? 1 : limit;

      // calculating the starting and ending index
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      endIndex = endIndex > items.length ? items.length : endIndex;
      let totalPages = Math.ceil(items.length / limit);

      // Check if the start index is out of bounds
      if (startIndex >= items.length) {
        res
          .status(400)
          .json({ status: "error", message: "Page number out of range" });
      }

      let taskItems = items.slice(startIndex, endIndex);
      result["status"] = "success";
      result["paging"] = {
        total: items.length,
        pages: totalPages,
        page: page,
        limit: limit,
      };
      result["data"] = taskItems;

      res.json(result);
    } 
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//get task
const getTask = async (req: Request, res: Response) => {
  
  try {
    const data = await TaskService.getWithPopulation(req.params.id, "category");
    if (data) {
      result["status"] = "success";
      result["data"] = data;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};
//get task by log user
const getLogUserTask = async (req: Request, res: Response) => {
  
  try {
    const user = req.user;
    const userId = user.userId;    
    const data = await TaskService.getUserTask(userId);
    if (data) {
      result["status"] = "success";
      result["data"] = data;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};
//get task by user
const getUserTask = async (req: Request, res: Response) => {
  
  try {
    const userId = req.params.id;    
    const data = await TaskService.getUserTask(userId);
    if (data) {
      result["status"] = "success";
      result["data"] = data;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//create a new task
const createTask = async (req: Request, res: Response) => {    
  try {

    const { title, description, category, level, status } = req.body;

    const createdCategories = await CategoryService.findOrCreate(category);
    
    const user = req.user;
    const userId = user.userId;

    const data = {
      title: title,
      description: description,
      category: createdCategories,
      level: level,
      status: status,
      userId: userId
    };

    const newTask = await TaskService.create(data);
    if (newTask) {
      result["status"] = "success";
      result["data"] = newTask;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to add a new record.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//update task
const updateTask = async (req: Request, res: Response) => {
  
  try {
    const id = req.params.id;
    
    const { title, description, category, level, status } = req.body;
    const createdCategories = await CategoryService.findOrCreate(category);
    
    const data = {
      title: title,
      description: description,
      category: createdCategories,
      level: level,
      status: status,
    };

    const options = { new: true };

    const updateTask = await TaskService.update(id, data, options);
    if (updateTask) {
      result["status"] = "success";
      result["message"] = `Record has been updated.`;
      result["data"] = updateTask;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to update a record.`;
      
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//delete task
const deleteTask = async (req: Request, res: Response) => {
  
  try {
    const data = await TaskService.delete(req.params.id);
    if (data) {
      result["status"] = "success";
      result["message"] = `Record has been deleted.`;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to delete a record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

module.exports = {
  getAllTask,
  getTask,
  getLogUserTask,
  getUserTask,
  createTask,
  updateTask,
  deleteTask,
};
