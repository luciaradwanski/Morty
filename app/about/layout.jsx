export default function AboutLayout ({children}){
    return (
        <div>
            <marquee style={{ background: 'black' , color: 'white'}}>Rick and Morty</marquee>
            {children}
        </div>
    )
}