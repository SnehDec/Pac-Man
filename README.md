# Pac-Man
A modified version of the arcade game Pac-Man

# The Game
In this version of the Pac-Man game, we start with four ghosts in the first level and after every two levels, an additional ghost is added to the game. The maximum number of ghosts is 8. Pac-Man has three lives per game.
The maze that the ghosts and Pac-Man move around in is randomly-generated each time the page loads. So, for every new game/refresh, the maze changes.
The code files contain detailed comments on the code itself. 

# Notes
This game is programmed for a full computer screen and has fixed pixel values with the assumption that the screen is large enough to accomodate all the elements. This can be modified by updating the move() function in game.js, the maze.size attribute in modified.js, and the CSS file. 

Also, I've not added audio/sound effects to this game as I personally do not like arcade game sound effects. This makes it flexible for you to add your own custom sound effects to the game if you so wish.

# Credit 
I modified Conor Bailey's maze generation file to generate the maze for this game. I also modified William Fiset's breadth-first search algorithm from his YouTube tutorial. 

Conor Bailey's maze generation program: https://github.com/conorbailey90/Javascript-DFS-Maze

William Fiset's algorithm video: https://www.youtube.com/watch?v=oDqjPvD54Ss 

