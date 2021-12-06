# TODO REMINDERS

A simple way to remember everything you have to do and share it with anyone you like.

Visit the running application -> https://todoreminders.vercel.app

<img src="https://github.com/philipdaveby/reminders/blob/main/assets/todoreminders_screenshot.png?raw=true" width='300'>

The application needs the following environment variables:

- REACT_APP_FIREBASE_API_KEY
- REACT_APP_FIREBASE_AUTH_DOMAIN
- REACT_APP_FIREBASE_PROJECT_ID
- REACT_APP_FIREBASE_STORAGE_BUCKET
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- REACT_APP_FIREBASE_APP_ID
- SKIP_PREFLIGHT_CHECK
- NODE_ENV
- GENERATE_SOURCEMAP

The backend of this project is located in the repo [reminders-server](https://github.com/philipdaveby/reminders-server).

###### Implemented user stories:

- Create an account by email
- Add, edit, remove and update your to-dos
- A user can collaborate with other users in real time and edit mutual to-dos by adding their email address
- To-dos are saved in a database
- Mark your to-dos as done, which will order them last in you list
- Filter your done to-dos to see what you've accomplished
- Add sub tasks to your to-dos

###### Ideas for future improvment:

- Drag and drop to rearrange the order or your to-dos
- Freeze you to-dos to avoid collaborators to edit it
- Filter to-dos you have yet not completed
- Manage collaborators -> view, edit and delete
 
### Instructions to run application

Get the server running ([reminders-server](https://github.com/philipdaveby/reminders-server))
Clone this repo and enter the following in the terminal
```
npm install
npm run start
```
