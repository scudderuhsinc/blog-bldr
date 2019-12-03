export default {
    name: 'authorReference',
    type: 'object',
    fields: [
        {
            name: 'author',
            type: 'reference',
            to: { type: 'user' }
        }
    ],
    preview: {
        select: {
            title: 'user.name',
            media: 'user.authorDetails.mainImage'
        }
    }
}