// tests/api.test.ts

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let apiUrl = process.env.TEST_URL;
let apiKey = process.env.API_KEY;
let apiToken = process.env.API_TOKEN;
let taskID = '';
const now = new Date();

// Set up Axios instance with token
const axiosInstanceApiKey = axios.create({
  baseURL: apiUrl,
  headers: {
    'api-key': apiKey, 
  },
});

const axiosInstanceToken = axios.create({
  baseURL: apiUrl,
  headers: {
    'Authorization': `Bearer ${apiToken}`,
  },
});

describe('GET api/tasks ALL', () => {
  it('should return all todo items', async () => {
    // Make an HTTP GET request to the API endpoint
    const response = await axios.get(`${apiUrl}/tasks`);
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');
  });
});

describe('POST api/tasks', () => {
  it('should create a todo item', async () => {
    // Make an HTTP GET request to the API endpoint
    const data = {
                    title: "New Todo "+now,
                    description: "This is new todo",
                    category: ["nodejs","laravel"],
                    level : "high",
                    status : "pending"
                };
    const response = await axiosInstanceToken.post(`${apiUrl}/tasks`, data);
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');

     const task = response.data.data;
     taskID = task._id;
  });
});

 describe('GET api/tasks/{TASK_ID}', () => {
  it('should return a todo item', async () => {
    // Make an HTTP GET request to the API endpoint    
    const response = await axios.get(`${apiUrl}/tasks/${taskID}`);
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');
  });
});

describe('UPDATE api/tasks/{TASK_ID}', () => {
  it('should update a todo', async () => {
    // Make an HTTP GET request to the API endpoint
    const data = {
                    title: "Update New Todo "+now,
                    description: "This is new todo",
                    category: ["wordpress","shopify"],
                    level : "low",
                    status : "progress"
                };    
    const response = await axiosInstanceToken.put(`${apiUrl}/tasks/${taskID}`, data);
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');
  });
});

describe('DELETE api/tasks/{TASK_ID}', () => {
  it('should delete a todo', async () => {
    // Make an HTTP GET request to the API endpoint    
    const response = await axiosInstanceToken.delete(`${apiUrl}/tasks/${taskID}`);
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');
  });
}); 
