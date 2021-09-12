/* /store/action/process.js */
//리듀서
export const ProcessReducer = (state={}, action) => {
  switch(action.type){
    case "PROCESS":
      return {...action.payload};
    default:
      return state;
  }
};