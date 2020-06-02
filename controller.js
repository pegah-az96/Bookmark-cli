#!/usr/bin/env node
"use strict"
//Packages
import chalk from 'chalk'
import validator from "is-my-json-valid";
import  program from 'commander';
//Modules
import {getData, deleteItem, insert,searchItem} from "./services.js"


//validate JSON
const validate = validator({
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
    .action(getData);

//delete an item by id
program
    .command('delete <id>')
    .description("Deletes a bookmarked information ")
    .action((id) => {
        deleteItem(Number(id))
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
if (program.link){
    const link = program.link;
    const description = program.description;
    const tags = program.tags;
    const Input = {link:link,description:description,tags:tags};
    try {
        if( validate(Input)){
            insert(Input)
            console.log(Input)
        }else {
            throw new Error("INVALID INPUT")
        }
    }catch (e) {
        console.log(chalk.red(e.message))
    }

}
