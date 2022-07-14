import FrontLayout from '@/components/Layouts/FrontLayout';

import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import Home from '@/Pages/Home';
import Message from '@/Pages/Message';

const publicRoutes = [
	{ path: '/register', element: Register, layout: FrontLayout },
	{ path: '/', element: Home },
	{ path: '/message', element: Message },
	{ path: '/login', element: Login, layout: FrontLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
