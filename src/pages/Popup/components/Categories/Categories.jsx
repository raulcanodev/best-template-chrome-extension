import "./Categories.css";
import React from "react";
import { useState, useEffect } from "react";

import { Table, Button, Form, Message } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function Categories({ onCategoryClick }) {
	const [categories, setCategories] = useState([]);
	const [showAddCategory, setShowAddCategory] = useState(false);
	const [newCategory, setNewCategory] = useState("");

	const openCloseShowAddCategory = () => {
		setShowAddCategory(!showAddCategory);
	};

	const AddCategoryToLocalStorage = () => {
		const newCategories = [...categories, newCategory];
		localStorage.setItem("categories", JSON.stringify(newCategories));
		setCategories(newCategories);
		setNewCategory("");
		setShowAddCategory(false);
	};

	useEffect(() => {
		const savedCategories =
			JSON.parse(localStorage.getItem("categories")) || [];
		setCategories(savedCategories);
	}, []);

	return (
		<>
			<Table>
				<Table.Header>
					<Table.Row className="table__header">
						<Table.HeaderCell>
							{categories.length === 0
								? "Empty"
								: `Categories ${categories.length}/7`}
						</Table.HeaderCell>
						<Button onClick={() => openCloseShowAddCategory()}>
							{showAddCategory ? "Close" : "Add Category"}
						</Button>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{!showAddCategory &&
						categories.map((category, index) => (
							<Table.Row
								key={index}
								onClick={() => onCategoryClick(category)}
								className="map__categories">
								<Table.Cell>{category}</Table.Cell>
								<Table.Cell>
									{/* Delete Category */}
									<FontAwesomeIcon
										onClick={() => {
											const newCategories =
												categories.filter(
													(cat) => cat !== category
												);
											localStorage.setItem(
												"categories",
												JSON.stringify(newCategories)
											);
											setCategories(newCategories);
										}}
										icon={faTrashCan}
									/>
								</Table.Cell>
							</Table.Row>
						))}

					{categories.length >= 7 && showAddCategory && (
						<h3>You can't have more than 7 categories</h3>
					)}
					{categories.length < 7 && showAddCategory && (
						<Table.Row>
							<Table.Cell className="table__form">
								<Form.Input
									placeholder="Add Category"
									value={newCategory}
									onChange={(e) =>
										setNewCategory(e.target.value)
									}
								/>
								<Button
									type="submit"
									onClick={() => {
										AddCategoryToLocalStorage();
									}}>
									Add
								</Button>
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>
		</>
	);
}
