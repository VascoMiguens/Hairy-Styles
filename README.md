# Hairy-Styles


Development job | build of the back end for an e-commerce site. 

---

**Table of Contents:**

* [Description](#description)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Testing](#testing)
* [Using the code](#using-the-code)
* [ECommerce Back End](#ecommerce-back-end)
    * [Video Demonstration](#video-demonstration)
* [Usage](#usage)
* [License](#license) 
* [Questions](#questions)

---

## Description

I was given the base code for for an e-commerse back-end database and was asked to write the code for the API routes to perform RESTful CRUD Operations and association models for each data type. I configured a working Express.js API using Sequelize to interact with a MySQL database.


## User Story


* AS A manager at an internet retail company
* I WANT a back end for my e-commerce website that uses the latest technologies
* SO THAT my company can compete with other e-commerce companies


## Acceptance Criteria


* GIVEN a functional Express.js API
* WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
* THEN I am able to connect to a database using Sequelize
* WHEN I enter schema and seed commands
* THEN a development database is created and is seeded with test data
* WHEN I enter the command to invoke the application
* THEN my server is started and the Sequelize models are synced to the MySQL database
* WHEN I open API GET routes in Insomnia for categories, products, or tags
* THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST, PUT, and DELETE routes in Insomnia
* THEN I am able to successfully create, update, and delete data in my database

I found this project quite enjoyable, but the main challenge i faced was getting used to using and writing up the model associations, such as ``` belongsTo``` and ```belongsToMany({through: ...})``` - However, after practising and doing some online research, I am more confident in using the expressions correctly.


## Installation

Start by downloading the code from the repository, then load in VS code, open a terminal and make sure you are in the project folder.
Initialise the code by typing into the terminal:
```bash
npm i 
npm i mysql2
npm i sequelize

add your sql credentials to the the .env file
```

## Using the code

To initialise the database you will need to run the following commands in the terminal to seed the database and run up the program:
```bash
npm run seed
```

To get the e-commerce database code to run you will need to enter into the terminal:
```bash
npm run start
```
to run the routes and test that the database is connected and working you will need to run the routes such as, 

```http://localhost:3001/api/categories/1``` 

through a program such as *Insomnia* or *Postman* to see and manipulate the data being presented from the database.

Once you have finished with the database, be sure to run *(ctrl+C)* or *(^C)* to close down the session.

I have fully commented the codefiles, to explain the flow and logic of the code, so that others can work on this and expand on it too.


## ECommerce Back End

### Video demonstration.


<a href="https://drive.google.com/file/d/1rjZbYxARhsJ_tQjGpUa4aAak3ZQtkDGx/view"><b>Link to FULL VERSION video walkthrough</b></a>


## Usage

Please feel free to use this code for setting up your own E-Commerce Back End, if you have any questions or suggestions, please let me know using the links in the [questions](#questions) section of this README.

## License

NA

## Questions

If you have any questions, reach out at [@enigmawoman](https://github.com/enigmawoman)</br>

