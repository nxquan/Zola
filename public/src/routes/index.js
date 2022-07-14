import FrontLayout from '@/components/Layouts/FrontLayout';

import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import Home from '@/Pages/Home';
import Message from '@/Pages/Message';

const publicRoutes = [
	{ path: '/register', element: Register, layout: FrontLayout },
	{ path: '/home', element: Home },
	{ path: '/message', element: Message },
	{ path: '/', element: Login, layout: FrontLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
