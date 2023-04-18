import User from '../models/user';

class AuthService {
  async login(uid: string): Promise<any> {
    return User.findOne({ uid });
  }

  async signup(uid: string, user: any): Promise<any> {
    const { email, display_name } = user;

    return User.create({
      email,
      display_name,
      uid,
    });
  }
}

export default new AuthService();
