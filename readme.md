# Home Construction Application

## Group: 2020 - 167
## Student/Member Details: 
- ### Heshan E.K.P. - IT17143028


## Carpenter and Mason  component
### Introduction

Nowadays, people who have the intension to build their house has various amount of requirements. In order to construct the house with the requirements of them, they need professional personals. The other fact the people consider and most concerned about is the cost or expenses to construct a house. People who has a busy work schedule will find these as difficulties.

In the carpenter and mason component, the interaction among the professional personals (carpenter and mason), customers and the system will be handled by this component. The main functionality of this component is to predict the cost for the construction of house through a Machine Learning model developed using an algorithm. The details required for the model will be gathered from the architecture and the customers such as materials for celling, roof, wall and floor…etc.  Based on the requirements supplied by the customers and architectures, the system will produce a prediction that helps the customer to get a clear idea about the construction cost for the house and it helps them to manage the cost according to their budget.

The other feature is the recommendation system that helps the customers to find a professional carpenters and mason for the house construction process. This saves the time and money of the customers’.

## Technologies

 - [React Js(Front-end development)](https://reactjs.org/docs/getting-started.html) 
 - [Laravel 5.8 (Back-end development)](https://laravel.com/docs/5.8)
 - [Redux](https://redux.js.org/introduction/getting-started)
 - [JWT (Json Web Token)](https://jwt-auth.readthedocs.io/en/develop/)
 - [Flask 1.1.x](https://flask.palletsprojects.com/en/1.1.x/quickstart/)
 - [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
 - [Font Awesome](https://fontawesome.com/)
 - PhpMyAdmin (as the Database)
 - Anaconda
 - Python 3.7

## Functionalities Built
 - Review functionality
 - Work Done (Completed projects) functionality
 - Search filter functionality for carpenter and mason
 - JWT (Json Web Token) based authentication
 - Rating system developed/ implemented
 - Multi - Auth implemented
 - Recommendation System implemented

## Research Questions

1.	Unpredictability of the Cost for the carpentry and masonry works.
2.	Uncertainty regarding the cost of the house construction.
3.	Inability to find a professional carpenters and home builders (Masons).
4.	High wastage of time and money.

## Research Objedctives

### General Objectives

•	Predict the cost for customers using a prediction system using a ML based model to make easy and quick decisions.

•	Recommend carpenters and home builders (Masons) using a ML Model based recommendation system to save the time and money of customers.

### Specific Objectives

•	Carpenter and home builder(mason) should be able to improve their business.

•	System should be easy to use.

•	Quick communication between carpenter, home builder(mason) and customer.

## Summary of the Carpenter and Mason Component

- With the fast technological development and the rapid environmental growth, people are busy with their official and non-official works. They do not have enough time to spend in order to find a carpenter and a home builder(mason) and to think about the cost. But they are interested to build their dream home in their own specific ways. Then they spend most of their precious time to find professional personals. They need more accurate and valuable information to make decisions. That is the cost prediction system and recommendation system need to solve. 

- There are some circumstances, people cannot achieve that dream of them. There are few reasons, why they cannot achieve it. They are,

1. Cost of carpentry and masonry work for their dream home.
2. Whether the budget is matched with the carpentry cost or not.
3. Find professional, trusted and well-experienced carpenters.
4. Time to spend in order to find professional personals.

- Above are the factors that the customer considers. Cost is the most important factor in the construction field. So using the home construction app, it makes customers life easy by suggesting a professional, trusted carpenter and a home builder based on the previous customers’ feedbacks within or outside of the customer’s region and make a cost prediction for a particular customer for carpentry and masonry works. 
This research study regarding to help customers to find a professional, trustworthy carpenter and a homebuilder to satisfy their carpentry needs and to save their precious time and money. 

- So The carpenter and Mason component includes three sub-components. They are

*  Constrction Cost Prediction System
*  Carpenter and Mason Recommendation system
*  Carpoenter and Mason Profiles

### Constrction Cost Prediction System
The main functionality of the cost prediction system is to make accurate prediction to make easy the decision making process for the customer. Cost prediction system is developed using Machine learning and a model is developed. Through the model predictions will be produced. In order to make predictions, following information will be needed. Followings are few of them,
1.	Number of floors
2.	Number of rooms
3.	Number of Bathrooms
4.	Area
5.	Location Nature
6.	Location condition etc….

This information will be inputs to the ML model and then the prediction will be produced as mentioned before. Since the predictions are done through a ML based model, the algorithm will not have to run again and again.

### Carpenter and Mason Recommendation system

Carpenter and Mason recommendations system is developed to suggest the carpenters and masons. 
At the very beginning the carpentry and masonry cost will be predicted through ML and then those cost will used to filter out the projects previously done by some carpenters and masons (In the system, mason and carpenters are allowed to add their previously done projects). 
Based on the cost, the system will generate suggestion. Here, suggestions are previous projects done by carpenters and masons. By Recommending these will help the customers to understand the passion to work and to decide which carpenter and mason is suitable for their house building process. 
Because visuals are making decisions taking process easy than just text.

### Carpenter and Mason profiles

The main functionality here is to give the facility to the carpenter and mason to manage their profiles. By managing their profiles, they can make their profiles more attractive as much as possible to attract jobs and to improve their talent as a business. 
Carpenter and mason profiles are developed using the JWT (Json Web Token) and it used for the user login and register functionalities. It generates a token when login and the token will be removed when the user logged out.




## Description of the implemented System architecture

- Once the customer logged in to the system, he or she will be redirected to the dashboard. Then the will be able to see, some tabs in the left side. There they can manage their profiles, see reviews they added and manage and manage construction projects. In order to create a construction project, they will have to go to the Construction Projects" tab. Then they will have to give some informations to the system in order to make prediction of the construction cost and all the informations customers are given will be shown in a page called "Summary". Construction cost prediction is developed using a ML pipeline. So they will be able to check the information they have given. Then the cost prediction according to the information given by the customer will display. Then customer will be allowed to select a carpenter and a mason for their house construction. For that there are two ways given to the customers to select them. They can select any service provider (carpenter and mason) in Recommendations given by the system or the customer will be able to filter out a particular service provider according to their requirements using the search filter. After all of that, the information of the cosntruction project to check the construction project information again. Once the customer confirm it. The information will be stored.

- Customers are allowed to make reviews on the service provider. In order to rate the service providers, a star rating system is implemnted. Using the star rating system, customers will be able to add review very easily. as mentioned before, customers will be able to see review they added in the dashboard under reviews tab and they can manage their reviews.

- Service providers are allowed to add their completed projects (previous completed projects) to the system and also they will be able to see the reviews added by the customers.

## How to run the application

 - Download the application
 - Make sure to update your **react and node.js** versions.
 - Open the project using your desired IDE.
 - Go to the project folder using your desired terminal and run **composer install** to install all the related laravel configurations. If it is necessary, you can run **composer update** as well.
 - Then run **php artisan key:generate** to generate a key for the downloaded project.
 - Then install the **Flask**. The flask installation info you can get from here as well. 
 [Flask Installation](https://flask.palletsprojects.com/en/1.1.x/quickstart/)
 - Create a DB (Database) called ***"homie"*** .
 - Run **php artisan migrate** command to create tables in your database.
 - Run **php artisan serve** to run laravel as server. 
 - Go to the frontend folder using your terminal.
 - Run **npm install** to install all the react configurations
 - Run **npm start** to start the application.
 - In order to get predictions from **ML model**. You need to download the Ml model using this URL and place it in the **ML** folder of the project.**[ML Model Download](https://drive.google.com/file/d/1eBquQ3ZlmWEW54ldczlOcrc9qp0ze9Ou/view?usp=sharing)**
 - In order to run the ML (machine Learning) part, you need to go to the directory called "**ML**" and open a terminal. Then type following commands.
    1. **SET FLASK_APP=ml.py**
    2. **flask run**

## Dependencies used for the project

1. Axios
2. React Router
3. React - icons
4. React - js - pagination
5. React - Redux
6. React - Router - DOM
7. React - Rating - Star - Component
8. Redux and Redux Thunk
9. Json Web Token
10. Js - Coockie
