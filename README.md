

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#Features of social node js app
1. Allow Login & User Authentication using JWT token
2. dependent on social angular app for UI
3. Mongo db is used
# API are

http://localhost:3000

1. Register New User
Method Type : POST
URL : http://localhost:3000/register
JSON : { "email":"vivek",
           "password": "12345",
           "name": "Vivek",
           "description": "Description in one line"
       }
Output:Token will be generated
{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTVhNjQ2MTBkMWQwZDI0N2NkYzRlNDUifQ.uY7g8GX9gxfLzrWHBHF-WEWjoKBP7Pkj9pAl6F83SCs"}

2. Get all users
Method Type : GET
URL : http://localhost:3000/users

3. Get User Profile
Method:http://localhost:3000/profile/5a59e162fe75e61218a282c7

4. Get User Posts
Method Type: GET
URL: http://localhost:3000/posts/5a59e162fe75e61218a282c7

5. Post a message from login in user
Method : POST
URL: http://localhost:3000/posts
{post:this.postMsg}
