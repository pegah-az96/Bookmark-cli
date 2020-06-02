import levelup from 'levelup'
import leveldown from 'leveldown'

var db = levelup(leveldown('./mydb6'),function (error) {
    if (error){
        console.log(error)
    }
})
export {db}