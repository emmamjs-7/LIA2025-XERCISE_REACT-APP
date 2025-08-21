# XERCISE

/// This project was developed by:

- Angelica Norlander
- Emma Samuelsson
- Muayad Suleiman
- Viktor Thörn
- Viktoria Pakhrova

as a student project for XLENT Öst AB.

Supervised by:

- Gabriel Matsson, gabriel.matsson@xlent.se
- Lisa Green, lisa.green@xlent.se
- Martin Ljungqvist, martin.ljungqvist@xlent.se
- Samuel Karlsson, samuel.karlsson@xlent.se ///

<!-- Short summary about application -->

### About application

A webapplication where you can log workouts, follow workout trends and more features are planned.

## Content

-   Installation
-   Prerequisites
-   Technologies Used
-   Roadmap

## Installation

<!-- How to install this application, including version-specific dependencies and the reasons for using older versions -->

To install this web application run following command after cloning or downloading this project:

```
npm install --force
```

To start the application run:

```
npm start
```

Then open http://localhost:3000 in your browser.

**Note that you need to install and run the `XERCISE-api` backend for the app to work as intended**

---

### Dependency Notes

To enable Microsoft authentication in this project, we use the `@azure/msal-react` package. Since the library doesn't yet fully support React 19, we had to install it wirh the `--force` flag to bypass peer dependency warnings.

---

Application is currently using `@react-router-dom@6` package since other versions resulted in test failures, such as:

```
Cannot find module 'react-router-dom' from 'src/App.tsx'
```

While the current version works, it introduces the following runtime warning:

```
Warning: Relative route resolution within Splat routes is changing in v7.
```

This is a known issue and marked as **TODO** and will be fixed in the future.

---

<!-- Packages and tools required to run the application -->

### Prerequisites

Before running this project, make sure you have the following installed and available:

-   `XERCISE-api`
-   React 19
-   Typescript

### Technologies Used

This project makes use of the following key libraries and tools:

-   heroicons/react
-   react-calendar v5.1.0
-   react-datepicker v8.3.0
-   axios v1.8.4
-   react-router-dom@6
-   azure/msal-react v3.0.10
-   tailwindcss v3.4.17

---

## Roadmap

-   ✅ Log workout
-   ✅ Calendar View
-   ✅ User login
-   ⬜ Workout Summary
-   ⬜ Workout Statistics
