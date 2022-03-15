import styled from "styled-components";
import { Row } from "./Row";
import { PointClass } from "../../classes";
import { ItemsAction } from "../../reducers";

export const Table = ({
  items,
  dispatch,
}: {
  items: Array<PointClass>;
  dispatch: React.Dispatch<ItemsAction>;
}) => {
  const handleAddPoint = () => {
    dispatch({ type: "ADD" });
  };

  return (
    <StyledTableWrapper>
      <button onClick={handleAddPoint}>Add</button>
      <StyledTable>
        <thead>
          <tr>
            <Th2>Label</Th2>
            <Th>Vision</Th>
            <Th>Ability</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <Row key={i.id} item={i} dispatch={dispatch} />
          ))}
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
  );
};

const StyledTableWrapper = styled.div`
  width: 520px;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const Th = styled.th`
  color: white;
  background-color: ${(props) => props.theme.LIGHT_BLUE};
`;

const Th2 = styled(Th)`
  width: 200px;
`;
