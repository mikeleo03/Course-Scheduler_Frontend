import { useState } from 'react';
import FakulCard from '../../components/Cards/FakulCard';
import FakulForm from '../../components/Forms/FakulForms';
import FakulUpload from '../../components/Forms/FakulUpload';
import JurusanCard from '../../components/Cards/JurusanCard';
import JurusanForm from '../../components/Forms/JurusanForms';
import JurusanUpload from '../../components/Forms/JurusanUpload';

interface controlProps {
    fakultasData : {
        id : number
        nama: string
    }[];
    setNewFakulAdd : (prop : boolean) => void;
    jurusanData : {
        id : number
        nama: string
        fakultas: string
    }[];
    setNewJurusanAdd : (prop : boolean) => void;
    dropdownDataFakultas : string[];
}

const Control : React.FC<controlProps> = ({ fakultasData, setNewFakulAdd, jurusanData, setNewJurusanAdd, dropdownDataFakultas }) => {
    // List state
    const [activeTab, setActiveTab] = useState("Fakultas");

    return (
        <div className='flex flex-row w-full h-full'>
            <div className="bg-white w-full mx-auto shadow-xl rounded-r-xl text-lg flex flex-col h-full">
                <div className="text-left flex flex-row h-1/12">
                    <button
                        onClick={() => setActiveTab("Fakultas")}
                        className={`w-1/2 p-3 rounded-tl-xl ${activeTab === "Fakultas" ? "font-bold" : "font-medium bg-gray-200"}`}
                    >
                        Fakultas
                    </button>
                    <button
                        onClick={() => setActiveTab("Jurusan")}
                        className={`w-1/2 p-3 rounded-tr-xl ${activeTab === "Jurusan" ? "font-bold" : "font-medium bg-gray-200"}`}
                    >
                        Jurusan
                    </button>
                </div>
                <div className={`h-7/12 flex flex-col ${activeTab === "Jurusan" ? "hidden" : ""}`}>
                    <div className='h-1/5 p-8 pt-4 mb-5'>
                        <h1 className='text-3xl font-bold'>Daftar Fakultas</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Berikut adalah daftar fakultas yang tersimpan oleh sistem</h3>
                    </div>
                    <div className="overflow-y-auto grid grid-cols-3 gap-y-4 p-8 pt-3 gap-x-3">
                        {fakultasData ? (
                            fakultasData.map((obj, index) => (
                                <div key={index}>
                                    <FakulCard nama={obj.nama} />
                                </div>
                            ))
                        ) : (
                            <div className='text-lg'>Tidak ada data fakultas.</div>
                        )}
                    </div>
                </div>
                <div className={`h-4/12 bg-primaryGray flex flex-col rounded-br-xl ${activeTab === "Jurusan" ? "hidden" : ""}`}>
                    <div className='flex flex-row p-4'>
                        <div className='w-1/2 p-4 py-1'>
                            <h1 className='text-lg font-bold'>Tambah Fakultas</h1>
                            <FakulForm setNewFakulAdd={setNewFakulAdd} />
                        </div>
                        <div className='w-1/2 flex flex-col'>
                            <h1 className='text-xl font-bold'>Mengunggah Fakultas</h1>
                            <h1 className='text-sm text-gray-500'>Unggah file dengan format .JSON</h1>
                            <FakulUpload setNewFakulAdd={setNewFakulAdd} />
                        </div>
                    </div>
                </div>

                <div className={`h-7/12 flex flex-col ${activeTab === "Jurusan" ? "" : "hidden"}`}>
                    <div className='h-1/5 p-8 pt-4 mb-5'>
                        <h1 className='text-3xl font-bold'>Daftar Jurusan</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Berikut adalah daftar jurusan yang tersimpan oleh sistem</h3>
                    </div>
                    <div className="overflow-y-auto grid grid-cols-2 gap-y-4 p-8 pt-3 gap-x-3">
                        {jurusanData ? (
                            jurusanData.map((obj, index) => (
                                <div key={index}>
                                    <JurusanCard nama={obj.nama} fakultas={obj.fakultas} />
                                </div>
                            ))
                        ) : (
                            <div className='text-lg'>Tidak ada data jurusan.</div>
                        )}
                    </div>
                </div>
                <div className={`h-4/12 bg-primaryGray flex flex-col rounded-br-xl ${activeTab === "Jurusan" ? "" : "hidden"}`}>
                    <div className='flex flex-row p-4'>
                        <div className='w-1/2 p-4 py-1'>
                            <h1 className='text-lg font-bold'>Tambah Jurusan</h1>
                            <JurusanForm fakultasData={dropdownDataFakultas} setNewJurusanAdd={setNewJurusanAdd} /> 
                        </div>
                        <div className='w-1/2 flex flex-col'>
                            <h1 className='text-xl font-bold'>Mengunggah Jurusan</h1>
                            <h1 className='text-sm text-gray-500'>Unggah file dengan format .JSON</h1>
                            <JurusanUpload fakultasData={dropdownDataFakultas} setNewJurusanAdd={setNewJurusanAdd} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Control;