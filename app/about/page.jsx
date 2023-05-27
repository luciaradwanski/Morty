import { Suspense } from 'react'
import {About} from './About'

export default async function AboutPage(){
    return (
        <section>
            <Suspense fallback={<p>Cargando mis datos...</p>}>
                <About/>
            </Suspense>
        </section>
    )
}