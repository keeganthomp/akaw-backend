import models from '../models';
const { User } = models


export const createUser = async () => {
  await User.create(
    {
      username: 'rwieruch',
    },
  );
};