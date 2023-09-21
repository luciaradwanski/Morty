'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {charactersPost, getDataCharacters} from '../../store/characterSlice/characterSlice'
import { getDataEpisodes } from '@/store/episodeSlice/episodeSlice';

const validate = (input) => { //regex - y + que no se pueda 
    let error = {};
    if(!/[A-Za-z0-9]/.test(input.name)){
        error.name = 'El nombre admite solo letras, numeros y espacios'     
    }if(!input.name){
        error.name = 'Debe ingresar un nombre'
    }if(!input.status){
        error.status = 'Debe ingresar un status'
    }if(!input.species){
        error.species = 'Debe ingresar un species'
    }if(!input.gender){
        error.gender = 'Debe ingresar un gender'
    }if(!input.origin){
        error.origin = 'Debe ingresar un origin'
    }if(!input.image){
        error.image = 'Debe ingresar una imagen'
    }if(input.episode.length === 0){
        error.paises = 'Debe seleccionar al menos un episodio'    
    }
    return error;
}

export function  FormCreation(){

    const dispatch = useDispatch()
    const personaje = useSelector((state) => state.personajes.characters)
    const episodio = useSelector((state) => state.episodios.episodes)
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name: '',
        status: '',
        species: '',
        gender: '',
        origin: {
            name: '',
            url: ''
        },
        image: '',
        episode: [],
        url:''
    })


    const handleChange = (e) => {
        setError(validate({
            ...input, 
            [e.target.name]: e.target.value
        }));
        setInput({
            ...input, 
            [e.target.name] : e.target.value
        });
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput({ ...input, episode: [...input.episode, e.target.value]})
        setError(validate({ ...input, episode: [...input.episode, e.target.value]}))  
    }
    
    const handleSubmit = (e) => {

        if(!input.name || !input.status || !input.species || !input.gender || !origin || !input.image || !input.episode.length) {
            return swal('Cannot create Character!', '', 'error')
        } else {

            e.preventDefault()
            console.log(input)
            setError(validate({...input, [e.target.name]: e.target.value}));
            dispatch(charactersPost(input))
            swal("Created Character", "", "success")
                            
            setInput({
                name: '',
                status: '',
                species: '',
                gender: '',
                origin: {
                    name: '',
                    url: ''
                },
                image: '',
                episode: [],
                url:''
            })                  
        }
    }

    const handleDelete = (e) => {
        setInput({ ...input, episode: input.episode.filter(c => c!==e)})
        
    }

    const mapOriginNames = () => {
        return input.origin.map((origin) => origin.name);
    };

    useEffect(() => {
        dispatch(getDataCharacters())
        dispatch(getDataEpisodes())
    },[dispatch])

    return(
        
            <div className=' w-full h-800'>

                <div className='max-w-[600px] m-auto md:pl-20 p-4 py-24 translate-y-20'>
                    <div className='flex flex-col justify-between items-center content-center w-full'>
                        <form className='bg-violet-500/50 p-4 rounded-lg' onSubmit={(e) => handleSubmit(e)}>
                            <div className='flex flex-col'>
                                    <label className='uppercase text-sm py-1 text-white'>Name</label>
                                    <input className='border-2 rounded-lg p-2 flex border-gray-300' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}></input>                            
                                    {error.name && (<p className='text-red-500 font-bold text-xs mb-5 absolute mt-24'>{error.name}</p>)}
                                </div>
                            <div className='grid md:grid-cols-2 gap-4 w-full py-1'>
                                
                                <div className='flex flex-col'>
                                    <label className='uppercase text-sm py-1 text-white'>Image</label>
                                    <input className='border-2 rounded-lg p-2 flex border-gray-300' type='text' value={input.image} name='image' onChange={(e) => handleChange(e)}></input>                            
                                    {error.image && (<p className='text-red-500 font-bold text-xs mb-5 absolute mt-24'>{error.image}</p>)}
                                </div>
                                <div className='flex flex-col py-1'>

                                    <label className='uppercase text-sm py-1 text-white'>Origin</label>
                                    <select className='border-2 rounded-lg p-2 flex border-gray-300' name='origin' onChange={e=>handleSelect(e)}>
                                        
                                        {personaje && personaje.length > 0 && personaje.map((p, index)=>( 
                                            <option key={index} value={p.id}>{p.origin.name}</option>  //ordenar por orden alfabetico
                                        ))}
                                    </select>    
                                    {error.episode && (<p className='text-red-500 font-bold text-xs mt-24 mb-5 absolute '>{error.episode}</p>)}
                                </div>
                            </div> 
                            <div className='grid md:grid-cols-2 gap-4 w-full py-1'>
                            
                                <div className='flex flex-col py-1'>
                                    <label className='uppercase text-sm py-1 text-white'>Status</label>
                                    <select className='border-2 rounded-lg p-2 flex border-gray-300' name='status' onChange={(e) => handleChange(e)}>
                                        <option value=''>All Status</option>
                                        <option value={"Alive"}>Alive</option>
                                        <option value={"Dead"}>Dead</option>
                                        <option value={"unknown"}>Unknown</option>
                                    </select>
                                    {error.status && (<p className='text-red-500 font-bold text-xs mb-5 absolute mt-24'>{error.status}</p>)}
                                </div>
                                <div className='flex flex-col py-1'>
                                    <label className='uppercase text-sm py-1 text-white'>Species</label>
                                    <select className='border-2 rounded-lg p-2 flex border-gray-300' name='species' onChange={(e) => handleChange(e)}>
                                        <option value=''>All Species</option>
                                        <option value={"Human"}>Human</option>
                                        <option value={"Alien"}>Alien</option>
                                        <option value={"unknown"}>Unknown</option>
                                    </select>
                                    {error.species && (<p className='text-red-500 font-bold text-xs mb-5 absolute mt-24'>{error.species}</p>)}
                                </div>
                            </div>  

                            <div className='grid md:grid-cols-2 gap-4 w-full py-1'> 
                                <div className='flex flex-col py-2'>
                                    <label className='uppercase text-sm py-1 text-white'>Gender</label>
                                    <select className='border-2 rounded-lg p-2 flex border-gray-300' name='gender' onChange={(e) => handleChange(e)}>
                                        <option value=''>All Gender</option>
                                        <option value={"Female"}>Female</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"unknown"}>Unknown</option>
                                    </select>
                                    {error.gender && (<p className='text-red-500 font-bold text-xs mb-5 absolute mt-24'>{error.gender}</p>)}
                                </div>
                                
                                
                                <div className='flex flex-col py-1'>

                                    <label className='uppercase text-sm py-1 text-white'>Episodes</label>
                                    <select className='border-2 rounded-lg p-2 flex border-gray-300' name='episode' onChange={e=>handleSelect(e)}>
                                        
                                        {episodio && episodio.length > 0 && episodio.map((p, index)=>( 
                                            <option key={index} value={p.id}>{p.episode}</option>  //ordenar por orden alfabetico
                                        ))}
                                    </select>    
                                    {error.episode && (<p className='text-red-500 font-bold text-xs mt-24 mb-5 absolute'>{error.episode}</p>)}
                                </div>

                            </div>    
                                {input.episode.length === 0 && 
                                    <div className='flex flex-row justify-center items-center gap-6'>
                                        <ul className='rounded-full w-10 h-10 bg-gray-800'>
                                            <li>{input.episode.map(el => el + " ,")}</li>
                                        </ul>                        
                                    </div>
                                }
                            
                            <button className='text-gray-100 bg-[#001b5e] rounded-md mt-4 w-full p-4 hover:bg-violet-700 justify-between' type="submit">
                                Create
                            </button>
                                
                        </form>
                    </div>
                    
                    <div>
                        {input.episode && input.episode.length > 0 && input.episode.map((episodio, index) => (
                            <div className='flex flex-row justify-center items-center gap-6 ' key={index}>
                                <span className='bg-blue-300 rounded-2xl w-10 flex justify-center content-center'>{episodio}</span>
                                <button className='bg-blue-300 rounded-2xl w-10' onClick={() => handleDelete(episodio)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
                
                
            </div>

            
    )
}