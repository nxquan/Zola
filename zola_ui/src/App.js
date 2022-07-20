import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '@/routes';
import MainLayout from '@/layouts/MainLayout';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					{publicRoutes.map((item, index) => {
						let Layout;
						let Page;
						if (item.layout) {
							Layout = item.layout;
						} else {
							Layout = MainLayout;
						}
						Page = item.element;
						return (
							<Route
								key={index}
								path={item.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
