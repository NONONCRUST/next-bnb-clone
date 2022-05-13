import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

  //* 숙소 유형
  const isBuildingTypeActive = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } =
      registerRoom;

    if (
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      isSetUpForGuest === null
    ) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 종류
  const isRoomTypeActive = useMemo(() => {
    const { maximumGuestCount, bedroomCount, bedCount, bedList } = registerRoom;

    if (
      !isBuildingTypeActive ||
      !maximumGuestCount ||
      !bedroomCount ||
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  //* 욕실 항목
  const isBathroomActive = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActive || !bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  //* 위치 항목
  const isLocationActive = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;
    if (
      !isBathroomActive ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !detailAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  //* 편의시설
  const isAmentitiesActive = useMemo(() => {
    if (!isLocationActive) {
      return false;
    }
    return true;
  }, []);

  //* 공용 공간
  const isConviniencesActive = useMemo(() => {
    if (!isAmentitiesActive) {
      return false;
    }
    return true;
  }, []);

  //* 사진 항목
  const isPhotoActive = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConviniencesActive || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 설명
  const isDescriptionActive = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActive || !description) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 제목
  const isTitleActive = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActive || !title) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 금액
  const isPriceActive = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActive || !price) {
      return false;
    }
    return true;
  }, []);

  //* 예약 날짜
  const isDateActive = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActive || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  //* 진행 중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActive) {
      return "building";
    }
    if (!isRoomTypeActive) {
      return "bedrooms";
    }
    if (!isBathroomActive) {
      return "bathroom";
    }
    if (!isLocationActive) {
      return "location";
    }
    if (!isAmentitiesActive) {
      return "amentities";
    }
    if (!isConviniencesActive) {
      return "conviniences";
    }
    if (!isPhotoActive) {
      return "photo";
    }
    if (!isDescriptionActive) {
      return "description";
    }
    if (!isTitleActive) {
      return "title";
    }
    if (!isPriceActive) {
      return "price";
    }
    if (!isDateActive) {
      return "date";
    }
    return "";
  }, []);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActive}
          inProgress={stepInProgress === "building"}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActive}
          inProgress={stepInProgress === "bedrooms"}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActive}
          inProgress={stepInProgress === "bathroom"}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActive}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amentities"
          disabled={!isAmentitiesActive}
          inProgress={stepInProgress === "amentities"}
        />
        <RegisterRoomCheckStep
          step="공용 공간"
          href="/room/register/conviniences"
          disabled={!isConviniencesActive}
          inProgress={stepInProgress === "conviniences"}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActive}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActive}
          inProgress={stepInProgress === "description"}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActive}
          inProgress={stepInProgress === "title"}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActive}
          inProgress={stepInProgress === "price"}
        />
        <RegisterRoomCheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActive}
          inProgress={stepInProgress === "date"}
        />
      </ul>
      {isDateActive ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomChecklist;
