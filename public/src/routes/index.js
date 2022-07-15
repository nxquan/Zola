import FrontLayout from '@/components/Layouts/FrontLayout';

import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import Home from '@/Pages/Home';
import Message from '@/Pages/Message';
import Contact from '@/Pages/Contact';
import Todo from '@/Pages/Todo';
import Diary from '@/Pages/Diary';
import Me from '@/Pages/Me';

const publicRoutes = [
	{ path: '/login', element: Login, layout: FrontLayout },
	{ path: '/register', element: Register, layout: FrontLayout },
	{ path: '/', element: Home },
	{ path: '/message', element: Message },
	{ path: '/contact', element: Contact },
	{ path: '/todo', element: Todo },
	{ path: '/diary', element: Diary },
	{ path: '/me', element: Me },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
