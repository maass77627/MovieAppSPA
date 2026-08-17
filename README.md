# Harry Potter House Points App

A Harry Potter-themed single-page application for exploring Hogwarts characters, assigning points, tracking assignments, and comparing House performance.

The app was built to practice **JavaScript object-oriented programming, API integration, DOM manipulation, localStorage, and dynamic UI updates**.

## Features

* View Hogwarts characters and their Houses
* Display character information and images
* Assign and remove House points
* Track individual character scores
* Track House totals
* Display House point leaders
* Create and track assignments
* Persist character data using `localStorage`
* Interactive hover effects and UI feedback
* Timer functionality
* Dynamically update the page without reloading
* Handle API data and transform it into application objects

## Technologies

* JavaScript
* HTML5
* CSS3
* REST API
* Fetch API
* LocalStorage
* Object-Oriented JavaScript
* ES6 Classes
* JavaScript inheritance and prototypes

## Object-Oriented Programming

The application uses JavaScript classes to organize the application's data and behavior.

### Character

The `Character` class represents individual Hogwarts characters.

Character objects contain information such as:

* Name
* Nickname
* House
* Image
* Points
* Assignments

Character methods are responsible for functionality such as adding points and updating character data.

### House

The `House` class manages House-level information and scoring.

It can be used to calculate:

* Total House points
* Character scores
* Highest-scoring characters
* House performance

The application uses JavaScript methods and array operations such as `reduce()`, `filter()`, and `sort()` to calculate these values dynamically.

### Inheritance

The application also provides an opportunity to practice JavaScript inheritance and the `super` keyword by allowing specialized classes to inherit functionality from a base class.

This demonstrates how shared behavior can be placed in a parent class instead of being duplicated across multiple classes.

## Data Persistence

Character scoring information is stored in the browser using `localStorage`.

This means that when the page is refreshed, previously saved character information can be restored instead of starting from zero.

Example data that can be persisted includes:

```javascript
{
  points: 25,
  assignments: []
}
```

## API Integration

Character information is retrieved from an external Harry Potter API using the Fetch API.

The application then transforms the API response into JavaScript objects that can be used throughout the application.

The general data flow is:

```text
API
 ↓
fetch()
 ↓
Character objects
 ↓
Application state
 ↓
DOM
 ↓
User interaction
 ↓
Updated state
 ↓
localStorage
```

## How It Works

1. The application fetches character data from the API.
2. Character data is converted into `Character` objects.
3. Characters are displayed dynamically on the page.
4. Users can interact with characters and assign points.
5. Character scores are saved to `localStorage`.
6. House totals are calculated from character scores.
7. House leaders are determined from the current scores.
8. The UI is updated to reflect the latest application state.

## Project Structure

```text
harry-potter-app/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    └── images/
```

## Running the Project

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd harry-potter-app
```

Open the application using a local development server such as VS Code's Live Server extension.

## What I Practiced

This project helped me practice several core JavaScript concepts:

* Classes
* Constructors
* Static properties
* Instance methods
* Prototypes
* Inheritance
* `super`
* Arrays and objects
* `map()`
* `filter()`
* `reduce()`
* `sort()`
* Fetch API
* Promises
* Async operations
* DOM manipulation
* Event listeners
* LocalStorage
* JSON parsing/stringifying
* Dynamic rendering
* Error handling

## Future Improvements

Possible future improvements include:

* Add React as the frontend framework
* Introduce Redux for centralized state management
* Add React Router for multiple views
* Add authentication
* Add a backend database
* Add a leaderboard
* Add more detailed House statistics
* Add animations for point changes
* Add search and filtering
* Add tests
* Improve accessibility and responsive design

## Purpose

This project was created as a hands-on JavaScript project to strengthen my understanding of **object-oriented programming, application state, API integration, and dynamic frontend development**.

It also serves as a portfolio project demonstrating the ability to take external data and build an interactive application around it.
