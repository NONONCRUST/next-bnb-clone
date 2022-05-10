import axios from "axios";

//* 파일 업로드 api
export const uploadFileAPI = (file: FormData) =>
  axios.post("/api/files/upload", file);
