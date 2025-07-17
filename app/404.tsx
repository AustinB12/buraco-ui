import { NavLink } from "react-router";

const NotFoundPage: React.FC = () => {
	return (
		<main>
			<section className="main-container">
				<h1 className="header-text">404 Page Not Found</h1>
				<NavLink to="/">Go back to Home</NavLink>
			</section>
		</main>
	);
};

export default NotFoundPage;
