import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/Pages/Login';
import RegisterPage from '@/Pages/Register';
import ChatPage from '@/Pages/Chat';

const publicRoutes = [
	{ path: '/login', element: LoginPage, layout: FrontLayout },
	{ path: '/register', element: RegisterPage, layout: FrontLayout },
	{ path: '/', element: ChatPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
