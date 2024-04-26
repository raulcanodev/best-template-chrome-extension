import React from "react";
import "./AllNotesByCategory.css";
import { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { FormAddNewTemplate } from "../../components";

export function AllNotesByCategory({ category, goBackClick }) {
	const [templates, setTemplates] = useState([]);
	const [showAddTemplate, setShowAddTemplate] = useState(false);

	const openCloseShowTemplate = () => {
		setShowAddTemplate(!showAddTemplate);
	};

	const handleAddNewTemplate = () => {
		console.log("Add new template");
		openCloseShowTemplate();
	};

	useEffect(() => {
		const savedTemplates =
			JSON.parse(localStorage.getItem("categories")) || {};
		setTemplates(savedTemplates[category] || []);
	}, []);

	return (
		<>
			<Table>
				<Table.Header>
					<Table.Row className="table__header">
						<Table.HeaderCell>{category}</Table.HeaderCell>
						<Table.HeaderCell>
							{!showAddTemplate && (
								<Button onClick={() => handleAddNewTemplate()}>
									Add new
								</Button>
							)}

							<Button onClick={() => goBackClick()}>Back</Button>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{!showAddTemplate &&
						templates.map((template, index) => (
							<Table.Row key={index} className="map__categories">
								<Table.Cell>{template.title}</Table.Cell>
							</Table.Row>
						))}

					{showAddTemplate && (
						<FormAddNewTemplate category={category} />
					)}
				</Table.Body>
			</Table>
		</>
	);
}
