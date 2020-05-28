import levelup from 'levelup'
import leveldown from 'leveldown'
import chalk from 'chalk'
import{db} from './database.js'
import ramda from 'ramda'

var foundItem =[]
const insert =(input) =>{
var id =new Date().getTime()
   var inserted = db.put(id, JSON.stringify(input))
        .then(console.log("inserted"))
        .catch((error)=>console.log(error))
   Promise.resolve(inserted)
}
//getdata
const getData =()=>{
db.createReadStream()
    .on('data', function (data) {

        console.log(data.key.toString(), '=', data.value.toString().replace(/\\/g, ""))
    })
    .on('error', function (err) {
        console.log(chalk.red('Oh Error!'), err)
    })
    .on('close', function () {
        console.log(chalk.red('Stream closed'))
    })
    .on('end', function () {
        console.log(chalk.green('Stream ended'))
    })
}
var deleteItem =(id) =>{
   var s =db.del(id)
        .then(console.log("data deleted"))
        .catch((error)=>console.log(error))
        Promise.resolve(s)
}
const searchItem =(tag) =>{
    db.createReadStream()
        .on('data', function (data) {
            var stringInput = data.value.toString().replace(/\\/g, "")
            var jsonObject =JSON.parse(stringInput)
            if (ramda.includes(tag, jsonObject.tags)){
                 foundItem.push(jsonObject)
                }
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            console.log('Found Items :')
            console.log(foundItem)
        })
        .on('end', function () {
            console.log("search id ended")
            })
}
export { getData, deleteItem,searchItem , insert}

