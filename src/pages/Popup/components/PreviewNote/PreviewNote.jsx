import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function PreviewNote({
	title,
	content,
	onSaveChanges,
	onDeleteTemplate,
}) {
	const [noteContent, setNoteContent] = useState(content);
	const [titleContent, setTitleContent] = useState(title);
	const [verifyDelete, setVerifyDelete] = useState(false);

	const onVerifyDelete = () => {
		setVerifyDelete((prev) => !prev);
	};

	const handleNoteChange = (event) => {
		setNoteContent(event.target.value);
	};

	const handleTitleChange = (event) => {
		setTitleContent(event.target.value);
	};

	const handleSave = () => {
		if (noteContent === "" || titleContent === "") return;
		onSaveChanges(noteContent, titleContent);
	};

	useEffect(() => {
		setTitleContent(title);
		setNoteContent(content);
		setVerifyDelete(false);
	}, [content, title]);

	return (
		<>
			<div
				style={{
					display: "flex",
					height: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
				}}>
				<div>
					<Form.Input
						value={titleContent}
						onChange={handleTitleChange}
						maxLength={21}></Form.Input>
					<Form.TextArea
						style={{ width: "280px", height: "180px" }}
						maxLength={550}
						value={noteContent}
						onChange={handleNoteChange}></Form.TextArea>
				</div>

				{/* SAVE AND DELETE */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "10px",
						// marginTop: "50px",
					}}>
					{verifyDelete ? (
						<Button
							style={{ marginTop: "10px" }}
							onClick={() => {
								onDeleteTemplate();
								setVerifyDelete(false);
							}}>
							Confirm delete
						</Button>
					) : (
						<div style={{ marginTop: "10px" }}>
							<Button onClick={handleSave}>Save changes</Button>
							<Button onClick={onVerifyDelete}>
								<FontAwesomeIcon icon={faTrashCan} />
							</Button>
						</div>
					)}

					<span
						style={{
							marginTop: "15px",
							opacity: "0.5",
						}}>
						{noteContent.length}/550
					</span>
				</div>
			</div>
		</>
	);
}
