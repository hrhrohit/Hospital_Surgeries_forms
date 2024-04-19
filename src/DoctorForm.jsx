import React, { useState, useEffect } from 'react';
import { addUser, fetchNames } from '../firebaseConfig';

function DoctorForm() {
    const [mrNo, setMrNo] = useState('');
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [surgeon, setSurgeon] = useState('');
    const [surgeons, setSurgeons] = useState([]);
    const [surgicalProcedure, setSurgicalProcedure] = useState('');
    const [surgeryDate, setSurgeryDate] = useState('');
    const [hospitalNumber, setHospitalNumber] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);  // State to handle success message visibility

    useEffect(() => {
        const loadSurgeons = async () => {
            const names = await fetchNames("DoctorNameDetails");
            setSurgeons(names);
        };
        loadSurgeons();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        try {
            const newDocId = await addUser({
                mrNo,
                patientName,
                age: parseInt(age, 10),  // Ensuring age is stored as a number
                sex,
                surgeon,
                hospitalNumber,
                surgicalProcedure,
                surgeryDate,
                doctorSubmitTime: timestamp
            }, "DoctorDetails");
            console.log('Document added with ID:', newDocId);
            // Reset form fields
            setMrNo("");
            setPatientName("");
            setAge("");
            setSex("");
            setSurgeon("");
            setSurgicalProcedure("");
            setSurgeryDate("");
            setHospitalNumber("");
            // Show success message
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000);  // Hide the success message after 5 seconds
        } catch (error) {
            console.error('Error adding document:', error);
            // Optionally, notify the user of the failure
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-bold mb-2">Doctor Form</h2>
            {submitSuccess && (
                <div className="p-3 bg-green-200 text-green-800 rounded-md mb-3">
                    Submission successful!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="mrNo" className="block text-gray-700 font-medium">
                        MR. No.
                    </label>
                    <input
                        type="text"
                        id="mrNo"
                        value={mrNo}
                        onChange={(e) => setMrNo(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter MR number"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="patientName" className="block text-gray-700 font-medium">
                        Patient Name
                    </label>
                    <input
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter patient name"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="age" className="block text-gray-700 font-medium">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter patient's age"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="sex" className="block text-gray-700 font-medium">
                        Sex
                    </label>
                    <select
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">Select sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="hospitalNumber" className="block text-gray-700 font-medium">
                        Department
                    </label>
                    <input
                        type="text"
                        id="hospitalNumber"
                        value={hospitalNumber}
                        onChange={(e) => setHospitalNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter hospital name"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="surgeon" className="block text-gray-700 font-medium">
                        Surgeon Name
                    </label>
                    <select
                        id="surgeon"
                        value={surgeon}
                        onChange={(e) => setSurgeon(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required>
                        <option value="">Select Surgeon</option>
                        {surgeons.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="surgicalProcedure" className="block text-gray-700 font-medium">
                        Surgical Procedure
                    </label>
                    <input
                        type="text"
                        id="surgicalProcedure"
                        value={surgicalProcedure}
                        onChange={(e) => setSurgicalProcedure(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter surgical procedure"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="surgeryDate" className="block text-gray-700 font-medium">
                        Date of Surgery
                    </label>
                    <input
                        type="date"
                        id="surgeryDate"
                        value={surgeryDate}
                        onChange={(e) => setSurgeryDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                {submitSuccess ? (
                    <button
                        type="button" // Change type if it should not submit a form anymore
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        disabled
                    >
                        Submitted Successfully
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                )}

                {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Submit
                </button> */}
            </form>
        </div>
    );
}

export default DoctorForm;
