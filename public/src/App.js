import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '@/routes';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

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
							Layout = DefaultLayout;
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
