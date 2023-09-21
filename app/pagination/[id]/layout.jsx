// import Link from "next/link"

const fetchSingleCharacter = (id) => {
    return fetch(`http://localhost:3001/characters/${id}`, {
        next: {
            revalidate: 60
        }
    })
    .then(res => res.json())
}

export default async function Pagination({ children, params }) {

    const {id} = params
    const idCharacter = await fetchSingleCharacter(id)

    return (
        <div className="mt-24 w-full">
            <article className="flex row-auto justify-center gap-24 items-center content-center">
                <div className="">
                    <h1 className="text-violet-300 ">{idCharacter.name}</h1> 
                    <img className="rounded-full shadow-[0_35px_60px_-15px_rgba(246, 3, 3, 0.796)]" src={idCharacter.image} alt="" />
                </div>
                <div className="flex justify-between items-center content-center row-auto gap-16">
                    <h3 className="text-violet-300 font-shlop">{idCharacter.status}</h3>
                    <h5 className="text-violet-300">{idCharacter.species}</h5>
                    <h5 className="text-violet-300">{idCharacter.origin.name}</h5>
                    <h5 className="text-violet-300">{idCharacter.gender}</h5>
                    <h5 className="text-violet-300">{idCharacter.episode.length}</h5>
                </div>
                {/* <Link href={`/posts/${id}/comments`}>Ver comentarios</Link> */}
                {children}
            </article>
        </div>
    )
}