import React from 'react'

interface MatkulCardProps {
    nama: string
    jurusan: string
    fakultas: string
    SKS: number
    minsem: number
    prediksi: string
}

const MatkulCard : React.FC<MatkulCardProps> = ({ nama, jurusan, fakultas, SKS, minsem, prediksi }) => {
    return (
        <div className="w-full rounded-xl bg-redCard h-40 flex flex-row p-2.5 mb-4">
            <div className="flex flex-col w-5/6 p-1 mx-2">
                <div className='flex flex-row h-4/5 text-light space-x-2'>
                    <div className='w-1/4 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="flex items-center justify-center h-full pr-5 pb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                        </svg>
                    </div>
                    <div className='w-3/4'>
                        <p className='font-semibold text-lg'>{nama}</p>
                        <span className='font-semibold'>Jurusan : </span>{jurusan}<br></br>
                        <span className='font-semibold'>Fakultas : </span>{fakultas}
                    </div>
                </div>
                <div className='flex flex-row h-1/5 text-light'>
                    <div className='w-1/2'>
                        <span className='font-semibold'>SKS : </span>{SKS}
                    </div>
                    <div className='w-1/2'>
                        <span className='font-semibold'>Semester min. : </span>{minsem}
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-1/6 p-1 mx-2'>
                <div className='h-1/5 text-light'>
                    <p className='font-semibold text-center'>Prediksi</p>
                </div>
                <div className='h-2/5 text-3xl rounded-xl bg-white my-2 flex justify-center items-center'>
                    <p className="text-center font-bold">{prediksi}</p>
                </div>
            </div>
        </div>
    )
}

export default MatkulCard;