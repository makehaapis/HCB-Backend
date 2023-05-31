<h1>Helsinki City Bike App</h1>

This is web application made Node.jsthat displays data from journeys made with City Bikes in Capital area of Finland.  
Backend service fetches and converts .csv data to objects and Mongoose saves that data to MongoDb database.  
React.js handles the frontend UI.  

Dataset that has information about HSL's city bike stations found here:   
+ https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv  

And Datasets about journeys found here:  
+ https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv  
+ https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv  
+ https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv  

You can find my demo of this project running as render.com Here:  
+ [https://helsinki-city-bike-app.azurewebsites.net/](https://helsinki-city-bike-app-mjk9.onrender.com/)  

<h1>How To Build</h1>  

If you want to build this solution, follow this tutorial.  

<h2>Prerequisites:</h2>  

+ Make sure you have Node.js with Node package manager installed or Download here: https://nodejs.org/en  
+ You need to have MongoDb and connection string to connect with app:: https://www.mongodb.com/  
+ Api key for Bing maps: https://www.bingmapsportal.com/  

<h2>Download app from Github:</h2>  

Download project from Github or give 'git clone https://github.com/makehaapis/HCB-Backend.git' command in terminal  

<h2>Connecting to MongoDb</h2>  
  
Next step is to add .env file to root directory.  
Add following env variables to .env file:  
MONGODB_URI=your_mongo_db_uri  
PORT=3003  

replace 'your_mongo_db_uri' to your mongodb connection string  

<h2>Adding Bing maps api key</h2>  

Add following env variable to .env file:  
REACT_APP_BING_API_KEY="your_api_key"  
  
replace your_api_key to your api key from bing maps portal.  
  
<h2>Build</h2>  

Go to root directory and give command npm install in terminal.  

To seed stations in your database give command:
npm run seedStations

To seed journeys in your database give command:
npm run seedJourneys

After seeding the database you can start the app with command: 
npm start

Now app is running in http://localhost:3003/

If you want me to provide you the .env file please contact me via email: haapasaari.markoj@gmail.com
