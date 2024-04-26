import "./Navbar.css";
import React from "react";
import { Checkbox, Segment, Radio } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faGear,
	faNoteSticky,
	faClipboard,
	faOtter,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
	return (
		<>
			<nav className="nav__content">
				<div className="content__title">
					<FontAwesomeIcon icon={faOtter} size="2x" color="white" />
					<h2>Best Template</h2>
				</div>

				<div className="content__settings">
					<FontAwesomeIcon icon={faGear} size="lg" color="white" />
				</div>
			</nav>
		</>
	);
}
