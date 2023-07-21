import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from "../Dropdown/Dropdown";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

interface jurusanFormProps {
    fakultasData: string[];
    setNewJurusanAdd: (value : boolean) => void;
}

// Forms component
const JurusanForm: React.FC<jurusanFormProps> = ({ fakultasData, setNewJurusanAdd }) => {
    const [namaJurusan, setNamaJurusan] = useState("");
    const [fakultas, setFakultas] = useState(0);

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        if (namaJurusan && namaJurusan.trim() !== '') {
            try {
                // Add new jurusan
                fetch(url + "/api/newjurusan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "nama": namaJurusan,
                        "fakultas": fakultasData[fakultas]
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    // Update state                
                    if (data.row > 0) {
                        toast.success('Jurusan ' + namaJurusan + ' berhasil ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setNewJurusanAdd(true);
                    } else {
                        toast.error('Jurusan ' + namaJurusan + ' sudah ada, tidak dapat ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    setNamaJurusan("");
                    setFakultas(0);
                });
                
            } catch (error) {
                toast.error("Error add new jurusan : " + error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        } else {
            toast.error('Lengkapi data jurusan terlebih dahulu.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <main className="py-1">
            <div className="max-w-screen-xl mx-auto px-0 text-gray-600">
                <div className="mx-auto">
                    <div className="space-y-3">
                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                            <div>
                                <label className="font-medium text-base">
                                    Nama Jurusan
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full mt-2 px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    value={namaJurusan}
                                    onChange={(e) => setNamaJurusan(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Fakultas
                                </label>
                                <Dropdown menuItems={fakultasData} selectedItem={fakultas} setSelectedItem={setFakultas} height={20} maxHeight={0}/>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-1 text-white text-base font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
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

export default JurusanForm;