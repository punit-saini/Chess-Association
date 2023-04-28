export default {
    name: 'contact',
    type: 'document',
      title: 'Contact',
    fields: [
      {
        name: 'name',
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
        name : 'message',
        type : 'text',
        title : 'Message',
        validation : Rule => Rule.required()
      },
    ]
  }