const Heading = ({
    title,
    desc,
    children,
}: {
    title: string
    desc?: string
    children?: JSX.Element
}) => {
    return (
        <div className="space-y-2 md:space-y-3 border-b w-fit mx-auto border-black/50 dark:border-white/50 p-2">
            <h1 className="font-bold capitalize w-full text-center text-2xl md:text-3xl lg:text-4xl text-black dark:text-white">
                {title}
            </h1>
            {desc ? (
                <p className="text-sm md:text-base text-center w-full">
                    {desc}
                </p>
            ) : (
                children
            )}
        </div>
    )
}

export default Heading
