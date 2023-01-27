# Hairy-Styles


Full Stack Build | delvelopment and deployment of hairstyle search site

---

**Table of Contents:**

* [Description](#description)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Testing](#testing)
* [Using the code](#using-the-code)
* [Hairy Styles Deployment](#hairy-styles-deployment)
    * [Screenshot of deployed application](#screenshot-of-the-deployed-application)
    * [Link to deployed application](#link-to-deployed-application)
* [Usage](#usage)
* [License](#license) 
* [Questions](#questions)

---

## Description

We wanted to build a full stack application that allows users to search for the hair style that they are looking for, and find user posts with the related hairstyle and the information on the hairdresser, location and review of the cut, also including an image of the user final style.

Using node.js and express JS to create a RESTful API, Sequelize and MySQL to manage the databases and sensitive user data, such as password encryption and session cookies, npm package manager and handlebars for HTML rendering.



## User Story


* AS A potential hair salon client
* I WANT to search for a hairstyle
* SO THAT I can see which hairdressers offer the hairstyle I want, and read reviews from previous clients



## Acceptance Criteria


* GIVEN a CMS style, hairstyle search and review website
* WHEN I visit the site for the first time
* THEN I am presented with the homepage, which includes existing review posts if any have been posted; navigation links for search, the homepage, Submit Your Cut and Contacts; and the option to log in 
* WHEN I click on the home option
* THEN I am taken to the homepage
* WHEN I click on SUBMIT MY CUT in the navigation
* THEN I am prompted to either sign up or sign in
* WHEN I choose to sign up
* THEN I am prompted to enter a name, an email and password
* WHEN I click on the sign-up button
* THEN my user credentials are saved and I am logged into the site
* WHEN I revisit the site at a later time and choose to sign in
* THEN I am prompted to enter my email and password
* WHEN I am signed in to the site
* THEN I see navigation links for search, the homepage, submit my cut, contacts, my profile, and the option to log out
* WHEN I click on the dropdown in the search bar
* THEN I am presented with a list of all the available hairstyles in the database to choose from
* WHEN I click search
* THEN I am taken to the search page, where all the user posts related to the hairstyle I have chosen are presented to me, each post including an image of their new haircut, the information on their hairstyle, which hairdresser they went too and the location of the salon, plus their review and when it was posted. I am also presented with a google maps api that has markers for the locations of the hairdressers in the posts.
* WHEN I click on an existing post
* THEN I am taken to the single post page and presented with the post image, the hairstyle name, the hairdresser name, review, user's name and date created for that post. I can also see other users comments on the post and have the option to leave a comment, if i am logged in.
* WHEN I click on the homepage option in the navigation
* THEN I am taken to the homepage and presented with existing posts from other users, showcasing their new hairstyles with an image of their new haircut, the information on their hairstyle, which hairdresser they went too and the location of the salon, plus their review and when it was posted. I am also presented with a google maps api that has markers for the locations of the hairdressers in the posts.
* WHEN I click on an existing post
* THEN I am taken to the single post page and presented with the post image, the hairstyle name, the hairdresser name, review, user's name and date created for that post. I can also see other users comments on the post and have the option to leave a comment, if i am logged in.
* WHEN I enter a comment and click on the submit button while signed in
* THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
* WHEN I click on the SUBMIT YOUR CUT option in the navigation
* THEN I am taken to the submit your cut page, where i am presented with a form, where i can upload my image, select the hairstyle from the dropdown or add a new style, select the hairdresser from the drop down or add a new one with their location and type in my review.
* WHEN I click on the button to add a post.
* THEN the image and contents of my post are saved and I am taken back to an updated profile page with my new post.
* WHEN I click on the contacts option in the navigation
* THEN I am taken to the contacts page and presented with the Names and GitHub links of the site creators and a contact email address.
* WHEN I click on the profile option in the navigation
* THEN I am taken to my profile and presented with any posts I have already created
* WHEN I click on one of my existing posts on my profile
* THEN I am able to delete or update my post and taken, back to my profile page, or to the updated post, respectively.
* WHEN I click on the logout option in the navigation
* THEN I am signed out of the site
* WHEN I am idle on the site for more than a set time
* THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete my posts, or add any comments.

Challenges in this project, learning to use the npm package Multer, so that the site could support multiform data, in order to save images to the database and render to the handlebars.  We also had some challenges with the model associations, as this was the first time all of the team had used this many separate models for the database, but we persevered and worked through to the solution.
Successes, we were able to create custom middleware to serve the search bar on all controller routes, implementing the DRY principle in code development. We were also able to get the Google Maps Places service running in the Google API, so that we could render the hairdresser locations to a map on the page.



## Installation

Start by downloading the code from the repository, then load in VS code, open a terminal and make sure you are in the project folder.
Initialise the code by typing into the terminal:
```bash
npm i

add your sql credentials and google API key to the the .envEXAMPLE file and rename the file to .env
```

## Using the code

To initialise the database you will need to run the following commands in the terminal to seed the database and run up the program:

- Login to mySQL and initialise the database

```bash
mysql -u root -p
source db/schema.sql
quit;
```
- Then seed the database
```bash
npm run seed
```

- To get the database and site running locally you will need to enter into the terminal:
```bash
npm run start
```
go to your web browser and enter, 

```http://localhost:3001``` 

the site should be running and you will able to interact with the database via the front end.

Once you have finished using the site and database, be sure to run *(ctrl+C)* or *(^C)* to close down the session.

The code files are fully commented, to explain the flow and logic of the code, so that others can work on this and expand on it too.


## Hairy Styles Deployment

### Screenshot of the deployed application.

![Screenshot of deployed site](./public/images/localhost3001.png)

### Link to deployed application.

<a href="https://hairy-styles.herokuapp.com/"><b>Link to the deployed Hairy Styles Site</b></a>


## Usage

This code can be used as an example of how to build a full stack application using the technologies layed out in the description, if you have any questions or suggestions, please let  know using the links in the [questions](#questions) section of this README.

## License

NA

## Questions

If you have any questions, reach out to anyone of the [contributors](https://github.com/VascoMiguens/Hairy-Styles/graphs/contributors) of this project.</br>

