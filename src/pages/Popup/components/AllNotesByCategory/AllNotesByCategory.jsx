import React from "react";
import "./AllNotesByCategory.css";
import { useState, useEffect } from "react";
import { Button, Table, Form } from "semantic-ui-react";
import { FormAddNewTemplate, PreviewNote } from "../../components";

export function AllNotesByCategory({ category, goBackClick }) {
	const [templates, setTemplates] = useState([]);
	const [showAddTemplate, setShowAddTemplate] = useState(false);

	const [test, setTest] = useState("Lorem ipsum bla bla bla");

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
			<div className="table__content">
				<div className="table__table">
					<Table>
						<Table.Header>
							<Table.Row className="table__header">
								<Table.HeaderCell>{category}</Table.HeaderCell>
								<Table.HeaderCell>
									{!showAddTemplate && (
										<Button
											onClick={() =>
												handleAddNewTemplate()
											}>
											Add new
										</Button>
									)}

									<Button onClick={() => goBackClick()}>
										Back
									</Button>
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{!showAddTemplate &&
								templates.map((template, index) => (
									<Table.Row
										key={index}
										className="map__categories">
										<Table.Cell>
											{template.title}
										</Table.Cell>
									</Table.Row>
								))}

							{/* Cuando se clica en Add new se despliega */}
							{showAddTemplate && (
								<FormAddNewTemplate category={category} />
							)}
						</Table.Body>
					</Table>
				</div>

				<div className="table__preview">
					<PreviewNote />
				</div>
			</div>

			{/* FOOTER */}
			{/* <PreviewNote /> */}
		</>
	);
}
