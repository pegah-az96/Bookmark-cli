#!/usr/bin/env node
"use strict"
import chalk from 'chalk'
import {getData, deleteItem, insert,searchItem} from "./server.js"
import validator from "is-my-json-valid";
import  program from 'commander';
program.version('5.1.0');

//validate JSON
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
            type: 'string'
        }
    }
})
//read data from database
program
    .command('read')
    .description('Read all data from database')
    .action(() => getData());


//delete an item by id
program
    .command('delete <id>')
    .description("Deletes a bookmarked information ")
    .action((id) => {
        var id=Number(id)
        deleteItem(id)
    });

//search items by tag
program
    .command('search <tag>')
    .description("search a tag to find information")
    .action((tag) => {
        searchItem(tag)
    });

//insert an item to database
program
    .option('-l, --link <link>', 'link (for insert)')
    .option('-d, --description <description>', 'description (for insert)')
    .option('-t, --tags <tags>', 'tags (for insert)')
    .command('insert')
    .description("Insert by entering 3 options :link -l \" URL \" ,description -d \" sentence \"  ,tag -t (tag1-tag2-..)");


program.parse(process.argv);

//check for insertion
if (program.link !== undefined){

    var link = `${program.link}`;
    var description = `${program.description}`;
    var tags = `${program.tags}`
    var jsonInput = `{\"link\":\"${link}\",\"description\":\"${description}\",\"tags\":\"${tags}\"}`
    try {
        var toJson = JSON.parse(jsonInput)
        if( validate(toJson)){
            insert(toJson)
            console.log(toJson)
        }else {
            throw ''
        }
    }catch (e) {
        console.log(chalk.red("not valid json"))
    }

}
