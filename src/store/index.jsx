import { createStore, combineReducers } from 'redux';


const initialState = {
  users: []
};

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';


export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: state.users.length + 1 }]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        )
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  userState: userReducer
});


const store = createStore(rootReducer);

export default store;
