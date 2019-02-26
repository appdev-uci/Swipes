# Swipes

Simple website that helps uci students post swipes or connect with people
that will swipe them in

## Setup

#### Setting up env file
```
cp .env.copy .env
```

set SECRET_KEY="example secret key"
set COOKIE_KEY="example cookie key"

#### API requirements
* Google Oauth
##### Setting up Google Oauth steps 
* follow the steps for https://developers.google.com/adwords/api/docs/guides/authentication
* save the CLIENT_ID and CLIENT_SECRET_KEY into the .env file
* go to project > dashboard > enable api > add Google + api
* go to project > credentials > credential created
    * go to authorization url header and add http://localhost:3000/auth/google/callback, http://localhost:5000/auth/google/callback
##### Install packages for client
```
cd client && npm install
```

##### Install packages for server
```
cd server && npm install
```	

#### Starting the app
##### Start client
```
cd client && npm start
```

##### Start server
```
cd server && npm start
```	