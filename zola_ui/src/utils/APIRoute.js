export const host = 'http://localhost:5000';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;

export const getInformationUserRoute = `${host}/api/user/:phone`;
export const updateInformationUserRoute = `${host}/api/user/update-information`;
export const getFriendsRoute = `${host}/api/user/get-friends`;
export const uploadAvatar = `${host}/api/user/upload-profile-image`;
export const searchUserRoute = `${host}/api/user/searchUsers`;

export const addMessage = `${host}/api/message/add-message`;
export const getAllMessages = `${host}/api/message/get-all-messages`;
export const uploadImage = `${host}/api/message/upload-image`;
export const uploadFile = `${host}/api/message/upload-file`;
