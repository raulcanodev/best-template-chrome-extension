import "./Categories.css";
import React from "react";
import { useState, useEffect } from "react";

import { Table, Button, Form, Message } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrashCan,
	faPlus,
	faAngleLeft,
	faX,
} from "@fortawesome/free-solid-svg-icons";

export function Categories({ onCategoryClick }) {
	const [categories, setCategories] = useState({});
	const [showAddCategory, setShowAddCategory] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [onDeleteCategory, setOnDeleteCategory] = useState(false);

	const openCloseShowAddCategory = () => {
		setShowAddCategory(!showAddCategory);
	};

	const addCategoryToLocalStorage = () => {
		if (newCategory === "") return;
		if (newCategory in categories) return;
		const newCategories = { ...categories, [newCategory]: [] };
		localStorage.setItem("categories", JSON.stringify(newCategories));
		setCategories(newCategories);
		setNewCategory("");
		setShowAddCategory(false);
	};

	useEffect(() => {
		const savedCategories =
			JSON.parse(localStorage.getItem("categories")) || {};
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
								: `Categories ${
										Object.keys(categories).length
								  }/7`}
						</Table.HeaderCell>
						<div>
							<Button onClick={() => openCloseShowAddCategory()}>
								{showAddCategory ? (
									<FontAwesomeIcon icon={faAngleLeft} />
								) : (
									<FontAwesomeIcon icon={faPlus} />
								)}
							</Button>

							{!showAddCategory && (
								<Button
									onClick={() => {
										setOnDeleteCategory(!onDeleteCategory);
									}}>
									<FontAwesomeIcon icon={faTrashCan} />
								</Button>
							)}
						</div>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{/* Map Categories */}
					{!showAddCategory &&
						Object.keys(categories).map((category, index) => (
							<Table.Row key={index} className="map__categories">
								<Table.Cell
									className="table__category"
									onClick={() => onCategoryClick(category)}>
									{category}
								</Table.Cell>

								{/* Delete Category */}
								<Table.Cell>
									{onDeleteCategory && (
										<FontAwesomeIcon
											style={{ cursor: "pointer" }}
											onClick={() => {
												const {
													[category]: deletedCategory,
													...remainingCategories
												} = categories;
												localStorage.setItem(
													"categories",
													JSON.stringify(
														remainingCategories
													)
												);
												setCategories(
													remainingCategories
												);
											}}
											icon={faX}
											color="red"
											size="sm"
										/>
									)}
								</Table.Cell>
							</Table.Row>
						))}

					{Object.keys(categories).length >= 7 && showAddCategory && (
						<h3>You can't have more than 7 categories</h3>
					)}
					{Object.keys(categories).length < 7 && showAddCategory && (
						<Table.Row>
							<Table.Cell className="table__form">
								<Form.Input
									placeholder="Add Category"
									value={newCategory}
									onChange={(e) =>
										setNewCategory(e.target.value)
									}
									maxLength={24}
								/>
								<Button
									className="button__add-category"
									type="submit"
									onClick={() => {
										addCategoryToLocalStorage();
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
