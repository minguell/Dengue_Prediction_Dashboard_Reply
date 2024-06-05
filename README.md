# Predicting Dengue Outbreaks with Machine Learning Models

## Maps

The maps directory contains data to create maps

## Data

The data directory contains data for the health districts coordinates and geometry

## Dashboard_app

The directory contains the React native app.

To run it, you can run the following commands:

- npm install
- npm start

For Further information, you can refer to the package.json file.

The app is not finished but is a first look a what it could look like.

## denguePredictionApi

This directory contains an API to give GeoJson data
to display it in a map with information on the dengue
diseases during an amount of time.

This API works with a local database to access data.
You will need to create a mysql database and connect it to prisma via a .env file
with the variable DATABASE_URL.
You can find a tutorial here:
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-mysql

When it's done, run npm init to load the data into the database
(It may take a long time to load the mosquito data).
You can run **npx prisma studio** command to see the data and
refresh the page to see how it evolves during the loading

At last, run npm install and then npm run serve to launch the server.
It will be accessible on the local port 3000.

You can see the routes in the server.ts file.
The main endpoints are: 
- /district/:value (value can be "full", "prediction" or "real")  
    GeoJson Polygons data. The body must be   
    ``{
        beginDate: {month: [1, 12], year: number},
        endDate: {month: [1, 12], year: number},
        geometry: boolean
    }``
- /coordinate/:value (value can be "full", "prediction" or "real")  
  GeoJson Points data. The body must be   
  ``{
  beginDate: {month: [1, 12], year: number},
  endDate: {month: [1, 12], year: number}
  }``
- /mosquitoes  
  GeoJson Points data. The body must be   
  ``{
  beginWeek: {week: number, year: number},
  endWeek: {week: number, year: number}
  }``

## desktop_dashboard

This directory contains a little React web dashboard to display the data
of the real and the prediction value of dengue diseases
during a certain amount of time.

It also displays the data of the mosquitoes traps

To run the app you need to follow several steps:

- npm install
- Run the local server from the denguePredictionApi directory
- Run the app with the command: npm start