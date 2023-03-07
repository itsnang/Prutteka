import User from '../models/user';

class AuthService {
  async login(uid: string): Promise<any> {
    return User.findOne({ uid });
  }

  async signup(uid: string, user: any): Promise<any> {
    return User.create({
      ...user,
      uid,
    });
  }
}

export default new AuthService();
