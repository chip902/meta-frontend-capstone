import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
	return (
		<React.Fragment>
			<NavBar />
			<Main />
			<Footer />
		</React.Fragment>
	);
}

export default App;
