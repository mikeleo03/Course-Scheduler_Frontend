// Jurusan upload
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from '../../assets/images/upload.png'

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

interface JurusanUploadProps {
    fakultasData: string[];
    setNewJurusanAdd: (value : boolean) => void;
}

const JurusanUpload : React.FC<JurusanUploadProps> = ({ fakultasData, setNewJurusanAdd }) => {
    const textRefJurusan = useRef<HTMLParagraphElement>(null);
    const infoRefJurusan = useRef<HTMLParagraphElement>(null);
    const [jsonData, setJsonData] = useState<{
        nama: string[];
        fakultas: string[];
    }>({
        nama: [],
        fakultas: []
    });  

    const showFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (textRefJurusan && textRefJurusan.current) {
                textRefJurusan.current.textContent = 'File berhasil terunggah!';
            }
            if (infoRefJurusan && infoRefJurusan.current) {
                infoRefJurusan.current.textContent = `${file.name}`;
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

    const validateInput = (nama: string, fakultas: string) => {
        let isValid = true;
        const messages: string[] = [];
      
        // 1. Validate 'nama'
        if (nama.trim() === '') {
            isValid = false;
            messages.push('Nama tidak boleh kosong.');
        }
      
        // 2. Validate 'fakultas'
        if (!fakultasData.includes(fakultas)) {
            isValid = false;
            messages.push('Fakultas ' + fakultas + ' tidak ditemukan.');
        }
      
        return { isValid, messages };
    }; 

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async () => {      
        // Insert the data one by one
        try {
            if (jsonData.nama && jsonData.fakultas) {
                if (jsonData.nama.length === jsonData.fakultas.length) {
                    await Promise.all (
                        jsonData.nama.map(async (nama, index) => {
                            try {
                                // Vliadating input mechanism
                                const { isValid, messages } = validateInput( nama, jsonData.fakultas[index] );
                                if (isValid) {
                                    // Adding new jurusan
                                    fetch(url + "/api/newjurusan", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            nama: nama,
                                            fakultas: jsonData.fakultas[index]
                                        }),
                                    })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        // Update state               
                                        if (data.row > 0) {
                                            toast.success('Jurusan ' + nama + ' berhasil ditambahkan.', {
                                                position: toast.POSITION.TOP_RIGHT
                                            });
                                            setNewJurusanAdd(true);
                                        } else {
                                            toast.error('Jurusan ' + nama + ' sudah ada, tidak dapat ditambahkan.', {
                                                position: toast.POSITION.TOP_RIGHT
                                            });
                                        }
                                    });
                                } else {       
                                    toast.error(messages, {
                                        position: toast.POSITION.TOP_RIGHT
                                    });
                                }
                    
                            } catch (error) {
                                toast.error("Error add new jurusan : " + error, {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            }
                        })
                    );
                    
                    // reset
                    if (textRefJurusan && textRefJurusan.current) {
                        textRefJurusan.current.textContent = 'Unggah jurusan baru disini...';
                    }
                    if (infoRefJurusan && infoRefJurusan.current) {
                        infoRefJurusan.current.textContent = 'Anda belum mengunggah file apapun!';
                    }
                } else {
                    toast.error('Jumlah data tidak sama, pastikan masukan memiliki panjang data yang sama.', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            } else {
                toast.error('Data tidak tepat, pastikan untuk mengecek ulang isi file.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
                    
        } catch (error) {
            toast.error("Error add new jurusan : " + error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };      

    return (
        <div className='my-2'>
            <input type="file" id="file-btn-jurus" accept=".json,application/json" onChange={showFile} hidden />
            <label htmlFor="file-btn-jurus" className="w-full">
                <div className="border-2 border-dashed border-white-3 rounded-2xl p-4 py-2.5 w-full items-center cursor-pointer bg-primaryYellow hover:bg-secondaryYellow duration-200 flex flex-row">
                    <div className='w-1/5 flex items-center justify-center'>
                        <img
                            src={UploadImage}
                            className="block h-10"
                            alt=""
                        />
                    </div>
                    <div className='w-4/5'>
                        <p className="text-sm font-bold text-white text-center" ref={textRefJurusan}>
                            Unggah jurusan baru disini...
                        </p>
                        <p className="text-sm font-normal text-white text-center mt-1" ref={infoRefJurusan}>
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

export default JurusanUpload;