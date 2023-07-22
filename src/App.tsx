import { useState, useEffect } from "react";
import './App.css'
import Schedule from "./pages/Schedule/Schedule";
import Matkul from "./pages/Matkul/Matkul";
import Control from "./pages/Control/Control";
import Sidebar from "./components/Sidebar/Sidebar";
import Splashcreen from "./components/Splashscreen/Splashscreen";
import { ToastContainer } from 'react-toastify';

const url = import.meta.env.VITE_NODE_ENV=='development' ? import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV : import.meta.env.VITE_REACT_APP_BACKEND_URL;

const backgroundStyle = {
  backgroundColor : "#ECEEF9",
  height: "auto",
  width: "100vw",
  minHeight: "100vh",
  maxHeight: "100vh",
}

function App() {
  // Page switching handler
  const [page, setPage] = useState("Schedule");

  // Data sharing to minimizing get
  const [matkulData, setMatkulData] = useState<{
    id : number
    nama: string
    sks: number
    jurusan: string
    fakultas: string
    semmin: number
    prediksi: string
  }[]>([]);
  const [fakultasData, setFakultasData] = useState<{
    id : number
    nama: string
  }[]>([]);
  const [jurusanData, setJurusanData] = useState<{
    id : number
    nama: string
    fakultas: string
  }[]>([]);

  // Trigger for every update data
  const [newMatkulAdd, setNewMatkulAdd] = useState<boolean>();
  const [newFakulAdd, setNewFakulAdd] = useState<boolean>();
  const [newJurusanAdd, setNewJurusanAdd] = useState<boolean>();

  // Dropdown data to help forms
  const [dropdownDataJurusan, setDropdownDataJurusan] = useState<string[]>([]);
  const [dropdownDataFakultas, setDropdownDataFakultas] = useState<string[]>([]);

  // The use-effects trigger
  // 1. Data mata kuliah
  useEffect(() => {
    fetch(url + "/api/mk", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // Update state
            setMatkulData(data);
        });
  }, [matkulData, newMatkulAdd]);
  // 2. Data fakultas
  useEffect(() => {
    fetch(url + "/api/fakul", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // Update state
            setFakultasData(data);
            setDropdownDataFakultas(data.map((item: { nama: string }) => item.nama));
        });
  }, [fakultasData, newFakulAdd]);
  // 3. Data jurusan
  useEffect(() => {
    fetch(url + "/api/jurusan", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // Update state
            setJurusanData(data);
            setDropdownDataJurusan(data.map((item: { nama: string }) => item.nama));
        });
  }, [jurusanData, newJurusanAdd]);

  return (
    <>
    <Splashcreen />
      <div style={backgroundStyle} className="flex p-[1.5vh]">
        <ToastContainer />
        <div className="w-full bg-light flex rounded-xl">
          <div className='w-1/6'>
            <Sidebar page={page} setPage={setPage} />
          </div>
          <div className="w-5/6 h-full">
            {page === "Schedule" && <Schedule dropdownDataJurusan={dropdownDataJurusan}/>}
            {page === "Matkul" && <Matkul matkulData={matkulData} setNewMatkulAdd={setNewMatkulAdd} dropdownDataJurusan={dropdownDataJurusan}/>}
            {page === "Control" && <Control fakultasData={fakultasData} setNewFakulAdd={setNewFakulAdd} jurusanData={jurusanData} setNewJurusanAdd={setNewJurusanAdd} dropdownDataFakultas={dropdownDataFakultas}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
