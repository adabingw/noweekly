const express = require("express")
const cors = require("cors")
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_KEY });

const app = express()

app.use(cors())
app.use(express.json())

app.get("/database", async (req, res) => {
    try {
        let notion = req.notion;
        const databaseId = process.env.NOTION_DATABASE_ID;
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log("wack ", response)
    } catch (err) {
      console.error(err.message);
    }
});

app.get('*', async (req, res) => {
    console.log("Unexpected behaviour")
});

var listener = app.listen(5173, function(){
    console.log('Listening on port ' + listener.address().port); // Listening on port 8888
});
