import { PointClass } from "../classes";
import { CHART_SIZE, COEFFICIENT } from "../constants";

export interface ItemsAction {
  type: string;
  payload?: any;
}

const items = localStorage.getItem("items") || "[]";
const initialData = JSON.parse(items);
export const initialState: Array<PointClass> = initialData;

export const itemsReducer = (state: Array<PointClass>, action: ItemsAction) => {
  switch (action.type) {
    case "INITIALIZE": {
      return action.payload;
    }
    case "ADD": {
      const uniqueId = "id" + new Date().getTime();
      return [...state, new PointClass("New", 50, 50, uniqueId)];
    }
    case "DRAG_CHANGE": {
      const { id, e, bounding } = action.payload;

      // find related item
      const index = state.findIndex((j) => j.id === id);
      const found = state[index];
      // set new x and y
      const newItem = {
        ...found,
        x: Number(((e.clientX - bounding.x) / COEFFICIENT).toFixed(2)),
        y: Number(
          (CHART_SIZE - (e.clientY - bounding.y) / COEFFICIENT).toFixed(2)
        ),
      };
      // delete old item and add the new one
      const newItems = [...state];
      newItems.splice(index, 1, newItem);
      return newItems;
    }
    case "INPUT_CHANGE": {
      const { id, e } = action.payload;
      const key = e.target.name;
      const newValue = e.target.value;

      const newItems = state.map((i) => {
        const newItem: PointClass = { ...i };
        if (i.id === id) {
          // set new id or x or y
          newItem[key] = newValue;
        }
        return newItem;
      });
      return newItems;
    }
    case "DELETE": {
      return state.filter((item) => item.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};
