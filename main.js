const express = require('express')
const { Client } = require('@notionhq/client');
require("dotenv").config();

const app = express()
const port = 3000
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

app.set('view engine','ejs');

app.get('/', async (req, res) => {
    try {
        const myLinks = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
        });

        let links_text = [];

        myLinks.results.forEach(element => {
            let link = {
                name: element.properties.Name.title[0].plain_text,
                link: element.properties.Link.rich_text[0].plain_text
            }
            links_text.unshift(link)
        });


        res.render('profile',{links_text});
    } catch (error) {
        res.send(error);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})