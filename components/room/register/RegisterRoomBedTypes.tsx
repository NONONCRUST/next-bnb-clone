import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
import palette from "../../../styles/palette";
import { BedType } from "../../../types/room";
import Button from "../../common/Button";
import Selector from "../../common/Selector";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    width: 320px;
  }
  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }
`;

interface Props {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<Props> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);
  const [activeBedOptions, setActiveBedOptions] = useState<BedType[]>([]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activeBedOptions.includes(bedType));
  }, [activeBedOptions, bedroom]);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const toggleOpened = () => setOpened(!opened);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개
          </p>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && "완료"}
          {!opened &&
            (totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            type="register"
            options={lastBedOptions}
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            useValidation={false}
            onChange={(e) =>
              setActiveBedOptions([
                ...activeBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;
