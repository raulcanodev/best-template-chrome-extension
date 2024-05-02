import React from "react";
import "./AllNotesByCategory.css";
import { useState, useEffect } from "react";
import { Button, Table, Form } from "semantic-ui-react";
import { FormAddNewTemplate, PreviewNote } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faOtter } from "@fortawesome/free-solid-svg-icons";

// Test

export function AllNotesByCategory({ category, goBackClick }) {
	const [templates, setTemplates] = useState([]);
	const [showAddTemplate, setShowAddTemplate] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [clickedNote, setClickedNote] = useState("");
	const [copyAdded, setCopyAdded] = useState("");

	const openCloseShowTemplate = () => {
		setShowAddTemplate(!showAddTemplate);
	};

	const handleAddNewTemplate = () => {
		console.log("Add new template");
		openCloseShowTemplate();
	};

	const updateTemplateInLocalStorage = (category, updatedTemplates) => {
		const savedTemplates =
			JSON.parse(localStorage.getItem("categories")) || {}; // Get the saved templates
		savedTemplates[category] = updatedTemplates; // Update the templates of the category

		localStorage.setItem("categories", JSON.stringify(savedTemplates)); // Save the updated templates
	};

	const handleSaveChanges = (updatedContent) => {
		const updatedTemplates = [...templates];
		updatedTemplates[clickedNote].content = updatedContent;
		// Update in LocalStorage the updated content
		updateTemplateInLocalStorage(category, updatedTemplates);
		// Update in the state
		setTemplates(updatedTemplates);
		setContent(updatedContent);
	};

	const handleDeleteTemplate = () => {
		const updatedTemplates = [...templates];
		updatedTemplates.splice(clickedNote, 1); // Delete the template from the array
		// Update in LocalStorage the updated content
		updateTemplateInLocalStorage(category, updatedTemplates);
		// Update in the state
		setTemplates(updatedTemplates);
		setContent("");
		setClickedNote("");
	};

	const handleCopyOnclick = (data) => {
		const copyText = data;
		navigator.clipboard.writeText(copyText);
		// Show message "Copied to clippboard!"
		setCopyAdded("Copy!");
		setTimeout(() => {
			setCopyAdded("");
		}, 4000);
	};

	useEffect(() => {
		const savedTemplates =
			JSON.parse(localStorage.getItem("categories")) || {};
		setTemplates(savedTemplates[category] || []);
	}, []);

	return (
		<>
			<div>
				<Table>
					<Table.Header>
						<Table.Row className="table__header">
							<Table.HeaderCell>{category}</Table.HeaderCell>

							<Table.HeaderCell>
								{!showAddTemplate && (
									<Button
										onClick={() => handleAddNewTemplate()}>
										Add new template
									</Button>
								)}

								<Button
									onClick={() =>
										showAddTemplate
											? setShowAddTemplate(false)
											: goBackClick()
									}>
									<FontAwesomeIcon icon={faAngleLeft} />
								</Button>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
				</Table>
			</div>

			<div className="table__content">
				<div className="table__table">
					<Table>
						<Table.Body>
							{!showAddTemplate &&
								templates.map((template, index) => (
									<Table.Row
										key={index}
										style={{
											cursor: "pointer",
											backgroundColor:
												clickedNote === index
													? "#4518AD"
													: "",
										}}
										className="map__categories"
										onClick={() => {
											setContent(template.content);
											setTitle(template.title);
											setClickedNote(index);
											handleCopyOnclick(template.content);
										}}>
										<Table.Cell>
											{template.title}
										</Table.Cell>
										{/* COPY! TEMPLATE */}
										<Table.Cell>
											{clickedNote === index && copyAdded}
										</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
				</div>
				{/* Cuando se clica en Add new se despliega */}

				{/* Preview */}
				{!showAddTemplate && clickedNote && (
					<div className="table__preview">
						<PreviewNote
							content={content}
							title={title}
							onSaveChanges={handleSaveChanges}
							onDeleteTemplate={handleDeleteTemplate}
						/>
					</div>
				)}

				{/* Mostrar logo si no hay nota clicada */}
				{!showAddTemplate && !clickedNote && (
					<div className="table__preview">
						<FontAwesomeIcon
							icon={faOtter}
							size="5x"
							color="white"
							style={{
								opacity: 0.1,
								border: "3px solid white",
								borderRadius: "20px",
								padding: "20px",
							}}
						/>
					</div>
				)}
			</div>
			{/* Form para crear una nueva nota/template */}
			{showAddTemplate && <FormAddNewTemplate category={category} />}
		</>
	);
}
