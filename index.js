const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function CheckUserExist (req,res,next) {
  const { id } =req.params;

  const project = projects.find(p => p.id==id)

  if(!project){
    return res.status(400).json({ error: "Project not found"})
  }

  next();
};

function HowMuch (req,res,next) {
  console.count("Numero de requisições");

  next();
}

server.post('/projects',HowMuch,(req,res)=>{

  const { id, title} = req.body;

  const project={
    id,
    title,
    tasks:[]
  }

  projects.push(project);

  return res.json(projects);

});

server.get('/projects',HowMuch,(req,res)=>{

  return res.json(projects);

});

server.put('/projects/:id',CheckUserExist,HowMuch,(req,res)=>{
  const { id }= req.params;
  const { title }= req.body;

  const project = projects.find(p => p.id == id)

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id',CheckUserExist,HowMuch,(req,res)=>{
  const { id }= req.params;

  const projectIndex = projects.findIndex(p =>p.id==id);

  projects.splice(projectIndex,1)

  return res.json();

});

server.post('/projects/:id/tasks',CheckUserExist,HowMuch,(req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id==id);

  project.tasks.push(title);

  return res.json(project.tasks)

});

server.listen(3000);