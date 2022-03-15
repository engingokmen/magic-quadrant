import { useRef, Children, cloneElement } from "react";
import styled from "styled-components";
import { CHART_SIZE, COEFFICIENT } from "../../constants";

export const Chart = ({
  children,
  yLabel,
  xLabel,
}: {
  yLabel: string;
  xLabel: string;
  children: React.ReactElement | React.ReactElement[];
}) => {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <Flex>
      <YLabel>{yLabel}</YLabel>
      <div>
        <StyledChart ref={ref}>
          <XAxis />
          <YAxis />
          <Title>
            <Label>Challengers</Label>
            <Label>Leaders</Label>
          </Title>
          <Footer>
            <Label>Niche Players</Label>
            <Label>Visionaries</Label>
          </Footer>

          {Children.map(children, (child) => {
            return cloneElement(child, { ref });
          })}
        </StyledChart>
        <XLabel>{xLabel}</XLabel>
      </div>
    </Flex>
  );
};

const Title = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  margin: 6px 0;
`;

const Footer = styled(Title)`
  bottom: 0px;
`;

const Label = styled.div`
  border-radius: 4px;
  padding: 2px 6px;
  color: white;
  background-color: ${(props) => props.theme.LIGHT_BLUE};
`;

const Flex = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
`;

const YLabel = styled.span`
  transform-origin: left;
  transform: rotate(-90deg);
  position: absolute;
  left: -12px;
`;

const XLabel = styled.span`
  position: absolute;
`;

const StyledChart = styled.div`
  flex-shrink: 0;
  position: relative;
  border: 2px solid ${(props) => props.theme.DARK_GREY};
  width: ${COEFFICIENT * CHART_SIZE}px;
  height: ${COEFFICIENT * CHART_SIZE}px;
`;

const XAxis = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.LIGHT_GREY};
  position: absolute;
  top: ${(COEFFICIENT * CHART_SIZE) / 2}px;
`;

const YAxis = styled(XAxis)`
  width: 0;
  height: 100%;
  top: 0px;
  left: ${(COEFFICIENT * CHART_SIZE) / 2}px;
`;
