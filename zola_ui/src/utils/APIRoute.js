const host = 'http://localhost:5000';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;

export const getInformationUser = `${host}/api/user/:phone`;
export const getFriendsRoute = `${host}/api/user/get-friends`;

export const addMessage = `${host}/api/message/add-message`;
export const getAllMessages = `${host}/api/message/get-all-messages`;
