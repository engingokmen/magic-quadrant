import { useReducer, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Chart, Point, Table } from "./components";
import { theme } from "./constants";
import { initialState, itemsReducer } from "./reducers";

export const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, initialState);

  // recording items to localstorage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Chart xLabel="Completeness of vision ➞" yLabel="Ability to execute ➞">
          {items.map((i: any) => (
            <Point key={i.id} item={i} dispatch={dispatch} />
          ))}
        </Chart>
        <Table items={items} dispatch={dispatch} />
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
  }
  #root {
    margin-top:100px;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:flex-start;
    gap:40px;
  }
`;
