import React from "react";
import "./AllNotesByCategory.css";
import { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";

export function AllNotesByCategory({ category, goBackClick }) {
	const [templates, setTemplates] = useState([]);

	return (
		<>
			<Table>
				<Table.Header>
					<Table.Row className="table__header">
						<Table.HeaderCell>{category}</Table.HeaderCell>
						<div>
							<Button>Add new</Button>
							<Button onClick={() => goBackClick()}>Back</Button>
						</div>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Empty</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</>
	);
}
