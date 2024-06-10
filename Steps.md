## Steps following to create this app

1. Install project with Nextjs and setup done. 
2. Install ShadCn Ui library for project.
3. Test the Button componet of ShadCn library.
4. Install clerk for authentication and authorisation.
5. Setup Clerk for the Project using Clerk Documentation
    - Set Up its .env.local file in root directory.
    - Add the middleware.js/ts file in root directory.
    - setup and wrap the app with <ClerkProvider></ClerkProvider> in layout.js file
    - Added Protected Routes function to middleware.js from clerk next auth setup link
6. create a folder name dashboard in app directory so this will be our route and make the files in that folder and start coding 
7.create (auth) folder name should be same as i typed and create signUp and sign-in pages in that,for code check clerk/nextjs documentation with having custom sign in/sign up page
8.do steps just given in the documentation 