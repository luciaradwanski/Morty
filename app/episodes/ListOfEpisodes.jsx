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
        <div className='p-4'>
            <div className='flex justify-center'>
                <div className='overflow-x-auto'>
                    <table className='table-auto mt-24 bg-violet-500/50 w-full sm:w-[800px]'>
                        <thead>
                            <tr>
                            <th className='px-4 py-2 text-white'>Id</th>
                            <th className='px-4 py-2 text-white'>Name</th>
                            <th className='px-4 py-2 text-white'>Episode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((r, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white/50' : 'bg-violet-500/50'}>
                                <td className='px-4 py-2 text-white text-base font-medium'>{r.id}</td>
                                <td className='px-4 py-2 text-white text-base font-medium'>{r.name}</td>
                                <td className='px-4 py-2 text-white text-base font-medium'>{r.episode}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mr-2'
                >
                Prev
                </button>
                <button
                onClick={handleNext}
                disabled={endIndex >= episodio.length}
                className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4'
                >
                Next
                </button>
            </div>
        </div>
    )
}