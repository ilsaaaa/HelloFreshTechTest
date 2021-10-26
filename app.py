from flask import Flask, request, Blueprint
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS, cross_origin

import json

#Data-Base Access
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:password123!@cluster0.tvfrq.mongodb.net/MenuPlan?retryWrites=true&w=majority"
mongo = PyMongo(app)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


#Retrieve All data from one the recipe table
@app.route('/recipe', methods=['GET'])
@cross_origin()
def getRecipes():
    recipes = []
    for recipe in mongo.db.Recipes.find():
        try:
            recipes.append({
                "_id": str(recipe["_id"]),
                "itemName": recipe['itemName'],
                "ingredients": recipe['ingredients'],
                "instructions": recipe['instructions'],
                "nutritionalInfo": recipe['nutritionalInfo'],
                "classification": recipe['classification'],
            })
        except:
            continue
    print(recipes)

    #json. loads() takes in a string and returns a json object.
    #json. dumps() takes in a json object and returns a string.
    return {'result' : json.loads(json.dumps(list(recipes)))}


#Retrieve the recipe ID 
@app.route('/recipe/<recipeID>', methods=['GET'])
def getRecipe(recipeID):
    print(recipeID)
    res = mongo.db.Recipes.find_one({
        "_id": ObjectId(recipeID),
    })
    print(res)
    return {'result' : 'Created successfully'}

#The POST method sends data to the server and creates a new resource
@app.route('/recipe', methods=['POST'])
@cross_origin()
def createRecipe():
    #parse a valid JSON string and convert it into a Python Dictionary
    data = json.loads(request.data) 
    print(data["itemName"])

    recipeObject = {
        "itemName": data["itemName"],
        "ingredients": data["ingredients"],
        "instructions": data["instructions"],
        "nutritionalInfo": data['nutritionalInfo'],
        "classification": data['classification'],
        
    }

    res = mongo.db.Recipes.insert_one(recipeObject)
    print(res)
    result = {'result' : 'Created successfully'}
    
    return result

#Delete Recipes ID 
@app.route('/recipe/<recipeID>', methods=['DELETE'])
def deleteRecipe(recipeID):
    print(recipeID)
    mongo.db.Recipes.delete_one({
        "_id": ObjectId(recipeID)
    })
    return getRecipes()

# WeeklyMenu methods- The GET method is used to retrieve data from the server
@app.route('/weeklyMenu/<weekNumber>', methods=['GET'])

#The admin selects/finds a weekNumber with the weeks recipes
def getWeeklyMenu(weekNumber):
    weeklyMenu = mongo.db.WeeklyMenu.find({
        "week": 5
    }, {"recipes": True })
    weeklyMenu = list(weeklyMenu) #converts from cursor to json
    print(weeklyMenu)
    return {'result' : weeklyMenu}

#contain the specific changes to the resource
@app.route('/weeklyMenu', methods=['PATCH'])
#
def updateWeekly():
    data = json.loads(request.data)
    weekNumber = data["week"]
    recipes = data["recipes"]

    mongo.db.WeeklyMenu.find_one_and_update({
        "week": weekNumber
    }, {
         '$set': { "recipes": recipes }   
    })
    print(recipes)
    return {'result' : 'Created successfully'}


#Test run 
# @app.route("/")
# def test():
#     return "<p>app is working well helldodhofo</p>"

if __name__ == '__main__':
    app.run(debug=True)