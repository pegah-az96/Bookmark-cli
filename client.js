import readline from "readline";
import {getData, deleteItem, insert ,searchItem} from "./repository.js"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("enter insert or delete or read or search? ", function(input) {
    if (input == "read"){
        getData()

    }
    else if (input == "delete"){
         rl.question("Enter the id ", function(id) {
            deleteItem(id)
             rl.close();
         });
    }
    else if (input == "search"){
        rl.question("Enter the tags in array form", function(tag) {
            searchItem(tag)
            rl.close();
        });
    }
    else if (input == "insert"){
        rl.question("Enter the input in format :{link :link ,description :description ,tags :[tag1,tag2,...]}", function(input) {
            insert(input)
            rl.close();
        });
    }
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
