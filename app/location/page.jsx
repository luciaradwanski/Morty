
import { Suspense } from 'react'
import {ListOfLocation} from './ListOfLocation'

export default async function LocationPage(){
    return (
        <section>
            <Suspense fallback={<p>Cargando rooms...</p>}>
                <ListOfLocation/>
            </Suspense>
        </section>
    )
}