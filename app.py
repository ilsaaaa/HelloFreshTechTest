from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:password123!@cluster0.tvfrq.mongodb.net/MenuPlan?retryWrites=true&w=majority"
mongo = PyMongo(app)

db_operations = mongo.db.Users
db_operations = mongo.db.WeeklyMenu
db_operations = mongo.db.Reviews
db_operations = mongo.db.Recipies



@app.route('/create')
def create():
    #Insert Data for Users 
    new_user = {'UserID' : 0, 'Name' : 'Tim', 'Email': 'timjone@gmail.com'}
    db_operations.insert_one(new_user)

    #Insert Data for WeeklyMenu
    new_weeklyMenu = {'WeeklyMenuID': 0, 'noOfPerson' : 2, 'noOfRecipies' : 3}
    db_operations.insert_one(new_weeklyMenu)
   
    result = {'result' : 'Created successfully'}
    return result




#Test run 
# @app.route("/")
# def test():
#     return "<p>app is working well helldodhofo</p>"

    if __name__ == '__main__':
        app.run(debug=True)