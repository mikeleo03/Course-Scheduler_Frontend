import React from "react";

interface sideBarComponent {
    setPage : (page : string) => void;
    page : string;
}

// Sidebar component
const Sidebar : React.FC<sideBarComponent> = ({ page, setPage }) => {

    const navigation = [
        {
            pageName: 'Schedule',
            name: 'Penjadwalan',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
            </svg>
            ,
        },
        {
            pageName: 'Matkul',
            name: 'Mata Kuliah',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>,
        },
        {
            pageName: 'Control',
            name: 'Fakultas - Jurusan',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>,
        }
    ]

    const navsFooter = [
        {
            href: '/',
            name: 'Bantuan',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            ,
        }
    ]

    return (
        <>
            <nav
                className="top-0 left-0 w-full h-full bg-primaryBlue rounded-l-xl">
                <div className="flex flex-col h-full">
                    <div className='h-20 flex items-center px-6 pt-3'>
                        <a href='/' className='flex-none pl-2'>
                            <h1 className='text-3xl font-bold text-light'>Atur.in</h1>
                            <h3 className='text-sm font-semibold text-light'>Perencana jadwal Anda</h3>
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto mt-2">
                        <ul className="pl-4 text-sm font-medium flex-1">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className={`py-1.5 my-3 rounded-l-xl pl-2 hover:bg-primaryYellow duration-150  ${page === item.pageName ? "bg-primaryYellow font-bold" : ""}`}>
                                        <button onClick={() => setPage(item.pageName)} className={`flex items-center gap-x-2 text-gray-600 p-2 rounded-l-xl active:bg-primaryYellow duration-150`}>
                                            <div className="text-gray-500">{item.icon}</div>
                                            <div className="text-light">{item.name}</div>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="pl-4 pb-4 text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx} className="my-2 pl-2">
                                            <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                <div className="text-light">{item.name}</div>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Sidebar;