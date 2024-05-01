import React from "react";
// import Greetings from "../../containers/Greetings/Greetings";
import { useState } from "react";
import { Navbar, Categories, AllNotesByCategory } from "./components";

const Popup = () => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		console.log("Click on category: ", selectedCategory);
	};

	const handleBackClick = () => {
		setSelectedCategory("");
	};

	return (
		<>
			<div className="main__content">
				<Navbar />
				{!selectedCategory && (
					<Categories onCategoryClick={handleCategoryClick} />
				)}
				{selectedCategory && (
					<AllNotesByCategory
						goBackClick={handleBackClick}
						category={selectedCategory}
					/>
				)}
			</div>
		</>
	);
};

export default Popup;
