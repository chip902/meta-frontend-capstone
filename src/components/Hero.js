import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div className="App-hero">
			<div className="card bg-[#495E57] w-auto">
				<div>
					<div className="h-[406px] bg-cover bg-center" style={{ backgroundImage: `url(YourImageURLHere)` }}></div>
					<div className="p-4 text-[#F4CE14]">
						<h2 className="text-2xl font-semibold">Little Lemon</h2>
						<h3 className="text-lg mt-[-1rem] text-[#EDEFEE]">Chicago</h3>
						<div className="text-white">
							We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
						</div>
					</div>
				</div>
				<div className="card-actions justify-start">
					<Link
						to="/reservations"
						className="btn btn-primary btn-accent"
						aria-label="Click to Reserve a Table"
						style={{ backgroundColor: "#F4CE14", color: "#000000" }}>
						Reserve a table
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
