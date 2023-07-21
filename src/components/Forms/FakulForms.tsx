import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

interface FakulFormProps {
    setNewFakulAdd: (value : boolean) => void;
}

// Forms component
const FakulForm : React.FC<FakulFormProps> = ({ setNewFakulAdd }) => {
    const [namaFakul, setNamaFakul] = useState("");

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        if (namaFakul && namaFakul.trim() !== '') {
            try {
                // Adding new fakultas
                fetch(url + "/api/newfakul", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "nama": namaFakul,
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    // Update state              
                    if (data.row > 0) {
                        toast.success('Fakultas ' + namaFakul + ' berhasil ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setNewFakulAdd(true);
                    } else {
                        toast.error('Fakultas ' + namaFakul + ' sudah ada, tidak dapat ditambahkan.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    setNamaFakul("");
                });
            } catch (error) {
                toast.error("Error add new fakultas : " + error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        } else {
            toast.error('Lengkapi data fakultas terlebih dahulu.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <main className="py-1">
            <div className="max-w-screen-xl mx-auto px-0 text-gray-600">
                <div className="mx-auto">
                    <div className="space-y-3">
                        <div>
                            <label className="font-medium text-base">
                                Nama Fakultas
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={namaFakul}
                                onChange={(e) => setNamaFakul(e.target.value)}
                            />
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

export default FakulForm;