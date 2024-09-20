import axios from "axios";
import React from "react";

const Horses = () => {
  const horses = [
    {
      id: 1,
      name: "Yakushima (GB)",
      age: 4,
      gender: "Colt",
      sire: "Havana Grey (GB)",
      dam: "Satsuma (GB)",
      trainer: "Ryo Terashima",
      country: "Japan",
    },
    {
      id: 2,
      name: "Yoga Master (GB)",
      age: 2,
      gender: "Filly",
      sire: "Persian King (IRE)",
      dam: "Pure Zen (IRE)",
      trainer: "Andre Fabre",
      country: "France",
    },
  ];

  const saveHorse = async (horse) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/saveHorse", // Adjust base URL if needed
        { horseData: horse }, // Send the entire horse object
        { withCredentials: true } // Ensures cookies/session are sent
      );
      console.log("Horse saved:", response.data);
      alert("Horse saved successfully!");
    } catch (error) {
      console.error("Error saving horse:", error);
      alert("Failed to save horse. Please try again.");
    }
  };

  return (
    <div>
      <h1>Horses</h1>
      <ul>
        {horses.map((horse) => (
          <li key={horse.id}>
            <strong>{horse.name}</strong> - Age: {horse.age}, Gender:{" "}
            {horse.gender}, Sire: {horse.sire}, Dam: {horse.dam}, Trainer:{" "}
            {horse.trainer}, Country: {horse.country}
            <button onClick={() => saveHorse(horse)}>Save Horse</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Horses;
