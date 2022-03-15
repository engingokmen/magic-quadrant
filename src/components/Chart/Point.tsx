import { forwardRef, useState } from "react";
import styled from "styled-components";
import { PointClass } from "../../classes";
import { theme } from "../../constants";
import { ItemsAction } from "../../reducers";
import { CHART_SIZE, COEFFICIENT } from "../../constants";

type Props = {
  item: PointClass;
  dispatch: React.Dispatch<ItemsAction>;
  ref: any;
};
export const Point = forwardRef((props: Props, ref: any) => {
  const [isStarted, setStarted] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setStarted(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.MouseEvent) => {
    e.preventDefault();
    const bounding = ref.current.getBoundingClientRect();
    const { x, y, width, height } = bounding;

    // boundary check for quadrant area
    if (
      isStarted &&
      e.clientX > x &&
      e.clientX < width + x &&
      e.clientY > y &&
      e.clientY < height + y
    ) {
      props.dispatch({
        type: "DRAG_CHANGE",
        payload: { id: props.item.id, e, bounding },
      });
    }
  };

  const handlePointerLeave = () => {
    setStarted(false);
  };

  return (
    <>
      <StyledPoint
        size={15}
        x={props.item.x}
        y={props.item.y}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerLeave}
      >
        <StyledLabel>{props.item.label}</StyledLabel>
      </StyledPoint>
    </>
  );
});

interface StyledPointProps {
  size: number;
  x: number;
  y: number;
  style: object;
  theme: typeof theme;
}

const StyledPoint = styled.div.attrs(
  ({ size = 15, x, y, theme }: StyledPointProps) => ({
    style: {
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "100%",
      backgroundColor: theme.DARK_BLUE,
      transform: `translate(
            ${COEFFICIENT * x - size / 2}px,
            ${COEFFICIENT * (CHART_SIZE - y) - size / 2}px
          )`,
    },
    size,
    x,
    y,
  })
)``;

const StyledLabel = styled.label`
  font-size: 13px;
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  font-family: sans-serif;
  color: ${(props) => props.theme.DARK_BLUE};
`;
