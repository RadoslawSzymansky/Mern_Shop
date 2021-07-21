class UsersController {
    greetUser(req, res) {
      const user = req.body.username;
      res.send(`Hello ${user}`);
    }
  
    async signup(req, res) {
      try {
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  export default UsersController;