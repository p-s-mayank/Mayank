# Backend

 ## Prerequisite
 
   * Node.js  ( https://nodejs.org/en/download/ )
 
 ## Installation
 
   * Open terminal in the root folder and enter the following commands:

      ` npm i `    (to install all the required packages)
      
      ` npm run dev `    (to start the app)
 
   * The app will be running on http://localhost:4000
 
 ## Availabele routes:
 
   * GET: `/users` :- show all users
   * GET: `/user/:id` :- user with given ID
   * GET: `/thoughts` :- show all thoughts
   * GET: `/thoughtsbyuser/<username>` :- show thoughts posted by user \<username>
   * POST: `/signup` :- {username, password}
   * POST: `/signin` :- {username, password}

   ### Requires Authentication:
   * POST: `/createthought` :- {title, content, anonymous}
   * POST: `/replythought/<id>` :- {content, anonymous}
   * DELETE `/deletethought/<id>` :- delete thought with given ID
   * DELETE `/deletereply/<id>/<reply_id>` :- delete reply with given thought ID and reply ID
