from flask import Flask 
from flask_cors import CORS, cross_origin
import requests
import os
from notion_client import Client
import datetime

app = Flask(__name__)
CORS(app, support_credentials=True)

NOTION_KEY = "secret_ufaMUzFP7m3mdP3tqAeRCO7tgE39c0CGWzH9iRLrlE5"
NOTION_DATABASE_ID = "6588be4dd7ee4f289be4d84a5b7845c1"

notion = Client(auth=NOTION_KEY)

start = str(datetime.date.today())
today = datetime.datetime.strptime(start, "%Y-%m-%d")
yesterday = today + datetime.timedelta(days=-1)
next_week = today + datetime.timedelta(days=7)

@app.route('/database', methods=['GET'])
@cross_origin()
def get_database(): 
    print("getting database")
    print(yesterday, next_week, today)
    my_page = notion.databases.query(
        **{
            "database_id": NOTION_DATABASE_ID, 
            "filter": {
                "and": [
                    {
                        "property": 'when',
                        "date": {
                            "before": str(next_week),
                        },
                    },
                    {
                        "property": 'when', 
                        "date": {
                            "on_or_after": str(today)  
                        },
                    }
                ],
            },
        }
    )
    
    my_page = my_page['results']
    result = []
    for page in my_page: 
        properties = page['properties']
        done = properties['done']['checkbox']
        when = properties['when']['date']['start']
        name = properties['Name']['title'][0]['plain_text']
        result.append([['checkbox', done], ['date', when], ['name', name]])
        # what = properties['']
        
    # print(my_page)
    return result 

@app.route('/properties', methods=['GET'])
@cross_origin()
def get_properties(): 
    print("getting properties")
    properties = notion.databases.retrieve(
        database_id=NOTION_DATABASE_ID
    )
    
    properties = properties['properties']
    
    ids = [] 
    for key, property in properties.items(): 
        name = property['name']
        type = property['type']
        id = property['id']
        ids.append([name, type, id])
    
    print(ids)
    return ids

if __name__ == "__main__":
    app.run(debug = True)
    