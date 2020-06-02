//Packages
import chalk from 'chalk'
import R from 'ramda'
//API
import{db} from './database.js'

//insert data
const insert =(input) =>{
const id =new Date().getTime()
    console.log(input)
    return db.put(id, JSON.stringify(input))
        .then(() => console.log(chalk.green("inserted")))
        .catch((error)=>console.log(error))
}

//read all data from database
const getData =()=>{
db.createReadStream()
    .on('data', (data) =>{
        console.log(data.key.toString(), '=', data.value.toString())
    })
    .on('error',  (err)=> {
        console.log(chalk.red('Oh Error!'), err)
    })
    .on('close',  () =>{
        console.log(chalk.red('Stream closed'))
    })
    .on('end',  ()=> {
        console.log(chalk.green('Stream ended'))
    })
}

//delete data from db
const deleteItem =(id) =>{
    db
        .get(id)
        .then(db.del(id))
        .then(() =>console.log(chalk.green("data deleted")))
        .catch((error) => console.log(chalk.yellow(error)))
}


//search data
const searchItem =(tag) =>{
    let foundItem =[]
    db.createValueStream()
        .on('data',  (data) =>{
            const jsonObject =JSON.parse(data.toString().toLowerCase())
            if (R.includes(tag.toLowerCase(), jsonObject.tags)){
                 foundItem.push(jsonObject)
                }
        })
        .on('error',  (err) =>{
            console.log('Oh Error!', err)
        })
        .on('close', ()=> {
            console.log(chalk.green('Found Items :'))
            console.log(foundItem)
        })
        .on('end',  ()=> {
            console.log(chalk.magenta("search is ended"))
        })
}

export { getData, deleteItem,searchItem , insert}

