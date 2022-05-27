import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './myRoutes';

axios.defaults.baseURL = 'https://ellskerwebsite.herokuapp.com/api/';

const App = () => {
	return (
		<BrowserRouter>
			<MyRoutes />
		</BrowserRouter>
	);
};
export default App;
