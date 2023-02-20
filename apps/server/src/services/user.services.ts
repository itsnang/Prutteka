import User from '../models/user';

class UserService {
  async createUser(user: any, uid: string) {
    return User.create({
      ...user,
      uid,
    });
  }
}

export default new UserService();
