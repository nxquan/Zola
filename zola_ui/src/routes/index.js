import FrontLayout from '@/layouts/FrontLayout';

import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import Chat from '@/Pages/Chat';

const publicRoutes = [
	{ path: '/login', element: Login, layout: FrontLayout },
	{ path: '/register', element: Register, layout: FrontLayout },
	{ path: '/', element: Chat },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
