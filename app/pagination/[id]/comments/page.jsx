

export default async function Post({ params }) {

    const {id} = params
    const comments = await fetchCommentsPost(id)

    return (
        <ul className="font-2xl bg-gray-800">
            {comments.map(c => (
                <li key={c.id}>
                    <h4>{c.name}</h4>
                    <small>{c.body}</small>
                </li>
            ))}
        </ul>
    )
}