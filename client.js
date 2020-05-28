#!/usr/bin/env node
import readline from "readline";
import chalk from 'chalk'
import {getData, deleteItem, insert,searchItem} from "./server.js"
import validator from "is-my-json-valid";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var validate = validator({
    required: true,
    type: 'object',
    properties: {
        "link": {
            required: true,
            type: 'string'
        },
        "description": {
            required: true,
            type: 'string'
        },
        "tags": {
            required: true,
            type: ["array"]
        }
    }
})
rl.question(chalk.green("select one option : \ninsert\ndelete\nread\nsearch\nexit\n"), function(input) {
    if (input == "read"){
        getData()
        setTimeout(() => rl.close(),3000)
    }
    else if (input == "delete"){
         rl.question(chalk.red("Enter the id :\n"), function(id) {
             var id=Number(id)
            deleteItem(id)
             rl.close();
         });
    }
    else if (input == "search"){
        rl.question(chalk.green("Enter tag : \n"), function(tag) {
            searchItem(tag)
            setTimeout(() => rl.close(),3000)
        });
    }
    else if (input == "insert"){
        rl.question(chalk.blue("Enter your data in json format :\n format:{\"link\" :\"\" ,\"description\" :\"\" ,\"tags\" :[\"tag1\",\"tag2\"]} "), function(input) {
            try {
                var jsonInput = JSON.parse(input)
                if( validate(jsonInput)){
                    insert(jsonInput)
                    rl.close();
                }
                throw ''
            }catch (e) {
                console.log(chalk.red("invalid input"))
                rl.close();
            }


        });
    }
    else {
        rl.close();
    }
});

rl.on("close", function() {
    console.log(chalk.green("\nProcess Is Ended !!!"));
    process.exit(0);
});
