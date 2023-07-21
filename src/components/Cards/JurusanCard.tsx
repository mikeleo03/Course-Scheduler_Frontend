import React from 'react'

interface JurusanCardProps {
    nama: string,
    fakultas: string
}

const JurusanCard : React.FC<JurusanCardProps> = ({ nama, fakultas }) => {
    return (
        <div className='w-full rounded-xl bg-blueCard flex flex-row p-3.5 text-white'>
            <div className='w-1/6 flex items-center justify-center pr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="flex items-center justify-center w-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            </div>
            <div className='w-5/6'>
                <h1 className='font-medium text-xl'>{nama}</h1>
                <span className='font-semibold text-base'>Fakultas : </span>{fakultas}<br></br>
            </div>
        </div>
    )
}

export default JurusanCard;