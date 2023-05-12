function formatTags(tags: string) {
    const tagsArr = tags.split(",")
    const result = tagsArr.map((tag) => tag.trim())
    return result
}

function tagsToString(tags: string[]) {
    return tags.join(", ")
}

function formatPostPayload(values: PostRequestBody) {
    const title = values.title.trim()
    const content = values.content.trim()
    const description = values.description.trim()
    const tags = typeof values.tags === "string" && formatTags(values.tags)

    return { title, content, description, tags }
}

export { formatTags, tagsToString, formatPostPayload }
