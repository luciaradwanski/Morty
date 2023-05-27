// import { Counter } from "./Counter"

export default function LocationLayout ({children}){
    return (
        <div>
            <marquee style={{ background: 'black' , color: 'white'}}>Rick and Morty</marquee>
            {/* <small>Home &bull; Posts</small> */}
            {/* <Counter/> */}
            {children}
        </div>
    )
}