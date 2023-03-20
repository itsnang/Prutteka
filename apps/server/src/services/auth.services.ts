import User from '../models/user';

class AuthService {
  async login(uid: string): Promise<any> {
    return User.findOne({ uid });
  }

  async signup(uid: string, user: any): Promise<any> {
    const { email } = user;

    return User.create({
      email,
      uid,
    });
  }
}

export default new AuthService();
