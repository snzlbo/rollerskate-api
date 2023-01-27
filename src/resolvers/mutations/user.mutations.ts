import { AuthServices } from '../../services'

const userMutations = {
  async login(_: any, args: any) {
    const { data } = args;
    const result = await AuthServices.login(data);

    console.log(result);
    
    return result;
  },

  async register(_: any, args: any) {
    const { data } = args;
    const result = await AuthServices.register(data);
    
    console.log(result);
    
    return result;
  }
}

export default userMutations;