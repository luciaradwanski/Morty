import { Suspense } from 'react'
import {ListOfEpisodes} from './ListOfEpisodes'

export default async function EpisodePage(){
    return (
        <section>
            <Suspense fallback={<p>Cargando rooms...</p>}>
                <ListOfEpisodes/>
            </Suspense>
        </section>
    )
}