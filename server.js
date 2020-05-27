import levelup from 'levelup'
import leveldown from 'leveldown'
import ramda from 'ramda'

var db = levelup(leveldown('./mydb1'),function (error) {
    if (error){
        console.log(error)
    }
})
const insert =(input) =>{
var id =new Date().getTime()
    // var clenedInput =JSON.stringify(input).replace(/\\/g, "")
    // console.log(clenedInput)
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
        console.log('Oh my!', err)
    })
    .on('close', function () {
        console.log('Stream closed')
    })
    .on('end', function () {
        console.log('Stream ended')
    })
}
var deleteItem =(id) =>{
   var s =db.del(id)
        .then(console.log("data deleted"))
        .catch((error)=>console.log(error))
        Promise.resolve(s)
}
var searchItem =(tag) =>{
    var foundItem =[]
    db.createValueStream()
        .on('data', function (data) {
            console.log( data.toString().replace(/\\/g, ""))
            console.log(foundItem)
            // var jsonObject =JSON.parse(data.toString().replace(/\\/g, ""))
            // if (ramda.includes(tag, jsonObject.tags)){
            //         foundItem.push(data.toString())
            //     console.log(foundItem,"kelf")
            //     }
        })
        // .on('end', function () {
        //     return foundItem
        //     })
}

export { getData, deleteItem, insert ,searchItem}

// insert({link :"test" ,description :"asr" ,tags :["man","to"]})
// searchItem("man")
// searchItem(['man'])


