from io import StringIO
import modal
from urllib.request import urlopen 
import json
import requests

image = modal.Image.debian_slim(python_version="3.13.0") \
    .pip_install("fastapi[standard]", "requests")
app = modal.App(name="has-simple-web-endpoint", image=image)


@app.function()
@modal.web_endpoint()
def f():
    return "Hello world!"

@app.function()
@modal.web_endpoint()
def square(x: int):
    return {"square": x**2}

@app.function()
@modal.web_endpoint(method="POST")
def readFileAndCreateFile(item: dict):
    print(f"{item}")
    
    # store the response of URL 
    response = urlopen(item['download_url']) 
    
    # storing the JSON response  
    # from url in data 
    data_json = json.loads(response.read()) 
    print(data_json) 
    payload = {"status":"procressed", "data":data_json}
    
    print("posting",  item['upload_url']) 
    headers = {"Content-Type": "application/json"}
    r = requests.post(item['upload_url'], data=json.dumps(payload, indent=2), headers=headers)
    
    storage_id = r.json()['storageId']
    finished_body = {"task_id": item['task_id'], "storage_id": storage_id}
    print("finished_body", json.dumps(finished_body))
    r = requests.post(item['finished_url'], data=json.dumps(finished_body))
    
    return {"ok":"ok"}
# [x] TODO 12-12-2024 call convex/http.ts/get_file process than call convex/http.ts/postComplete