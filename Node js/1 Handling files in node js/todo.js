const fs = require('fs')

const pathName = './todos.json';

const loadTasks = ()=>{
    try {
        const tasks = fs.readFileSync(pathName);
        const JSONData = tasks.toString()
        return JSON.parse(JSONData)
    } catch (error) {
        return []
    }
}

const saveTask = (tasks)=>{
    const data = JSON.stringify(tasks)
    fs.writeFileSync(pathName,data)
    
}

const addTask = (task)=>{
    const tasks = loadTasks()
    tasks.push({task})
    saveTask(tasks)
    console.log('task added succesfully');
}

const listTasks = ()=>{
    try {
        const tasks = loadTasks()
        tasks.forEach((task,index)=>{
            console.log(`${index+1} - ${task.task}`)
        })
    } catch (error) {
        
    }
}

const removeTask = (index)=>{
    try {
        const tasks = loadTasks()
        let filteredTasks = tasks.filter((task,i)=>i+1!==index)
        console.log(filteredTasks)
        saveTask(filteredTasks)
        console.log('Task removed succesfully..')
    } catch (error) {
        
    }
}


// argv[0] = Execution path
// argv[1] = File name
let command = process.argv[2]
let argument = process.argv[3]

if(command === "add"){
    addTask(argument)
}else if(command==='list'){
    listTasks()
}else if(command==='remove'){
    removeTask(Number(argument))
}else{
    console.log('Invalid Argument!');
}