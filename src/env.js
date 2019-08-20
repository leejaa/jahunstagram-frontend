const IS_DEV = false;

export const BACKEND_URL = IS_DEV ? "http://localhost:4000" : "https://jahunstagram-backend.herokuapp.com";
export const SOCKET_URL = IS_DEV ? "ws://localhost:4000" : "wss://jahunstagram-backend.herokuapp.com";

export const LOG = true;
export const CLIENT_ID = "6197d390a2058101158c2b515da0ac92"