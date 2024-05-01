import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function PreviewNote({
	content,
	title,
	onSaveChanges,
	onDeleteTemplate,
}) {
	const [noteContent, setNoteContent] = useState(content);
	const [verifyDelete, setVerifyDelete] = useState(false);

	const onVerifyDelete = () => {
		setVerifyDelete((prev) => !prev);
	};

	const handleChange = (event) => {
		// Update the content state with the new value
		setNoteContent(event.target.value);
	};

	const handleSave = () => {
		onSaveChanges(noteContent); // Call the function to save the changes
	};

	useEffect(() => {
		setNoteContent(content);
		setVerifyDelete(false);
	}, [content]);

	return (
		<>
			<div>
				<Form.Input value={title}></Form.Input>
				<Form.TextArea
					style={{ width: "280px", height: "230px" }}
					maxLength={550}
					value={noteContent}
					onChange={handleChange}></Form.TextArea>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}>
					{/* SAVE AND DELETE */}
					{verifyDelete ? (
						<Button
							onClick={() => {
								onDeleteTemplate();
								setVerifyDelete(false);
							}}>
							Confirm delete
						</Button>
					) : (
						<div>
							<Button onClick={handleSave}>Save changes</Button>
							<Button onClick={onVerifyDelete}>
								<FontAwesomeIcon icon={faTrashCan} />
							</Button>
						</div>
					)}

					<span
						style={{
							marginTop: "5px",
						}}>
						{noteContent.length}/550
					</span>
				</div>
			</div>
		</>
	);
}
