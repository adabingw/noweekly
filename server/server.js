const express = require("express")
const cors = require("cors")
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'secret_ufaMUzFP7m3mdP3tqAeRCO7tgE39c0CGWzH9iRLrlE5' });

const app = express()

app.use(cors())
app.use(express.json())

app.get("/database", async (req, res) => {
    try {
        let notion = req.notion;
        const databaseId = '6588be4dd7ee4f289be4d84a5b7845c1';
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log("wack ", response)
    } catch (err) {
      console.error(err.message);
    }
});

app.get('*', async (req, res) => {
    console.log("what in the actual flying fuck is happening")
});

var listener = app.listen(5173, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});