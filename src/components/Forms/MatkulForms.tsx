import React, { useState } from "react";
import { toast } from 'react-toastify';
import Dropdown from "../Dropdown/Dropdown";
import 'react-toastify/dist/ReactToastify.css';

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

interface matkulFormProps {
    jurusanData: string[];
    setNewMatkulAdd: (value : boolean) => void;
}

// Forms component
const MatkulForm : React.FC<matkulFormProps> = ({ jurusanData, setNewMatkulAdd }) => {
    const [namaMatkul, setNamaMatkul] = useState("");
    const [jurusan, setJurusan] = useState(0);
    const [sks, setSks] = useState(1);
    const dataSemMin = [1, 2, 3, 4, 5, 6, 7, 8];
    const [semin, setSemin] = useState(0);
    const dataPrediksi = ["A", "AB", "B", "BC", "C", "D", "E"];
    const [prediksi, setPrediksi] = useState(0);

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        if (namaMatkul && namaMatkul.trim() !== '') {
            try {
                // Add new mata kuliah
                fetch(url + "/api/newmk", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "nama": namaMatkul,
                        "sks": sks,
                        "jurusan": jurusanData[jurusan],
                        "semmin": dataSemMin[semin],
                        "prediksi": dataPrediksi[prediksi]
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    // Update state              
                    if (data.row > 0) {
                        toast.success('Mata Kuliah ' + namaMatkul + ' berhasil ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setNewMatkulAdd(true);
                    } else {
                        toast.error('Mata Kuliah ' + namaMatkul + ' sudah ada, tidak dapat ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    setNamaMatkul("");
                    setJurusan(0);
                    setSks(1);
                    setSemin(0);
                    setPrediksi(0);
                });
                
            } catch (error) {
                toast.error("Error add new mata kuliah : " + error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        } else {
            toast.error('Lengkapi data mata kuliah terlebih dahulu.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <main className="py-1 mt-2">
            <div className="max-w-screen-xl mx-auto px-0 text-gray-600">
                <div className="max-w-lg mx-auto">
                    <div className="space-y-3">
                        <div>
                            <label className="font-medium">
                                Nama Mata Kuliah
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-4 py-1.5 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={namaMatkul}
                                onChange={(e) => setNamaMatkul(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Jurusan
                            </label>
                            <Dropdown menuItems={jurusanData} selectedItem={jurusan} setSelectedItem={setJurusan} height={0} maxHeight={64}/>
                        </div>
                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                            <div>
                                <label className="font-medium">
                                    Jumlah SKS
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
                                <label className="font-medium">
                                    Semester min.
                                </label>
                                <Dropdown menuItems={dataSemMin} selectedItem={semin} setSelectedItem={setSemin} height={40} maxHeight={0}/>
                            </div>
                            <div>
                                <label className="font-medium">
                                    Prediksi Nilai
                                </label>
                                <Dropdown menuItems={dataPrediksi} selectedItem={prediksi} setSelectedItem={setPrediksi} height={40} maxHeight={0}/>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={handleSubmitForms}
                        >
                            Tambahkan
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MatkulForm;