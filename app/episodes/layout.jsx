export default function EpisodeLayout ({children}){
    return (
        <div>
            <marquee style={{ background: 'black' , color: 'white'}}>Rick and Morty</marquee>
            {/* <small>Home &bull; Posts</small> */}
            {/* <Counter/> */}
            {children}
        </div>
    )
}