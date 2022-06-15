# Interview Scheduler

Interview scheduler is a single-page app that allows users to book technical interviews between students and mentors. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. It is also tested with different environments, Webpack Dev Server, Storybook, Jest and Cypress.  

### Users can ...
- make an appointment between the hours of 12 PM and 5 PM, Monday to Friday
- enter any student name while the interviewer is chosen from a predefined list
- can save the appointment and view the entire schedule of appointments on any day of the week
- can also edit or delete appointments

# Final Product
###  Check different days
<img src="https://github.com/Kaz1022/scheduler/blob/main/docs/different_days.gif?raw=true" width="500">

### Book an appointment
<img src="https://github.com/Kaz1022/scheduler/blob/main/docs/book_appointment.gif?raw=true" width="500">

### Edit an appointment 
<img src="https://github.com/Kaz1022/scheduler/blob/main/docs/edit_appointment.gif?raw=true" width="500">

### Delete an appointment 
<img src="https://github.com/Kaz1022/scheduler/blob/main/docs/delete_appointment.gif?raw=true" width="500">


## Getting Started

1. Fork this repository and clone it onto your local device.
2. Install dependencies using the `npm install` command.
3. Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory (NOT within our current scheduler directory) on your host machine. Follow the README.md instructions.
4. In another termianl, `npm start` scheduler-api.
5. In your scheduler directory, `npm start` to start the app. It will be served at <http://localhost:8080/>.
7. Go to <http://localhost:8080/> in your browser.

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

- Node 12.x or above
- NPM 5.x or above
