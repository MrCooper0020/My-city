import React from "react";
import "./styles/App.css";
import Firebase from "./services/firebase-connect";
import Header from "./widgets/header";

function App() {

	Firebase.auth()
		.signInWithEmailAndPassword("1117956@imed.edu.br", "123456")
		.then((retorno) => {
			console.log("Usuário Logado: " + retorno.user.uid);
		})
		.catch((erro) => {
			console.log(erro);
		});

	return (
		<div className="App">
			<Header />
		</div>
	);
}

export default App;
