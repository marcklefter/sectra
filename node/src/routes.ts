import express from 'express';

import * as userService from './userService';

// ...

const routes = express.Router();

// routes.get('/:userId', async (req, res) => {
//   try {
//     const user = await userService.findUser(+req.params.userId);
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

routes.get('/:userId', async (req, res) => {
  const userId = +req.params.userId;

  try {
    const [
      user,
      todos
    ] = await Promise.all([
      userService.findUser(userId),
      userService.findTodos(userId)
    ]);
    
    user.todos = todos;

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export { routes };