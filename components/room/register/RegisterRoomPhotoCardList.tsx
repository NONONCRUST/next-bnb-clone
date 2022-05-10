import React from "react";
import styled from "styled-components";
import PencilIcon from "../../../public/static/svg/register/photo/pencil.svg";
import TrashCanIcon from "../../../public/static/svg/register/photo/trash_can.svg";

const Container = styled.ul`
  width: 858px;
  margin: auto;
  .register-room-first-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: 0 auto 24px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .register-room-photo-interaction-butons {
        display: flex;
      }
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }

  .register-room-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }
`;

interface Props {
  photos: string[];
}

const RegisterRoomPhotoCardList: React.FC<Props> = ({ photos }) => {
  console.log(photos);

  return (
    <Container>
      {photos.map((photo: any, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-room-first-photo-wrapper">
              <img src={photo.Location} alt="" />
              <div className="register-room-photo-interaction-butons">
                <button type="button" onClick={() => {}}>
                  <PencilIcon />
                </button>
                <button type="button" onClick={() => {}}>
                  <TrashCanIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default RegisterRoomPhotoCardList;
