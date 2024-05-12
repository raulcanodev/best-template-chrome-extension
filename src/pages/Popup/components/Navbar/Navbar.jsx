import "./Navbar.css";
import React, { useState } from "react";
import { Checkbox } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
	// Estado para controlar el modo de la aplicación
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Función para alternar entre el modo oscuro y claro
	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		// Aquí puedes agregar lógica adicional para cambiar los estilos de tu aplicación
	};

	return (
		<>
			<nav className="nav__content">
				<div className="content__title">
					<FontAwesomeIcon icon={faOtter} size="2x" color="white" />
					<h2>Best Template</h2>
				</div>

				<div className="content__settings"></div>
			</nav>
		</>
	);
}
