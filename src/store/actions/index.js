import { SET_USER } from "../constants";

export function setUser(users) {
  const action = {
    type: SET_USER,
    users
  };
  return action;
}
