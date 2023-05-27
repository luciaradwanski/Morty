'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { getDataEpisodes } from '../../store/episodeSlice/episodeSlice'


export function ListOfEpisodes(){
    const [loading, setLoading] = useState(true)
    const episodio = useSelector((state) => state.episodios.episodes)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            await dispatch(getDataEpisodes())
            /* getDataTypeRoom */
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 11;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = episodio.slice(startIndex, endIndex);

    const handlePrev = () => {
        setStartIndex(startIndex - itemsPerPage);
    };

    const handleNext = () => {
        setStartIndex(startIndex + itemsPerPage);
    };
  
    return (
        // <div className='flex justify-between content-center flex-wrap items-center gap-3 p-16 mt-32'>
        //     {episodio.slice(0,8).map(r => (
        //         <article className='bg-pink-200 w-[300px] h-[300px] rounded-3xl' key={r.id}>
        //             <Link className='text-pink-500 no-underline flex flex-col justify-between items-center' href='/pagination/[id]' as={`/pagination/${r.id}`}>
                        
        //                 <h2 className=' text-xl text-black'>{r.name}</h2>
        //                 <img className='flex justify-center' src={r.image} alt="" width='200px'/>
        //                 <h6 className=' text-xl text-black pt-1'>{r.status}</h6>
        //             </Link>
        //         </article>
        //     ))}
        //     {/* <Pagination
        //         totalPages={totalPages}
        //         currentPage={currentPage}
        //         onPageChange={handlePageChange}

        //     /> */}
        // </div>
        <div>
            <div className='flex justify-center'>
                <table className='table-auto mt-24 bg-pink-600'>
                <thead>
                    <tr>
                    <th className='px-4 py-2 text-white'>Id</th>
                    <th className='px-4 py-2 text-white'>Name</th>
                    <th className='px-4 py-2 text-white'>Type</th>
                    <th className='px-4 py-2 text-white'>Dimension</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((r, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-pink-200 '}>
                        <td className='px-4 py-2'>{r.id}</td>
                        <td className='px-4 py-2'>{r.name}</td>
                        <td className='px-4 py-2'>{r.type}</td>
                        <td className='px-4 py-2'>{r.dimension}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-4'>
                <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2'
                >
                Prev
                </button>
                <button
                onClick={handleNext}
                disabled={endIndex >= episodio.length}
                className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4'
                >
                Next
                </button>
            </div>
        </div>
    )
}