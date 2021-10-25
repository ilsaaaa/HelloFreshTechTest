from flask import Flask, request
from flask_pymongo import PyMongo, ObjectId
import json

#Data-Base Access
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:password123!@cluster0.tvfrq.mongodb.net/MenuPlan?retryWrites=true&w=majority"
mongo = PyMongo(app)

#Calling collection(tables)
db_operations = mongo.db.WeeklyMenu
db_operations = mongo.db.Reviews
db_operations = mongo.db.Recipies

# Recipe Methods

#retrive data
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
def createRecipe():
    data = json.loads(request.data)
    print(data["itemName"])

    recipeObject = {
        "itemName": data["itemName"],
        "ingredients": data["ingredients"],
        "instructions": data["instructions"],
    }

    res = mongo.db.Recipes.insert_one(recipeObject)
    print(res)
    result = {'result' : 'Created successfully'}
    return result

#Delete Recipes ID 
@app.route('/recipe/<recipeID>', methods=['DELETE'])
def deleteRecipe(recipeID):
    print(recipeID)
    db.Recipes.delete_one({
        "_id": recipeID
    })
    return {'result' : 'Created successfully'}

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