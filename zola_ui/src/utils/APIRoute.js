export const host = 'http://localhost:5000';
export const authHost = 'http://localhost:5500';

export const registerRoute = `${authHost}/api/auth/register`;
export const loginRoute = `${authHost}/api/auth/login`;

export const getInformationUserRoute = `${host}/api/user/:phone`;
export const updateInformationUserRoute = `${host}/api/user/update-information`;
export const getFriendsRoute = `${host}/api/user/get-friends`;
export const uploadAvatarRoute = `${host}/api/user/upload-profile-image`;
export const searchUserRoute = `${host}/api/user/search-users`;
export const addFriendRoute = `${host}/api/user/add-friend`;

export const getAllMessagesRoute = `${host}/api/message/get-all-messages`;
export const getLatestMessageRoute = `${host}/api/message/get-latest-message`;

export const addMessageRoute = `${host}/api/message/add-message`;
export const addInteractiveMessageRoute = `${host}/api/message/add-interactive`;
export const uploadImageRoute = `${host}/api/message/upload-image`;
export const uploadFileRoute = `${host}/api/message/upload-file`;
