## Week 5 | Client Side App | 2048 Game |

Contributors: [Niete](https://github.com/Psydwinder) and [Laura](https://github.com/LauraK0)

### Welcome to 2048!

This is a client side app made using React and depolyed to Netlify.

Play [here](https://week5-niete-laura.netlify.app)!

## Setup
Make sure you have Git and Node (v18) installed.

Clone this repo and `cd` into the directory

Run `npm install` to install all the dependencies

Run `npm run dev` to run the project

## Testing

We currently have no tests set up. 

## 1. What is the 2048 game?
You can play the game using the arrow keys on your keyboard. 

2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys. Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move.

The game is won when a tile with a value of 2048 appears on the board. Players can continue beyond that to reach higher scores. When the player has no legal moves (there are no empty spaces and no adjacent tiles with the same value), the game ends.

## Acceptance Criteria 

- [ ] Accept at least 2 kinds of user input
- [X] Have some form of persistent state and interactivity, e.g.
- [ ] Countdown timer
- [X] Score tracker
- [ ] Previous guesses

### Stretch criteria 
- [ ] Save your state to localstorage so you can leave the page and come back later
- [X] Make it look great
