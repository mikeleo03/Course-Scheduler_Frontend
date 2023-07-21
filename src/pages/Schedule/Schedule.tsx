import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import JadwalForm from '../../components/Forms/JadwalForms';
import DoughnutChart from '../../components/Chart/DoughnutChart';
import MatkulCard from '../../components/Cards/MatkulCard'
import Chart from "chart.js/auto";
import { CategoryScale, Colors } from "chart.js";

Chart.register(CategoryScale);
Chart.register(Colors);

interface scheduleProps {
    dropdownDataJurusan : string[];
}

const Schedule : React.FC<scheduleProps> = ({ dropdownDataJurusan }) => {
    const arrayColor = ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40', '#9966ff', '#c9cbcf' ]

    function getRandomizedColor(originalList: string[], newListLength: number) : string[] {
        const shuffledList = [...originalList]; // Create a shallow copy of the original list
      
        // Fisher-Yates shuffle algorithm
        for (let i = 0; i < newListLength; i++) {
            const randomIndex = Math.floor(Math.random() * originalList.length) % newListLength;
            [shuffledList[i], shuffledList[randomIndex]] = [shuffledList[randomIndex], shuffledList[i]];
        }        
      
        // Trim the shuffled list to the desired length
        return shuffledList.slice(0, newListLength);
    }

    const [data, setData] = useState<{
        labels: string[]; 
        datasets: {
            label: string; 
            data: number[]; 
            backgroundColor: string[];
            hoverOffset: number; 
        }[]; 
    }>({
        labels: [],
        datasets: [{
            label: 'SKS',
            data: [],
            backgroundColor: getRandomizedColor(arrayColor, 0),
            hoverOffset: 4
        }]
    });

    const [resultData, setResultData] = useState<{
        id : number
        nama: string
        sks: number
        jurusan: string
        fakultas: string
        semmin: number
        prediksi: string
    }[]>([]);
    const [score, setScore] = useState(0.0);
    const [sks, setSks] = useState(0);

    // Fetch data process, update list jurusan every data is sent
    useEffect(() => {
        resultData ?
        setData({
            labels: resultData.map((item: { nama: string }) => item.nama),
            datasets: [{
                label: 'SKS',
                data: resultData.map((item: { sks: number }) => item.sks),
                backgroundColor: getRandomizedColor(arrayColor, resultData.length),
                hoverOffset: 4
            }]
        }) :
        toast.error("Tidak terdapat mata kuliah yang memenuhi kondisi. Silahkan ubah data.", {
            position: toast.POSITION.TOP_RIGHT
        });
    }, [resultData]);

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='h-1/6 p-6'>
                <h1 className='text-3xl font-bold'>Penjadwalan</h1>
                <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Atur perencanaan pengambilan mata kuliah Anda disini</h3>
            </div>
            <div className='h-1/6 bg-primaryGray py-2 flex items-center w-full'>
                <JadwalForm jurusanData={dropdownDataJurusan} setResultData={setResultData} setScore={setScore} setSks={setSks}/>
            </div>
            <div className='h-4/6 p-5 flex flex-row'>
                <div className="w-1/2 flex flex-col h-full">
                    <div className="h-11/12 justify-center items-center flex">
                        {resultData && <DoughnutChart chartData={data} />}
                    </div>
                    <div className="h-1/12 pl-3">
                        {(resultData) ? (
                            <div className="flex flex-row space-x-5">
                                <div className='text-lg py-auto font-semibold text-primaryBlue'>
                                    Total IP : {score.toFixed(2)}
                                </div>
                                <div className='text-lg py-auto font-semibold text-primaryBlue'>
                                    SKS : {sks}
                                </div>
                            </div>
                            ) : (
                            '-'
                        )}
                    </div>
                </div>
                <div className="w-1/2 flex flex-col">
                    <div className="h-1/6 mb-3">
                        <h1 className='text-xl font-bold'>Daftar Mata Kuliah Terpilih</h1>
                        <h3 className='text-base py-1.5 font-semibold text-primaryBlue'>Berikut adalah mata kuliah yang mungkin dapat Anda ambil</h3>
                    </div>
                    <div className="h-5/6 overflow-y-auto">
                        {resultData ? (
                            resultData.map((obj, index) => (
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
                            <div className='text-lg'>Tidak ada data mata kuliah yang memenuhi kondisi.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;