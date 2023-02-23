import User from '../models/user';

class AuthService {
  async login(uid: string) {
    return User.find({ uid });
  }

  async signup(uid: string, user: any) {
    return User.create({
      ...user,
      uid,
    });
  }
}

export default new AuthService();
