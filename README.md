# Stock tracker app

React based experimental application that lets you to query stock data and manage watchlist.

# Tech stack

- Frontend: React application bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and styled with Material design
- Backend: Nodejs api utilizing [Puppeteer](https://github.com/puppeteer/puppeteer) that fetches data from [Finance Yahoo](https://finance.yahoo.com)

# How to run backend

- Navigate to directory `api`
- Check if port `8001` is available. Otherwise use an available port by setting env variable `PORT`
- Execute the followings in your terminal
```
npm i
npm run start:dev 
```

# How to run frontend

- Make sure backend is running at port `8001`. If you use a different port, then update it in `ui\src\core\config.js`
- Navigate to directory `ui`
- Execute the followings in your terminal
```
npm i
npm start 
```

By default, frontend uses port 3000. Once it is running, you can navigate to `http://localhost:3000`

# Disclaimer

Since stock data is fetched from Finance Yahoo using sort of crawling and parsing html, it is considered to be fragile that any change in Finance Yahoo might break the application. That's why I am considering experimental.  
Feel free to contribute.