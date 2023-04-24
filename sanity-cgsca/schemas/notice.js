export default {
    name: 'notice',
    type: 'document',
      title: 'Notice',
    fields: [
      {
        name: 'noticeHeading',
        type: 'string',
        title: 'Notice Heading',
        validation : Rule => Rule.required()
      },
      {
        name : 'file',
        type : 'file',
        title : 'File'
      },
    ]
  }