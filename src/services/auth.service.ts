import { UserModel } from '../models';

export default {
  /**
   * Login user
   * @param data should include username or email with password
   * @returns newly generated token
   */
  async login(data: any) {
    console.log(data);

    // await loginValidators
    const currentUser: any = await UserModel.findOne({ email: data.email });

    if (!currentUser)
      throw new Error('Invalid email or password!');

    const isValid = await currentUser.isPasswordMatch(data.password);
      
    if (!isValid)
      throw new Error('Invalid email or password!');

    return await currentUser.generateAuthtoken();
  },

  /**
   * Register user
   * @param data user details to create new
   * @returns created user
   */
  async register(data: any) {
    // await registerValidators

    let user = await UserModel.findOne({ email: data.email });

    if (user)
      throw new Error('User already exists!');

    return await UserModel.create(data);
  }
}