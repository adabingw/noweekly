import requests

url = "https://api.notion.com/v1/oauth/token"

payload = {"grant_type": "\"authorization_code\""}
headers = {
    "accept": "application/json",
    "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)