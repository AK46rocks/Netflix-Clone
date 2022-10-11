export const incrementVal = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrementVal = () => {
  return {
    type: "DECREMENT",
  };
};

export const addList = (list) => {
  return {
    type: "ADD_LIST",
    payload: list,
  };
};
export const updateList = (list) => {
  return {
    type: "UPDATE_LIST",
    payload: list,
  };
};
export const deleteItemFromList = (list) => {
  return {
    type: "DELETE_FROM_LIST",
    payload: list,
  };
};
