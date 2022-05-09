import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

// window 객체를 사용하기 위해 서버 사이드 렌더링을 하지 않고 다이나믹 임포트
const RegisterRoomGeometry = dynamic(
  import("../../../components/room/register/RegisterRoomGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
