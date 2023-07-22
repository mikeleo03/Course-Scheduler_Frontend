// Matkul upload
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from '../../assets/images/upload.png'

const url = import.meta.env.VITE_NODE_ENV=='development' ? import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV : import.meta.env.VITE_REACT_APP_BACKEND_URL;

interface MatkulUploadProps {
    jurusanData: string[];
    setNewMatkulAdd: (value : boolean) => void;
}

const MatkulUpload : React.FC<MatkulUploadProps> = ({ jurusanData, setNewMatkulAdd }) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const infoRef = useRef<HTMLParagraphElement>(null);
    const [jsonData, setJsonData] = useState<{
        nama: string[];
        sks: number[];
        jurusan: string[];
        semmin: number[];
        prediksi: string[];
    }>({
        nama: [],
        sks: [],
        jurusan: [],
        semmin: [],
        prediksi: [],
    });  

    const showFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (textRef && textRef.current) {
                textRef.current.textContent = 'File berhasil terunggah!';
            }
            if (infoRef && infoRef.current) {
                infoRef.current.textContent = `${file.name}`;
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

    const validateInput = (nama: string, sks: number, jurusan: string, semin: number, prediksi: string) => {
        let isValid = true;
        const messages: string[] = [];
      
        // 1. Validate 'nama'
        if (nama.trim() === '') {
            isValid = false;
            messages.push('Nama tidak boleh kosong.');
        }
      
        // 2. Validate 'sks'
        if (typeof sks !== 'number' || sks <= 1) {
            isValid = false;
            messages.push('SKS harus lebih besar dari 1.');
        }
      
        // 3. Validate 'jurusan'
        if (!jurusanData.includes(jurusan)) {
            isValid = false;
            messages.push('Jurusan ' + jurusan + ' tidak ditemukan.');
        }
      
        // 4. Validate 'semin'
        if (typeof semin !== 'number' || semin < 1 || semin > 8) {
            isValid = false;
            messages.push('Semester minimum harus bernilai diantara 1 dan 8.');
        }
      
        // 5. Validate 'prediksi'
        const validPrediksiValues = ['A', 'AB', 'B', 'BC', 'C', 'D', 'E'];
        if (!validPrediksiValues.includes(prediksi)) {
            isValid = false;
            messages.push('Prediksi hanya dapat bernilai satu diantara berikut: A, AB, B, BC, C, D, E.');
        }
      
        return { isValid, messages };
    };      

    const handleSubmitForms: React.MouseEventHandler<HTMLButtonElement> = async () => {
        // Insert the data one by one
        try {
            if (jsonData.nama && jsonData.sks && jsonData.jurusan && jsonData.semmin && jsonData.prediksi) {
                if (jsonData.nama.length === jsonData.sks.length &&
                    jsonData.nama.length === jsonData.jurusan.length &&
                    jsonData.nama.length === jsonData.semmin.length &&
                    jsonData.nama.length === jsonData.prediksi.length) {
                    await Promise.all (
                        jsonData.nama.map(async (nama, index) => {
                            try {
                                // Validation scheme
                                const { isValid, messages } = validateInput(
                                    nama,
                                    jsonData.sks[index],
                                    jsonData.jurusan[index],
                                    jsonData.semmin[index],
                                    jsonData.prediksi[index]
                                );

                                if (isValid) {
                                    // Add new mata kuliah
                                    fetch(url + "/api/newmk", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            nama: nama,
                                            sks: jsonData.sks[index],
                                            jurusan: jsonData.jurusan[index],
                                            semmin: jsonData.semmin[index],
                                            prediksi: jsonData.prediksi[index],
                                        }),
                                    })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        // Update state              
                                        if (data.row > 0) {
                                            toast.success('Mata Kuliah ' + nama + ' berhasil ditambahkan.', {
                                                position: toast.POSITION.TOP_RIGHT
                                            });
                                            setNewMatkulAdd(true);
                                        } else {
                                            toast.error('Mata Kuliah ' + nama + ' sudah ada, tidak dapat ditambahkan.', {
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
                                toast.error("Error add new mata kuliah : " + error, {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            }
                        })
                    );
                    
                    // reset
                    if (textRef && textRef.current) {
                        textRef.current.textContent = 'Unggah mata kuliah baru disini...';
                    }
                    if (infoRef && infoRef.current) {
                        infoRef.current.textContent = 'Anda belum mengunggah file apapun!';
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
            toast.error("Error add new mata kuliah : " + error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };      

    return (
        <div className='my-2'>
            <input type="file" id="file-btn" accept=".json,application/json" onChange={showFile} hidden />
            <label htmlFor="file-btn" className="w-full">
                <div className="border-2 border-dashed border-white-3 rounded-2xl p-4 py-2.5 w-full flex flex-col items-center cursor-pointer bg-primaryYellow hover:bg-secondaryYellow duration-200">
                    <img
                        src={UploadImage}
                        className="block h-10"
                        alt=""
                    />
                    <p className="text-sm font-bold text-white text-center" ref={textRef}>
                        Unggah mata kuliah baru disini...
                    </p>
                    <p className="text-sm font-normal text-white text-center mt-1" ref={infoRef}>
                        Anda belum mengunggah file apapun!
                    </p>
                </div>
            </label>
            <button
                className="w-full mt-2.5 px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                onClick={handleSubmitForms}
            >
                Tambahkan
            </button>
        </div>
    )
}

export default MatkulUpload;