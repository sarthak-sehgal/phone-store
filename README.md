# Phone Store
A responsive React web app hosting content for a phone shop statically to help out shop owners in these times of social distancing.

# Demo
[View Demo Online](http://amarelectronics.netlify.app/)

# Run locally
## Development
Prerequisite:
- NodeJS
- App setup on Firebase

**1. Clone the repository and install modules**
```
git clone http://github.com/sarthak-sehgal/phone-store
cd phone-store/
npm install
```
**2. Setup server configuration**  
Now, create the file `serverConfig.js` in the `src` folder:
```
src/serverConfig.js:

export const BASE_URL = "";

export const firebaseConfig = {
	apiKey: "YOUR_FIREBASE_API_KEY",
	authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
	databaseURL: "YOUR_FIREBASE_DB_URL",
	projectId: "YOUR_FIREBASE_PROJECT_ID",
	storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
	messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
	appId: "YOUR_FIREBASE_APP_ID"
};
```

**3. Run website**
```
npm start
```

## Build for production
```
npm run build
```

## Deploy on Netlify
```
npm i netlify-cli -g
npm run delpoy
```

# Screenshots
![Screenshot 1](./screenshots/1.png)
![Screenshot 2](./screenshots/2.png)
![Screenshot 3](./screenshots/3.png)
![Screenshot 4](./screenshots/4.png)
![Screenshot 5](./screenshots/5.png)
![Screenshot 6](./screenshots/6.png)