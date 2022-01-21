import axios from ".";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

// 회원가입
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

// 로그인
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/login", body);

// 쿠키의 access_token의 유저 정보
export const meAPI = () => axios.get("/api/auth/me");

// 로그아웃
export const logoutAPI = () => axios.delete("/api/auth/logout");
