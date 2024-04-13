import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";

const mockSubmitForm = jest.fn();
const mockDispatch = jest.fn();
const availableTimes = ["12:00", "13:00", "14:00"];

describe("BookingForm Component", () => {
	test("renders the booking form with empty fields", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		expect(screen.getByLabelText("Choose Date")).toHaveValue("");
		expect(screen.getByLabelText("Choose Time")).toHaveValue("Select a Time");
		expect(screen.getByLabelText("Number of Guests").value).toBe("");
		expect(screen.getByLabelText("Occasion")).toHaveValue("");
	});

	test("allows entering data into the date field", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		const dateInput = screen.getByLabelText("Choose Date");
		fireEvent.change(dateInput, { target: { value: "2022-06-15" } });
		expect(dateInput).toHaveValue("2022-06-15");
	});

	test("allows selection from the time dropdown", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		const timeSelect = screen.getByLabelText("Choose Time");
		userEvent.selectOptions(timeSelect, "13:00");
		expect(timeSelect).toHaveValue("13:00");
	});

	test("handles number of guests input", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		const guestsInput = screen.getByLabelText("Number of Guests");
		fireEvent.change(guestsInput, { target: { value: 4 } });
		expect(guestsInput).toHaveValue(4);
	});

	test("handles occasion selection", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		const occasionSelect = screen.getByLabelText("Occasion");
		userEvent.selectOptions(occasionSelect, "Birthday");
		expect(occasionSelect).toHaveValue("Birthday");
	});

	test("submits the form with valid data", () => {
		render(<BookingForm submitForm={mockSubmitForm} dispatch={mockDispatch} availableTimes={availableTimes} />);
		fireEvent.change(screen.getByLabelText("Choose Date"), { target: { value: "2022-06-15" } });
		userEvent.selectOptions(screen.getByLabelText("Choose Time"), "13:00");
		fireEvent.change(screen.getByLabelText("Number of Guests"), { target: { value: "4" } });
		userEvent.selectOptions(screen.getByLabelText("Occasion"), "Birthday");
		fireEvent.click(screen.getByRole("button", { name: "On Click" }));

		expect(mockSubmitForm).toHaveBeenCalled();
		expect(mockDispatch).toHaveBeenCalledWith({ type: "UPDATE_TIMES", date: "2022-06-15" });
	});
});

test("User Clicks Reserve Button", async () => {
	render(
		<BrowserRouter>
			<Hero />
		</BrowserRouter>
	);

	const reserveButton = screen.getByRole("button");
	userEvent.click(reserveButton);
});
