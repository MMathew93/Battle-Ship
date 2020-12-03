# battle-ship
This is another project right from the Odin Project. This focused a lot on test driven development and
additional practice using the Vue framework. Users are able to drag pieces to place them on the board, as well as rotate pieces.
In addition users can select randomize and the board will assist with random placement of pieces. The computer board is randomized every
reload or when the user wins. In addition the AI is set to seek out the users ships when a hit is scored, improving difficulty against the cpu.
Overall a fun project, and a fun delve into learning additional data for AI.


## Tech/framework used
Vue 2  
Javascript  


## Hosted Demo
[Hosted on Heroku](https://battle-ship-odin.herokuapp.com/)!

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Current Bugs
```
If user wants to be cheeky and stack pieces after they have placed ships in a valid location, game will start, however User will only have valid ships from largest to smallest prior to invalid stack attempt. 

If user does an invalid rotation then starts game, boar will be saved in previous location prior to rotation.

Randomizing board, then if user moves a piece wipes board and blanks it out
```