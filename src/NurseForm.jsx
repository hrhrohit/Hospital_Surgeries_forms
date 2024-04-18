import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchDocumentsByDate, updateDocument } from '../firebaseConfig';

function NurseForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [ward, setWard] = useState('');
    const [scrubNurse, setScrubNurse] = useState('');
    const [circulatingNurse, setCirculatingNurse] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        console.log("this is the current doc id", currentDocId);
    }, [currentDocId]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedDate) {
            setLoading(true);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const fetchedDocuments = await fetchDocumentsByDate(formattedDate);
            setDocuments(fetchedDocuments);
            setLoading(false);
        } else {
            setDocuments([]);
        }
    };

    const openModal = (docId) => {
        setCurrentDocId(docId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (currentDocId) {
            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
            try {
                await updateDocument(currentDocId, {
                    ward,
                    scrubNurse,
                    circulatingNurse,
                    room,
                    nurseSubmitTime: timestamp // Now correctly using the generated timestamp
                }, "DoctorDetails");
                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
        closeModal();
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-bold mb-2">Nurse Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="surgeryDate" className="block text-gray-700 font-medium">
                        Date of Surgery
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                    Fetch Records
                </button>
                {loading && <p>Loading...</p>}
                {!loading && documents.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Scheduled Surgeries:</h3>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        MR No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Patient Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sex
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hospital Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Surgeon
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Surgical Procedure
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Anesthetist
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Anesthetist Technician
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Surgery Time
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(doc => (
                                    <tr key={doc.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.mrNo}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.patientName}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.sex}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.age}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.hospitalNumber}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.surgeon}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.surgicalProcedure}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.anesthetist}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.anesthetistTechnician}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {doc.surgeryTime}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button onClick={() => openModal(doc.id)} className="text-blue-500 hover:text-blue-800">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {modalIsOpen && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded shadow-lg">
                                <h4 className="font-bold text-lg mb-4">Edit Nurse Details</h4>
                                <label>
                                    Ward:
                                    <input
                                        type="text"
                                        value={ward}
                                        onChange={(e) => setWard(e.target.value)}
                                        className="block w-full p-2 border"
                                    />
                                </label>
                                <label>
                                    Scrub Nurse:
                                    <input
                                        type="text"
                                        value={scrubNurse}
                                        onChange={(e) => setScrubNurse(e.target.value)}
                                        className="block w-full p-2 border"
                                    />
                                </label>
                                <label>
                                    Circulating Nurse:
                                    <input
                                        type="text"
                                        value={circulatingNurse}
                                        onChange={(e) => setCirculatingNurse(e.target.value)}
                                        className="block w-full p-2 border"
                                    />
                                </label>
                                <label>
                                    Room:
                                    <input
                                        type="text"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        className="block w-full p-2 border"
                                    />
                                </label>
                                <button type="button" onClick={handleSave} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Save
                                </button>
                                <button type="button" onClick={closeModal} className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}

export default NurseForm;
