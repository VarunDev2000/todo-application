# To Do Application

This is a To Do VueJS application with the following features:

1. Option to Create To Do task
2. Option to Update To Do task
3. Option to Delete To Do task (confirmation modal / pop-up)
4. Option to view All, Pending, Completed, Upcoming and Today's tasks
5. Mark task as complete
6. Duplicate the task
7. Set due date for the task
8. Task will be highlighted in red if it is past the due date and not marked as complete

## Live Application URL

You can access the live application here:

### https://aditya-sridhar.github.io/simple-reactjs-app

## Application Demo

You can watch the application demo here:

### https://aditya-sridhar.github.io/simple-reactjs-app

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

To install Node JS refer to https://nodejs.org/en/

### Installation:

```bash
npm install
```

### To Start Application:

```bash
npm run serve
```

### To Visit App

```bash
http://localhost:8080/
```

### To Run Unit Tests

```bash
npm run test:unit
```

### To Compile & Minify for Production

```bash
npm run build
```

## Application Screenshots

- ### Desktop

  ![Main page with extra details and options of task](/assets//screenshots/main-more-details-open.jpg)

  ![Main page - Completed tasks](/assets//screenshots/main.jpg)

  ![Main page - multiple tasks selected](/assets//screenshots/multiple-tasks-selected.jpg)

  ![Edit a task](/assets//screenshots/edit-task.jpg)

  ![Create/edit task popup for smaller desktops](/assets//screenshots/popup-for-smaller-devices.jpg)

  ![Warning popup](/assets//screenshots/warning-popup.jpg)

- ### Mobile

  ![Main page in mobile device](/assets//screenshots/mobile-main.jpg)

  ![Menu in mobile device](/assets//screenshots/mobile-menu.jpg)

## Application design

- ### Components

  1. **ToDo** Component : This is the main(home) component that holds all the below components together.

  2. **ToDoList** Component : This Component lists all the tasks created by the user.

  3. **ToDoListItem** Component : This Component displays the name of a single task. When clicked on this component it expands to show more details (Description, Due date, Task type) and options (Duplicate, Edit).

  4. **ToDoCUDItemForm** Component : This component is used to create, update and delete a task.

  5. **ToDoCUDItemPopUpForm** Component : This is same as **ToDoCUDItemForm** component but it will be a popup for smaller devices. **ToDoCUDItemForm** component is a child of this component.

  6. **ToDoDeleteConfirmation** Component : This component is a warning modal which will be shown to the users before they delete one or multiple tasks.

  7. **ToDoDeleteConfirmationData** Component : This component displays the details of to be deleted task(s). This is a child of **ToDoDeleteConfirmation** component.

  ### Common components

  1. **AppMenu** Component : This Component is the application's main menu.

  2. **AppModal** Component : This Component is a base modal for the app.

  3. **AppPrimaryButton** Component : This component renders the primary button of the app.

  4. **AppSecondaryButton** Component : This component renders the secondary button of the app.

  5. **ErrorWrapper** Component : This is a component wrapper to show error message during form validation.

- ### URL

  The application has just one home(/) url which ties to _ToDo_ Component

## Libraries

1. **Vue.js v2** : This link redirects you to the home page of Vue 2
   https://v2.vuejs.org/

2. **Tailwind CSS** : Refer to https://tailwindcss.com/docs/utility-first to rapidly build modern websites without ever leaving the HTML

3. **VueX** : Refer to https://vuex.vuejs.org/ to understand Vuex
