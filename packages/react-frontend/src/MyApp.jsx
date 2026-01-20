// src/MyApp.jsx


import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

	function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
			return i !== index;
		});
		setCharacters(updated);
	}

	const [characters, setCharacters] = useState([]);

	
	function fetchUsers() {
		//  Promises are useful when we need to perform an operation which will take some time to finish, or may never finish. We don't want our code to wait for the data to come back to the server, because that would make our app seem unresponsive to the user
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}
	

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(person),
		});

		return promise;
	}
	
	function updateList(person) {
	postUser(person)
		.then((res) => {
		if (res.status !== 201) {
			throw new Error("User not created");
		}
		return res.json(); 
		})
		.then((createdUser) => {
		setCharacters((prev) => [...prev, createdUser]);
		})
		.catch((error) => {
		console.log(error);
		});
	}


	useEffect(() => {
	fetchUsers()
		.then((res) => res.json())
		.then((json) => setCharacters(json["users_list"]))
		.catch((error) => { console.log(error); });
	}, [] );
	
	function deleteUser(id) {
		return fetch(`http://localhost:8000/users/${id}`, {
			method: "DELETE",
		});
	}

	function removeOneCharacter(index) {
		const userToDelete = characters[index];
		const id = userToDelete?.id;

		if (!id) {
			console.log("Cannot delete: missing user id");
			return;
		}

		deleteUser(id)
			.then((res) => {
			if (res.status === 204) {
				// backend delete succeeded now update frontend state
				setCharacters((prev) => prev.filter((_, i) => i !== index));
			} else if (res.status === 404) {
				console.log("User not found on backend (404). No deletion performed.");
			} else {
				console.log(`Unexpected DELETE status: ${res.status}`);
			}
			})
			.catch((err) => console.log(err));
		}

	return (
		<div className="container">
			<Table
				characterData={characters}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
		</div>
	);
	
}



export default MyApp;