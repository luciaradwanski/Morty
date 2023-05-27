import { Suspense } from 'react'
import {FormCreation} from './FormCreation'

export default async function FormPage(){
    return (
        <section>
            <Suspense fallback={<p>Cargando rooms...</p>}>
                <FormCreation/>
            </Suspense>
        </section>
    )
}