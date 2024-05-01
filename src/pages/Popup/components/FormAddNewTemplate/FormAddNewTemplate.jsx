import React from "react";
import "./FormAddNewTemplate.css";
import { useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export function FormAddNewTemplate({ category }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const addTemplateToCategory = () => {
		console.log("Add template to category", title, content);
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
	};

	return (
		<>
			<div className="form__template">
				<Form.Input
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="Title"></Form.Input>
				<TextArea
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					maxLength={550}
					rows={6}
					placeholder="Content"></TextArea>
				<Button onClick={() => handleSave()}>Save</Button>
			</div>
			<div></div>
		</>
	);
}
