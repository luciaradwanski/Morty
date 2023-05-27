'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LikeButton } from './LikeButton'
import Link from 'next/link'
import { getDataCharacters } from '../../store/characterSlice/characterSlice'
import {Pagination} from './Pagination'

export function ListOfCharacters() {
    const [loading, setLoading] = useState(true);
    const personaje = useSelector((state) => state.personajes.characters);
    const dispatch = useDispatch();

    const charactersPerPage = 5;
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
        <div className='mt-20'>
            <div className="flex justify-between content-center flex-wrap items-center  gap-1 ml-8 mr-8 my-4 mt-24 ">
                {personaje.slice(startIndex, endIndex).map((r) => (
                <article className="bg-blue-200 w-[250px] h-[350px] rounded-3xl " key={r.id}>
                    <Link className="text-pink-500 no-underline flex flex-col justify-between items-center" href="/pagination/[id]" as={`/pagination/${r.id}`}>
                        <div className="flex justify-between row-auto gap-1">
                            <LikeButton key={r.id} />
                            <h2 className="text-xl text-black Shlop">{r.name}</h2>
                        </div>
                        <img className="flex justify-center " src={r.image} alt="" width="250px" />
                        <h6 className="text-xl text-black pt-1">{r.status}</h6>
                    </Link>
                </article>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
}
  