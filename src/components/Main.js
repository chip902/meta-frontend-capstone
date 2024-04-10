import React, { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./Booking";
import ConfirmedBooking from "./ConfirmedBooking";
import Header from "./Header";

const Main = () => {
    const seededRandom = function (seed) {
        var m = 2 ** 35 - 31;
        var a = 185852;
        var c = seed % m;
        return function () {
            return (c = (c * a) % m) / m;
        };
    };

    const fetchAPI = function (date) {
        let result = [];
        let random = seededRandom(date.getDate());

        for (let i = 17; i <= 23; i++) {
            if (random() < 0.5) {
                result.push(i + ":00");
            }
            if (random() < 0.5) {
                result.push(i + ":30");
            }
        }
        return result;
    };
    const submitAPI = function (formData) {
        return true;
    };

    const navigate = useNavigate();
    const initialState = { availableTimes: fetchAPI(new Date()) };
    const [state, dispatch] = useReducer(updateTimes, initialState);

    function updateTimes(state, action) {
		switch (action.type) {
		  case 'UPDATE_TIMES':
			return { ...state, availableTimes: fetchAPI(new Date(action.date)) };
		  default:
			return state;
		}
	  }

    function submitForm(formData) {
        if (submitAPI(formData)) {
            navigate("/confirmed");
        }
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/booking" element={<Booking availableTimes={state.availableTimes} dispatch={dispatch} submitForm={submitForm} />} />
                <Route path="/confirmed" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
};

export default Main;
