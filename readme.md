# XPeppers Academy

# Setup
- Install all dependencies with `npm install`
- Configure AWS account to your PC

# Run locally
```
npm start
```

# Deploy
```
npm run deploy
```

# Curl Example
```
curl -X POST -d '{"title":"Retrospettiva Trento","type":"facilitation","author":"IVO","date":"2019-03-08","links":[{"type":"wiki","url":"https://an.url"}]}'  http://localhost:3000/save
```