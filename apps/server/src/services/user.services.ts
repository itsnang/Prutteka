import User from '../models/user';

class UserService {
  async getUserByUid(uid: string) {
    return User.findOne({ uid });
  }
}

export default new UserService();
