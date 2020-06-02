import levelup from 'levelup'
import leveldown from 'leveldown'

const db = levelup(leveldown('./mydb6'), (error)=> {
    if (error){
        console.log(error)
    }
})
export {db}