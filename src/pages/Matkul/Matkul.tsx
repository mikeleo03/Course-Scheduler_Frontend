import MatkulCard from '../../components/Cards/MatkulCard'
import MatkulForm from '../../components/Forms/MatkulForms'
import MatkulUpload from '../../components/Forms/MatkulUpload'

interface matkulProps {
    matkulData : {
        id : number
        nama: string
        sks: number
        jurusan: string
        fakultas: string
        semmin: number
        prediksi: string
    }[];
    setNewMatkulAdd : (prop : boolean) => void;
    dropdownDataJurusan : string[];
}

const Matkul : React.FC<matkulProps> = ({ matkulData, setNewMatkulAdd, dropdownDataJurusan }) => {

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-7/12 p-8'>
                <div className='h-1/6'>
                    <h1 className='text-3xl font-bold'>Daftar Mata Kuliah</h1>
                    <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Berikut adalah mata kuliah yang tersimpan oleh sistem</h3>
                </div>
                <div className='overflow-y-auto h-5/6 mb-10'>
                    {matkulData ? (
                        matkulData.map((obj, index) => (
                        <MatkulCard
                            key={index}
                            nama={obj.nama}
                            jurusan={obj.jurusan}
                            fakultas={obj.fakultas}
                            SKS={obj.sks}
                            minsem={obj.semmin}
                            prediksi={obj.prediksi}
                        />
                        ))
                    ) : (
                        <div className='text-lg'>Tidak ada data mata kuliah</div>
                    )}
                </div>
            </div>
            <div className='w-5/12 bg-primaryGray p-8 flex-1 flex flex-col'>
                <div className='flex-1'>
                    <h1 className='text-xl font-bold'>Tambah Mata Kuliah</h1>
                    <MatkulForm jurusanData={dropdownDataJurusan} setNewMatkulAdd={setNewMatkulAdd} />
                </div>
                <div>
                    <div className='flex flex-row'>
                        <div className='w-5/6'>
                            <h1 className='text-xl font-bold'>Mengunggah Mata Kuliah</h1>
                            <h1 className='text-sm text-gray-500'>Unggah file dengan format .JSON</h1>
                        </div>
                        <div className='w-1/6 flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                    </div>
                    <MatkulUpload jurusanData={dropdownDataJurusan} setNewMatkulAdd={setNewMatkulAdd} />
                </div>
            </div>
        </div>
    )
}

export default Matkul;