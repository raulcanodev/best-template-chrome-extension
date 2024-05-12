import React from "react";
// import Greetings from "../../containers/Greetings/Greetings";
import { useState } from "react";
import { Navbar, Categories, AllNotesByCategory } from "./components";

// Dear programmer:
// When I wrote this code, only god and
// I knew how it worked.
// Now, only god knows it!

// Therefore, if you are trying to optimize this routine
// and it fails (most surely),
// please increase this counter as a
// warning for the next person:

//total_hours_wasted_here = 25

const Popup = () => {
	const [selectedCategory, setSelectedCategory] = useState("");

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const handleBackClick = () => {
		setSelectedCategory("");
	};

	return (
		<>
			<div className="main__content" data-theme="dark">
				<Navbar />
				{!selectedCategory && (
					<Categories onCategoryClick={handleCategoryClick} />
				)}
				{selectedCategory && (
					<AllNotesByCategory
						goBackClick={handleBackClick}
						category={selectedCategory}
						onCategoryClick={handleCategoryClick}
					/>
				)}
			</div>
		</>
	);
};

export default Popup;
