import { SET_USER } from "../constants";

export default (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      const { users } = action;
      return users;
    default:
      return state;
  }
};
