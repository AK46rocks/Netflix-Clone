let intitalState = {
  myList: Array,
};
const movieLocalStorage = (state = intitalState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return (state += 1);
    case "DECREMENT":
      return (state -= 1);
    case "UPDATE_LIST":
      return { ...state, myList: [...state.myList, action.payload] };
    case "ADD_LIST":
      return { ...state, myList: action.payload };
    case "DELETE_FROM_LIST":
      return {
        ...state,
        myList: action.payload,
      };
    default:
      return state;
  }
};

export default movieLocalStorage;
