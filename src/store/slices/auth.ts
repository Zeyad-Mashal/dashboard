import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { userLogin } from "../../services/auth.service";
import { IUser } from "../../types/index"

const user = JSON.parse(localStorage.getItem("user") as string);
const storedUser: string | null = localStorage.getItem('user');

export interface LoginUser {
  username: string;
  password: string;
}
//const parData:LoginUser = 

export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials:LoginUser, thunkAPI) => {
    try {
     
      const data = await userLogin(userCredentials.username,userCredentials.password);
    
      //aceestoken,profile
      //navigate('/dashboard');
      return { user: data };
    } catch (error: any) {  
      console.log(error.response.data.error)
     // const message = error.response.data.details[0].message;
     const message = error.response.data.error;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data.details[0].message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

interface AuthState {
  accessToken: string | undefined,
  user: IUser | null,
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) :null,
  accessToken: localStorage.getItem("accessToken") || undefined,
  isLoggedIn:false
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
  },
});
const { reducer } = authSlice;
export default reducer;

/*extraReducers: {

  [login.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
    state.isLoggedIn = true;
    state.user = action.payload.user;
  },
    [login.rejected.toString()]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
      [logout.fulfilled.toString()]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
},*/