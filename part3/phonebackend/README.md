### Important note
The application is coded on windows, so code to build and transport build file is windows based and will not work in other operating system.


### run application

  # Without nodemon
    npm start
  
  # With nodemon
    npm run dev
   
  # build frontend folder and copy-paste to backend 
    npm build:ui
   
  # deploy on heroku
    npm build:full
  
  # check out logs of heroku
    npm logs:prod
  
  # lint testing
    npm run lint


### .env file contains
PORT = 

### Back End Base Url

baseurl = "https://glacial-beyond-39621.herokuapp.com/"

## Get all persons
"https://glacial-beyond-39621.herokuapp.com/api/persons"

## Post new user information
"https://glacial-beyond-39621.herokuapp.com/api/persons"

## Delete User 
"https://glacial-beyond-39621.herokuapp.com/api/persons/:id"

