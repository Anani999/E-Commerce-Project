import User from '../models/user.js';

async function createUser(email, password, username, name) {
  const user  = await User.create({
   email, password, username, name
  });
  return user;
};

export  {createUser};
