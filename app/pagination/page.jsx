
import { Suspense } from 'react'
import {ListOfCharacters} from './ListOfCharacters'
export default async function PostsPage(){
    return (
        <section>
            <Suspense fallback={<p>Cargando rooms...</p>}>
                <ListOfCharacters/>
            </Suspense>
        </section>
    )
}
