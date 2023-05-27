import Link from "next/link";

const links = [{
    label: 'Home',
    route: '/'
}, {
    label: 'Characters',
    route: '/pagination',
},{
    label: 'Form',
    route: '/form'
}, {
    label: 'Location',
    route: '/location',
},{
    label: 'Episodes',
    route: '/episodes'
}, {
    label: 'About',
    route: '/about',
}]

export function Navigation(){
    return  (
        <header className="bg-black rounded-4 p-2 fixed z-50 w-full ">
            <nav>
                <ul className="flex items-center justify-evenly content-center list-none text-white">
                    {/* <ion-icon name="bed-outline"></ion-icon> */}
                    {links.map(({label, route}) => (
                        <li key={route}>
                        <Link className="text-white no-underline hover:text-pink-500" href={route}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}