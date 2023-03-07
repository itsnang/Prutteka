import User, { UserType } from '../models/user';

class UserService {
  async getUserByUid(uid: string): Promise<UserType | null> {
    return User.findOne({ uid });
  }
}

export default new UserService();
