# TODO

- [] Library
    - [] List of all books available with title, author, location, tags(?)
    - [] Search books
    - [] Take-home
    - [] List of read books per user (requires authentication)
- [] Some sort of authentication (already asked credentials to Claranet Fr)
     - [SSO Azure](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
     - Other resources for OAuth2:
        - [part 1](https://dzone.com/articles/getting-access-token-for-microsoft-graph-using-oau)
        - [part 2](https://dzone.com/articles/getting-access-token-for-microsoft-graph-using-oau-2)
        - [part 3](https://dzone.com/articles/getting-access-token-for-microsoft-graph-using-oau-1)
     - [Maybe we can use cognito](https://www.idea11.com.au/how-to-set-up-aws-cognito-federation-office365/)
     - CallbackUrl: `academy.xpeppers.com/auth/callback`
     - Tenant = applicationID (we are waiting for it)
- [] Calendar for date in Add Item form
- [] Author is a User
- [] Adds "Sips" Video new section
- [] Adds Courses new section
- [] Plan future presentations
- [] Slack integration to notify next presentation and notify done presentation
- [] More gamification (badge for n° points, etc...)
- [] Make only cloudfront public (restrict s3 Bucket Policy to only cloudfront zones)

# Technical debt

- [] Make activities DELETE RestFul