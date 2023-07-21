from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
import os
from notion_client import Client
import datetime
import uuid
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, support_credentials=True)

notion = Client(auth=os.environ.get("NOTION_KEY"))
load_dotenv()  # take environment variables from .env.

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
            "database_id": os.environ.get("NOTION_DATABASE_ID"), 
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
        url = page['url']
        page_id = url.split('/')[-1].split('-')[-1]
        
        properties = page['properties']
        result.append([page_id, properties])
    
    print("database: \n, ", result)
    return result

@app.route('/properties', methods=['GET'])
@cross_origin()
def get_properties(): 
    print("getting properties")
    properties = notion.databases.retrieve(
        database_id=os.environ.get("NOTION_DATABASE_ID")
    )
    
    properties = properties['properties']
    
    ids = [] 
    for key, property in properties.items(): 
        name = property['name']
        type = property['type']
        id = property['id']
        ids.append([name, type, id, False])
    
    print(ids)
    return ids

@app.route('/finish', methods=['POST'])
@cross_origin()
def update_row(): 
    print("updating database for finished task")
    page_id = uuid.UUID(request.args.get('page_id'))
    property_name = request.args.get('property_name')
    print(property_name)
    result = request.args.get('result') == 'true'
    response = notion.pages.update(
        ** {
            'page_id': page_id,
            'properties': {
                f'{property_name}': {
                    'checkbox': result,
                },
            },
        }
    )
    
    return response

if __name__ == "__main__":
    app.run(debug = True)
    