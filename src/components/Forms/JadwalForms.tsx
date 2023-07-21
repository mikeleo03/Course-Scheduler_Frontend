import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from "../Dropdown/Dropdown";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

interface jadwalFormProps {
    jurusanData: string[];
    setResultData : (value : {
        id : number
        nama: string
        sks: number
        jurusan: string
        fakultas: string
        semmin: number
        prediksi: string
    }[]) => void;
    setScore : (value : number) => void;
}

// Forms component
const JadwalForm : React.FC<jadwalFormProps> = ({ jurusanData, setResultData, setScore }) => {
    const [jurusan, setJurusan] = useState(0);
    const dataSem = [1, 2, 3, 4, 5, 6, 7, 8];
    const [sem, setSem] = useState(0);
    const [sks, setSks] = useState(1);

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        try {
            // Convert semester to string
            const semesterStr = dataSem[sem].toString();

            // Build query parameters
            const queryParams = new URLSearchParams({
                jurusan: jurusanData[jurusan],
                semester: semesterStr,
                sks: sks.toString(),
            });
            
            // Do the scheduling process
            fetch(url + "/api/schedule?" + queryParams, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                // Update state
                if (data.status) {
                    setResultData(data.value);
                    setScore(data.total / data.value.reduce((sum: number, course: { sks: number }) => sum + course.sks, 0));
                } else {
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setResultData([]);
                    setScore(0.00);
                }
                setJurusan(0);
                setSks(1);
                setSem(0);
            });
            
        } catch (error) {
            toast.error("Error scheduling : " + error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <main className="px-6 w-full">
            <div className="max-w-screen-xl mx-auto px-0 text-gray-600">
                <div className="mx-auto">
                    <div className="flex flex-row items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                        <div>
                            <label className="font-medium text-base">
                                Nama Jurusan
                            </label>
                            <Dropdown menuItems={jurusanData} selectedItem={jurusan} setSelectedItem={setJurusan} height={0} maxHeight={64}/>
                        </div>
                        <div>
                            <label className="font-medium">
                                Semester Pengambilan
                            </label>
                            <Dropdown menuItems={dataSem} selectedItem={sem} setSelectedItem={setSem} height={40} maxHeight={0}/>
                        </div>
                        <div>
                            <label className="font-medium">
                                Batasan SKS
                            </label>
                            <input
                                type="number"
                                min="1"
                                required
                                className="w-full mt-2 px-4 py-1.5 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={sks}
                                onChange={(e) => setSks(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <button
                                className="w-full px-4 py-1 text-white text-base font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                                onClick={handleSubmitForms}
                            >
                                Jadwalkan!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JadwalForm;