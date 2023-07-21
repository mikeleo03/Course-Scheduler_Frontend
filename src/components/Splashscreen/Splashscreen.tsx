import { useState } from "react";
import scheduleMain from "../../assets/icon/schedule-main.png"

const Splashcreen = () => {
    const [top, setTop] = useState(0);

    return (
        <div
            className={`absolute flex flex-col bg-[#ECEEF9] w-screen h-screen z-50 justify-center items-center ease-in-out cursor-pointer space-y-3`}
            style={{top : `${top}px`, transitionDuration : "0.8s"}}
            onClick={() => setTop(-2000)}
        >
            <div className="transition duration-150 ease-in-out">
                <img src={scheduleMain} alt="schedule" id="schedule" className="w-40 hover:w-44 duration-150 ease-in-out"/>
            </div>
            <div className="flex flex-col justify-center items-center transition hover:duration-150 ease-in-out">
                <h1 className='text-5xl font-bold'>Atur.in</h1>
                <h3 className='text-xl py-1.5 font-semibold text-primaryBlue'>Perencana jadwal Anda</h3>
            </div>
            <div>
                <p className='text-base font-light'>Rencanakan pengambilan mata kuliah Anda bersama kami!</p>
            </div>
        </div>
    )
}

export default Splashcreen;