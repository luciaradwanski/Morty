'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLocation } from '@/store/locationSlice/locationSlice';

export function ListOfLocation() {
    const lugar = useSelector(state => state.lugares.location)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataLocation())
    }, [dispatch])

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 10;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = lugar.slice(startIndex, endIndex);

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
                                <th className='px-4 py-2 text-white'>Type</th>
                                <th className='px-4 py-2 text-white'>Dimension</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((r, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white/50' : 'bg-violet-500/50'}>
                                    <td className='px-4 py-2 text-white text-base font-medium'>{r.id}</td>
                                    <td className='px-4 py-2 text-white text-base font-medium'>{r.name}</td>
                                    <td className='px-4 py-2 text-white text-base font-medium'>{r.type}</td>
                                    <td className='px-4 py-2 text-white text-base font-medium'>{r.dimension}</td>
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
                    disabled={endIndex >= lugar.length}
                    className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4'
                >
                    Next
                </button>
            </div>
        </div>
    );
}