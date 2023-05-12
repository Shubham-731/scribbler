import Head from "next/head"

interface ComponentProps {
    title: string
    description: string
    url: string
    author?: string
    category?: string
    tags?: string
}

const SEO = ({
    title,
    description,
    url,
    author,
    category,
    tags,
}: ComponentProps) => {
    return (
        <Head>
            <title>Scribbler</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta name="robots" content="index, follow" />

            <meta name="author" content={author} />
            <meta name="category" content={category} />
            <meta name="keywords" content={tags} />
        </Head>
    )
}

export default SEO
