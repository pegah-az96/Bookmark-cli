import levelup from 'levelup'
import leveldown from 'leveldown'
import ramda from "ramda"

var db = levelup(leveldown('./mydb'),function (error) {
    if (error){
        console.log(error)
    }
})
const insert =(input) =>{
var id =new Date().getTime()
    db.put(id, JSON.stringify(input), function (err) {
        if (err) return console.log('Ooops!', err)
        console.log("inserted")
    })

}
//getdata
const getData =()=>{
db.createReadStream()
    .on('data', function (data) {
        console.log(data.key.toString(), '=', data.value.toString())
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
    db.del(id,function (error) {
    if (error){
        console.log(error)
    }else {
        console.log("data deleted successfully")
    }
})
}

var searchItem =(tag) =>{
    var foundItem =[]
      db.createValueStream()
            .on('data', function (data) {
                var jsonObject =JSON.parse( data.toString())
                if (ramda.contains(tag, jsonObject.tags)){
                    foundItem.push(data.toString())
                }
    })
            .on('end', function () {
                console.log(foundItem)
                return foundItem

            })

}
//insert({url : "pegah" ,description : "best search " , tags : ["sin" , "peg"]})
// insert({url : "siiin" ,description : "best search " , tags : ["sin" , "peg"]})
// deleteItem(1590565718992);
// getData();
searchItem("peg")