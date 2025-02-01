const appContextReducer = (state, action) => {
  switch (action.type) {
    case "aaaaaa":
      return { ...state, showModalExpiredSesion: action.payload };
    default:
      return state;
  }
};

export default appContextReducer;
