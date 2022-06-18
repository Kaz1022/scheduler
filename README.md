# Interview Scheduler

Interview scheduler is a single-page app that allows users to book technical interviews between students and mentors. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. It is also tested with different environments, Webpack Dev Server, Storybook, Jest and Cypress.  

### Users can ...
- make an appointment between the hours of 12 PM and 5 PM, Monday to Friday
- enter any student name while the interviewer is chosen from a predefined list
- can save the appointment and view the entire schedule of appointments on any day of the week
- can also edit or delete appointments

# Final Product
##  Check different days
![Different Days](https://github.com/Kaz1022/scheduler/blob/main/docs/different_days.gif?raw=true)

## Book an appointment
![Book an appointment](https://github.com/Kaz1022/scheduler/blob/main/docs/book_app.gif?raw=true)

## Edit an appointment 
![Edit an appointment](https://github.com/Kaz1022/scheduler/blob/main/docs/edit-app.gif?raw=true)

## Delete an appointment 
![Delete an appointment](https://github.com/Kaz1022/scheduler/blob/main/docs/delete-app.gif?raw=true)


## Getting Started

### Set Up The API Server

1. Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api).
2. Follow the README.md instructions.
3. `npm start` scheduler-api(This must be running in another terminal when you start the app)

### Set Up Scheduler App

1. Fork this repository and clone it onto your local device.
2. Install dependencies using the `npm install` command.
3. `npm start` to start the app. It will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies

- @testing-library/react-hooks
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## devDependencies

- @babel/core"
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- testing-library/react
- babel-loader
- node-sass
- prop-types
- react-test-renderer
