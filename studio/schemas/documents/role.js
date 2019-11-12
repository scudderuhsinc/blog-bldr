export default {
    name: 'role',
    type: 'document',
    title: 'Role',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe this role and all associated privilages.'
        }
    ]
}