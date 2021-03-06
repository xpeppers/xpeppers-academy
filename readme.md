# XPeppers Academy

# Setup
- Install all dependencies with `npm run install:all`
- Configure AWS account to your PC

**NB:** You have to use AWS_PROFILE env variable when your AWS account is not set as `default`

# Run Backend locally
```
npm run start:api
```

# Run Frontend locally
```
npm run start:gui
```

# Deploy Backend
```
[AWS_PROFILE=[YOUR_PROFILE]] npm run deploy:first
[AWS_PROFILE=[YOUR_PROFILE]] npm run deploy:api
```

# Deploy Frontend
```
[AWS_PROFILE=[YOUR_PROFILE]] npm run deploy:gui
```

# Deploy Both
```
[AWS_PROFILE=[YOUR_PROFILE]] npm run deploy
```

# Logs
```
[AWS_PROFILE=[YOUR_PROFILE]] npm run logs -- -f [FUNCTION_NAME] [-t] [--startTime [TIME]]

es:
[AWS_PROFILE=[YOUR_PROFILE]] npm run logs -- -f save -t --startTime 30m
[AWS_PROFILE=[YOUR_PROFILE]] npm run logs -- -f read -t --startTime 3d
[AWS_PROFILE=[YOUR_PROFILE]] npm run logs -- -f read -t --startTime 3d
```

# Curl Example
```
curl -X POST -d '{"title":"Retrospettiva Trento","type":"facilitation","author":"IVO","date":"2019-03-08","links":[{"type":"wiki","url":"https://an.url"}]}'  http://localhost:3000/save
```