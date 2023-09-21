'use client'

// export function Pagination ({ totalPages, currentPage, onPageChange }) {
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <nav className="text-center flex justify-between row-auto gap-4 mr-16 ml-20 items-center content-center">
//             <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="bg-blue-300">Prev</button>
//             <ul className='inline-block p-0 m-0 gap-4'>
//                 {pageNumbers.map((number) => (
//                 <li className='inline bg-black' key={number} >
//                     <a className='text-white  w-10 float-left px-2 py-1 no-underline transition duration-300 border border-white border-opacity-30  hover:bg-pink-700 hover:text-black' 
//                     onClick={() => onPageChange(number)}>{number}</a>
//                 </li>
//                 ))}
//             </ul>
//             <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="bg-blue-300">Next</button>
//         </nav>
//     );
// };

export function Pagination({ totalPages, currentPage, onPageChange }) {

    const pageNumbers = [];

    // Define el número máximo de números de página que deseas mostrar a la vez
    const maxPageNumbers = 5;

    // Calcula el rango de números de página a mostrar
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    // Asegúrate de que haya suficientes números de página antes del rango
    if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }  

    // Genera los números de página dentro del rango calculado
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="text-center flex justify-center row-auto gap-4 items-center content-center">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="bg-blue-300 p-2 rounded-xl hover:bg-cyan-600">
            Prev
            </button>
            <ul className="inline-block p-0 m-0 gap-4">
            {pageNumbers.map((number) => (
                <li className="inline bg-black" key={number}>
                <a
                    className={`text-white w-10 float-left px-2 py-1 no-underline transition duration-300 border border-white border-opacity-30 hover:bg-cyan-700 hover:text-black ${
                    number === currentPage ? 'bg-cyan-600' : ''
                    }`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </a>
                </li>
            ))}
            </ul>
            <button 
                disabled={currentPage === totalPages}   
                onClick={() => onPageChange(currentPage + 1)} 
                className="bg-blue-300 p-2 rounded-xl">
                Next
            </button>
        </nav>
    );
}