import React from "react";
import "./FormAddNewTemplate.css";
import { useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export function FormAddNewTemplate({ category, onClose }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const addTemplateToCategory = () => {
		const newTemplate = { title, content };
		const savedCategories =
			JSON.parse(localStorage.getItem("categories")) || {};

		const updatedCategory = [...savedCategories[category], newTemplate];
		const updatedCategories = {
			...savedCategories,
			[category]: updatedCategory,
		};
		localStorage.setItem("categories", JSON.stringify(updatedCategories));
	};

	const handleSave = () => {
		if (title === "" || content === "") return;
		console.log("Save template", title);
		console.log("Content", content);
		addTemplateToCategory();
		onClose();
	};

	return (
		<>
			<div className="form__template">
				<Form.Input
					value={title}
					maxLength={21}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="Title"
				/>
				<TextArea
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					maxLength={550}
					rows={6}
					placeholder="Content"></TextArea>
				<div className="template__characters-count">
					<Button onClick={() => handleSave()}>Save</Button>
					<span
						style={{
							opacity: `${content.length >= 550 ? 1 : 0.5}`,
						}}>
						{content.length}/550
					</span>
				</div>
			</div>
		</>
	);
}
