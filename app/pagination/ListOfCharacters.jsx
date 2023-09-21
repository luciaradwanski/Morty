'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LikeButton } from './LikeButton'
import Link from 'next/link'
import { getDataCharacters} from '../../store/characterSlice/characterSlice'
import {Pagination} from './Pagination'
import {BsChatLeftHeartFill} from 'react-icons/bs'

export function ListOfCharacters() {
    const [loading, setLoading] = useState(true);
    const personaje = useSelector((state) => state.personajes.characters);
    const dispatch = useDispatch();

    const charactersPerPage = 8;
    const totalPages = Math.ceil(personaje.length / charactersPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
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
    
    return (
        <div className='translate-y-20'>
            
            <div className="flex flex-row flex-wrap justify-center dark:bg-black">
                {personaje.slice(startIndex, endIndex).map((r) => (
                <div key={r.id}>
                    <div className='w-[300px] h-[430px] rounded-8 shadow-md overflow-hidden m-2 text-center transition-all duration-250 bg-violet-500/50 text-white hover:-translate-y-1 hover:shadow-lg rounded-lg dark:bg-white dark:text-black'>
                        <div className="flex justify-between pl-4 pr-4 pt-2 py-2 items-center content-center row-auto gap-1">
                            <Link className='decoration-0' href="/pagination/[id]" as={`/pagination/${r.id}`}>
                                <LikeButton key={r.id} />
                            </Link>    
                            <h2 className='font-semibold text-base'>{r.name}</h2>
                        </div>  
                        <img className='w-[300px]' src={r.image} alt='img not found' />
                        <hr className='dark:bg-black'/>
                        <div className='flex flex-row justify-center items-center gap-6 mt-1'>
                        <BsChatLeftHeartFill className='animate-pulse'/>
                        <h3 className='font-medium'>{r.status}</h3>
                    </div>   
                    </div>
                </div>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
}