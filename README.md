# 🚀 NOMOKO Code Challenge

Deployed at: https://zealous-ptolemy-a69c8c.netlify.app/

## Overview

### Thought Process

Based on the requirements provided in the email, the goal was to create a map visualization with markers on the map, according to some data in a CSV file.
The user can filter according to a few properties and click on the marker to retrieve infromation about that property.
Technologies mentioned were React, Webpack, Sass and Node.JS.

Starting point is to choose a bootstrap, and the options were Create-React-App or a SSR Framework. Since the tech team informed me they use Gatsby for the Nomoko Website I decided to go for it, some things are simpler than CRA and other more complex. In this case since we are serving a static page with data loaded from a CSV file, Gatsby was convenient for those.

The starter project was a blank Gatsby starter. The libraries I straight away added were Typescript, Eslint, Jest and Gatsby Plugins for CSV file parsing. I used Pigeon Maps for the map engine in the past, and once again I implemented it, although there are quite a few alternatives.
Down the road I added react-icons for icons, react-use-form for parsing the filter form and react-motion for animation.

### Extras

A comparison functionality was added, because of the extra screen real state on desktop. That was later ported to mobile as well, as well as the whole UI.

### Styling

One library I definitely love is Styled Components, but for this project I decided to give SCSS + CSS Modules a shot, mostly because we talked about that in the first interview. Now that the task is finished and I had time to experiment with SCSS + CSS Modules, I honestly think Styled Components has a better syntax and the code looks cleaner, specially when dealing with prop dependant styling.

### State Management

I'm very experienced with Redux, but based on the first interview I implemented a no-Redux approach using React Context API and useReducer hook.
Works very similarly, some people don't like Redux because of its boilerplate but I'm so used to it I don't even bother, I've already gave some trainings inthe past about Redux + Thunk + ImmerJS.

ImmerJS is such a handy lib that I also used it here, allows you to simulate a state mutation instead of having to return a whole new state object full of spreads, code is nasty that way.

### Localization

The React-Intl library allows the whole application to be localized. For this test, only german was used, but several languages are supported as long as you provide the messages dictionary for each of them.

## Running the project

Clone, run `npm install` and then `gatsby develop`, that will start a local development server on localhost:8000.

The deployed version is the last commit on master, Netlify builds and deploys automatically on every commit, so they should match.

### Notes

This way of loading data (CSV File at build time), is far from ideal, imagine you had a CSV File with thousand of lines, page would crash or consume all memory available. A Rest/GraphQL API would be much better but I thought it was outside of the scope.

Notice no component library was used, I've used Material UI and AntDesign in the past, but wanted to keep it simple while showing I know how to build components from scratch.

In summary, things I would have implemented if I had more time:

- Backend API
- Storybooks
- Integration Tests (spent a couple hours trying to do it with Context, I've only worked previously with Redux tests)
