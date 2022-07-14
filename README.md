
## Developer Notes

See original excercise description below. I am going to add a brief description of structure of the program and a list of changes compared to original excercise.

### Differences

1. Skeletons and boss have different models
2. Battle is triggered every time a hero moves into a monster's square or vice versa. The game does not wait for user input to resolve battle to avoid hero moving through monsters without a fight.
3. Monster collision - monsters will not be able to move into a square containing another monster.
4. When hero gains levels, DP and SP increase is drastically reduced, making higher levels more difficult.
5. Boss is more powerful in all stats.
6. Visual feedback: dead monsters leave behind bloodstains. Once the player obtains the key, the picture of a key is shown next to stats.
7. Description of victory conditions is displayed to the player, current status of boss and key conditon is shown. When player dies, alert 'You have died' is shown.

### Decription

#### Setup
 
 1. in variables.ts, instances of Monsters are created and pushed to monsterList. A list of wall coordinates is created.
 2. the **setup()** pushes additional walls to the list corresponding to map boundaries. Then it runs the **init()** method for each monster. A random Skeleton is given the key (this.hasKey=true).
 3. after assets load, **updateGameState()** is called to render them for the first time.

 #### Game loop

 
 


# Full Week Project: Wanderer - The RPG game

Build a hero based walking on tiles and killing monsters type of game. The hero
is controlled in a maze using the keyboard. Heroes and monsters have levels and
stats depending on their levels. The goal is reach the highest level by killing
the monsters holding the keys to the next level.

## Workshop: Plan your work

### 0. Fork this repository (under your user)

### 1. Clone the repository to your computer

#### How to launch the program

In the cloned repository:

- Run: `npm install` for initializing the modules

- Run: `npm start` for starting the development server,
and the automatic compilation

- Open `localhost:8080` in your browser

We provided an example for some necessary functionalities.

It contains:

- a big drawable canvas with one image painted on it
- and handling pressing keys, for moving your hero around
- be aware that these are just all the needed concepts put in one place
- you can separate anything anyhow

```typescript

'use strict';

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// This function runs after the images are loaded
window.onload = () => {
  // Drawing a floor tile
  const image = document.getElementById('floor') as HTMLImageElement;
  ctx.drawImage(image, 50, 50);

};

/* You only have to change the argument string in document.getElementById('floor')
 *
 * Possible images:
 * - floor
 * - wall
 * - hero-up
 * - hero-right
 * - hero-down
 * - hero-left
 * - boss
 * - skeleton
 */

// Function to handle the key press events
function onKeyPress(event: any) {
  // Handle arrow keys
  switch (event.keyCode) {
    case 37:
      alert('left');
      break;
    case 38:
      alert('up');
      break;
    case 39:
      alert('right');
      break;
    case 40:
      alert('down');
      break;
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);
```

### 3. Create a GitHub project

-create it under your repository for your work and add the [project stories](https://github.com/greenfox-academy/teaching-materials/blob/master/project/wanderer/stories.md).

### 4. Form groups and plan your application together

Plan your architecture. 
In your architecture you should consider the following components:

- Models

  - GameObject

    - Character

      - Monster

        - Hero
        - types

      - Area

      - Tile

        - EmptyTile
        - NotEmptyTile

- GameLogic

  - current hero
  - current area

- Main

  - handling events
  - current game

#### 5. Think about task breakdown in Kanban together

Now that you see the big picture, **go through the stories together** 
and think about how to break them down into tasks:

- To classes
- To methods
- To data and actions
- Extend the story cards with some of these points as a reminder

#### 6. Start working on your first task!
