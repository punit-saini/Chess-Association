export default {
    name: 'contact',
    type: 'document',
      title: 'Contact',
    fields: [
      {
        name: 'Name',
        type: 'string',
        title: 'Notice Heading',
        validation : Rule => Rule.required()
      },
      {
        name : 'email',
        type : 'string',
        title : 'Email',
        validation : Rule => Rule.required()
      },
      {
        name : 'query',
        type : 'text',
        title : 'Query',
        validation : Rule => Rule.required()
      },
      {
        name : 'mobile',
        type : 'string',
        title : 'Mobile',
      },
    ]
  }