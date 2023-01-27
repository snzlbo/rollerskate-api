const userQueries = {
  /**
   * Return users
   * @param args dunno for now
   * @returns Users
   */
  async users(_: any, args: any) {
    console.log(args);
    return [];
  },
  /**
   * Return user details with specified user id
   * @param args dunno for now
   * @returns User details
   */
  async userDetails(args: any) {
    // console.log(args);
    return {};
  }
}

export default userQueries;