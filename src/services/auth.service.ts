//import api from '../utils/index';
import config from '../utils/config';
import axios from "axios";  

export const userLogin = (username:string, password:string):Promise<any> => {
  // console.log(username)
    return axios
      .post(config.ADMIN_API + "/auth/admin", {
        username,
        password,
      })
      .then((response) => {
      
        if (response.data.access_token) {
          localStorage.setItem("accessToken", JSON.stringify(response.data.access_token));
          localStorage.setItem("user", JSON.stringify(response.data.profile));
        }
        return response.data;
      });
  };

  //export default userLogin;

 export  const logout = (): void => {
    localStorage.removeItem('user');
  };