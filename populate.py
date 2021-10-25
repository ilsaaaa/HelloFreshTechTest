from flask_pymongo import PyMongo, ObjectId
from flask import Flask

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:password123!@cluster0.tvfrq.mongodb.net/MenuPlan?retryWrites=true&w=majority"
mongo = PyMongo(app)

#In each week 1-52 weeks insert recipes
for i in range(1, 52):
    mongo.db.WeeklyMenu.insert_one({
        "week": i,
        "recipes": []
    })