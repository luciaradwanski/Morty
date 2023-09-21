'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { filterByGender, filterByOrigin, filterBySpecies, filterByStatus, getDataCharacters, nameCharacters, orderByName } from '../store/characterSlice/characterSlice'
import {Pagination} from './Pagination'
import Card from './Card'


export function Filters() {
    const [loading, setLoading] = useState(true);
    const personaje = useSelector((state) => state.personajes.characters);
    const dispatch = useDispatch();

    const charactersPerPage = 4;
    const totalPages = Math.ceil(personaje.length / charactersPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const [, setOrden] = useState('')
    const [name, setName] = useState('')
    

    
    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await dispatch(getDataCharacters());
            /* getDataTypeRoom */
            setLoading(false);
        }
        fetchData();
    }, [dispatch]);
    if (loading) {
        return <p>Loading...</p>;
    }

    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;

    /* Search */
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log('Input value:', name);
        setCurrentPage(1)
    }

    const handleSubmit = (e) => {
        console.log('Search clicked, Name:', name);
        e.preventDefault()
        dispatch(nameCharacters(name))
        setCurrentPage(1)
    }

    /* fin de Search */

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(nameCharacters(name));
        setCurrentPage(1)
    }

    const handleFilterStatus = (e) => {
        dispatch(filterByStatus(e.target.value));
        setCurrentPage(1);
    }
    const handleFilterSpecies = (e) => {
        dispatch(filterBySpecies(e.target.value));
        setCurrentPage(1);
    }
    const handleFilterOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value));
        setCurrentPage(1);
    }
    const handleFilterGender = (e) => {
        dispatch(filterByGender(e.target.value));
        setCurrentPage(1);
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className='md:pl-20 p-2  translate-y-20'>
            <div className='grid sm:grid-cols-6 gap-2 py-2'>
                
                <Link href='/form'><button className='font-semibold w-full bg-black text-white rounded-2xl p-4 hover:bg-pink-700'>Create Character</button></Link>
                <button onClick={(e) => handleClick(e)} className='font-semibold bg-black text-white hover:bg-pink-700 p-1 rounded-2xl'>Reload</button>

            
                {/* <div className='grid sm:grid-cols-2 gap-2'>
                    <input className='font-semibold bg-black text-white rounded-2xl p-1 hover:bg-pink-700' type='text' placeholder="Search..." onChange={(e) => handleInputChange(e)}/> 
                    <button className='font-semibold bg-black text-white rounded-2xl p-1 hover:bg-pink-700' type="submit" onClick={(e) => handleSubmit(e)}>🔍</button>
                </div> */}
                <select className='font-semibold bg-black text-white  hover:bg-pink-700 p-1 rounded-2xl text-center' onChange={(e) => handleSort(e)}>
                    <option className='text-white bg-black text-justify' value="All">Orden</option>
                    <option className='text-white bg-black text-justify' value="asc">Ascendent</option>
                    <option className='text-white bg-black text-justify' value="desc">Descendent</option>
                </select>
                <select onChange={(e) => handleFilterStatus(e)} className='font-semibold bg-black text-white  hover:bg-pink-700 p-1 rounded-2xl text-center' >
                    <option className='text-white bg-black text-justify' value="All">All Status</option>
                    <option className='text-white bg-black text-justify' value="Alive">Alive</option>
                    <option className='text-white bg-black text-justify' value="Dead">Dead</option>
                    <option className='text-white bg-black text-justify' value="unknown">Unknown</option>
                </select>
                {/* <select onChange={(e) => handleFilterOrigin(e)} className='font-semibold bg-black text-white  hover:bg-pink-700 p-1 rounded-2xl text-center' >
                    <option className='text-white bg-black text-justify' value="All">All Origin</option>
                    <option className='text-white bg-black text-justify' value="Earth (C-137)">Earth C-137</option>
                    <option className='text-white bg-black text-justify' value="Earth">Earth</option>
                    <option className='text-white bg-black text-justify' value="Rick's Memories">Rick's Memories</option>
                    <option className='text-white bg-black text-justify' value="unknown">Unknown</option>
                </select> */}
                <select onChange={(e) => handleFilterSpecies(e)} className='font-semibold bg-black text-white  hover:bg-pink-700 p-1 rounded-2xl text-center' >
                    <option className='text-white bg-black text-justify' value="All">All Species</option>
                    <option className='text-white bg-black text-justify' value="Human">Human</option>
                    <option className='text-white bg-black text-justify' value="Alien">Alien</option>
                    <option className='text-white bg-black text-justify' value="unknown">Unknown</option>
                </select>
                <select onChange={(e) => handleFilterGender(e)} className='font-semibold bg-black text-white  hover:bg-pink-700 p-1 rounded-2xl text-center' >
                    <option className='text-white bg-black text-justify' value="All">All Gender</option>
                    <option className='text-white bg-black text-justify' value="Female">Female</option>
                    <option className='text-white bg-black text-justify' value="Male">Male</option>
                    <option className='text-white bg-black text-justify' value="unknown">Unknown</option>
                </select>
                
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            <div className="flex flex-row flex-wrap justify-center">
                {personaje.slice(startIndex, endIndex).map((r) => (
                <div key={r.id}>
                    <Card
                        name={r.name}
                        status={r.status}
                        image={r.image}
                    />
                </div>
                ))}
            </div>
        </div>
    );
}