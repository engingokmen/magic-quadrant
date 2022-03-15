import styled from "styled-components";
import { PointClass } from "../../classes";
import { ItemsAction } from "../../reducers";

export const Row = ({
  item,
  dispatch,
}: {
  item: PointClass;
  dispatch: React.Dispatch<ItemsAction>;
}) => {
  const handleDeletePoint = (id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const handleChange = (e: any) => {
    dispatch({ type: "INPUT_CHANGE", payload: { id: item.id, e } });
  };

  return (
    <tr>
      <td>
        <div>
          <Input name="label" value={item.label} onChange={handleChange} />
        </div>
      </td>
      <td>
        <InputNumber
          type="number"
          min={0}
          max={100}
          name="x"
          value={item.x}
          onChange={handleChange}
        />
      </td>
      <td>
        <InputNumber
          type="number"
          min={0}
          max={100}
          name="y"
          value={item.y}
          onChange={handleChange}
        />
      </td>
      <td>
        <Button onClick={() => handleDeletePoint(item.id)}>Delete</Button>
      </td>
    </tr>
  );
};

const Button = styled.button`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`;

const InputNumber = styled(Input)``;
