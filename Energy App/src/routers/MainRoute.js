import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({
	layout: Layout,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		
		render={props =>
			(localStorage.getItem("auth-token") !== null && localStorage.getItem("auth-token") !== undefined) ?
				<Layout>
					<Component {...props} />
				</Layout>
				: (
					<Redirect to="/" />
				)
		}
	/>
);


export default (ProtectedRoute);
