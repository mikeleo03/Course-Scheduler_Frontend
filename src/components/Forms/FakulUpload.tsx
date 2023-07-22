// Matkul upload
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from '../../assets/images/upload.png'

const url = import.meta.env.VITE_NODE_ENV=='development' ? import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV : import.meta.env.VITE_REACT_APP_BACKEND_URL;

interface FakulUploadProps {
    setNewFakulAdd: (value : boolean) => void;
}

const FakulUpload : React.FC<FakulUploadProps> = ({ setNewFakulAdd }) => {
    const textRefFakultas = useRef<HTMLParagraphElement>(null);
    const infoRefFakultas = useRef<HTMLParagraphElement>(null);
    const [jsonData, setJsonData] = useState<{
        nama: string[];
    }>({
        nama: [],
    });  

    const showFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (textRefFakultas && textRefFakultas.current) {
                textRefFakultas.current.textContent = 'File berhasil terunggah!';
            }
            if (infoRefFakultas && infoRefFakultas.current) {
                infoRefFakultas.current.textContent = `${file.name}`;
            }

            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    setJsonData(JSON.parse(event.target?.result as string));
                } catch (error) {
                    toast.error("File yang Anda unggah mungkin kosong, silakan periksa kembali", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            };

            reader.readAsText(file);
        }
    };

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async () => {      
        // Insert the data one by one
        try {
            if (jsonData.nama) {
                await Promise.all (
                    jsonData.nama.map(async (nama) => {
                        try {
                            if (nama.trim() !== '') {
                                // Insert new fakultas
                                fetch(url + "/api/newfakul", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "nama": nama,
                                    }),
                                })
                                .then((res) => res.json())
                                .then((data) => {
                                    // Update state                
                                    if (data.row > 0) {
                                        toast.success('Fakultas ' + nama + ' berhasil ditambahkan.', {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                        setNewFakulAdd(true);
                                    } else {
                                        toast.error('Fakultas ' + nama + ' sudah ada, tidak dapat ditambahkan.', {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                    }
                                });
                            } else {       
                                toast.error("Nama tidak boleh kosong.", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            }
                
                        } catch (error) {
                            toast.error("Error add new fakultas : " + error, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                    })
                );
                
                // reset
                if (textRefFakultas && textRefFakultas.current) {
                    textRefFakultas.current.textContent = 'Unggah fakultas baru disini...';
                }
                if (infoRefFakultas && infoRefFakultas.current) {
                    infoRefFakultas.current.textContent = 'Anda belum mengunggah file apapun!';
                }
            } else {
                toast.error('Data tidak tepat, pastikan untuk mengecek ulang isi file.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
                
        } catch (error) {
            toast.error("Error add new fakultas : " + error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };      

    return (
        <div className='my-2'>
            <input type="file" id="file-btn" accept=".json,application/json" onChange={showFile} hidden />
            <label htmlFor="file-btn" className="w-full">
                <div className="border-2 border-dashed border-white-3 rounded-2xl p-4 py-2.5 w-full items-center cursor-pointer bg-primaryYellow hover:bg-secondaryYellow duration-200 flex flex-row">
                    <div className='w-1/5 flex items-center justify-center'>
                        <img
                            src={UploadImage}
                            className="block h-10"
                            alt=""
                        />
                    </div>
                    <div className='w-4/5'>
                        <p className="text-sm font-bold text-white text-center" ref={textRefFakultas}>
                            Unggah fakultas baru disini...
                        </p>
                        <p className="text-sm font-normal text-white text-center mt-1" ref={infoRefFakultas}>
                            Anda belum mengunggah file apapun!
                        </p>
                    </div>
                </div>
            </label>
            <button
                className="w-full mt-2.5 px-4 py-1 text-base text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                onClick={handleSubmitForms}
            >
                Tambahkan
            </button>
        </div>
    )
}

export default FakulUpload;