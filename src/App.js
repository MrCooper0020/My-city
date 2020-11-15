import React from "react";
import "./App.css";
import Firebase from "./services/firebase-connect";

function App() {

	Firebase.auth()
		.signInWithEmailAndPassword("1117956@imed.edu.br", "123456")
		.then((retorno) => {
			console.log("Usuário Logado: " + retorno.user.uid);
		})
		.catch((erro) => {
			console.log(erro);
		});

	return <div className="App"></div>;
}

export default App;
