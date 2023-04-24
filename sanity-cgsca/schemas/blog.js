
export default {
    name: 'blog',
    type: 'document',
      title: 'Blog',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation : Rule => Rule.required(),
      },
      {
        name : 'author',
        type : 'string',
        title : 'Author',
        default : 'admin',
      },
      {
         name : 'uploadDate',
         type : 'date',
         title : 'Upload Date',
         options : {
            dateFormat : 'DD-MM-YYYY',
        },
        defaultValue: new Date().toISOString().split('T')[0]
      },
      {
        name : 'headerImage',
        type : 'image',
        title : 'Header Image',
      },
      {
        name : 'content',
        type: 'array', 
        of: [{type: 'block'}],
        title : 'Content',
        validation : Rule => Rule.required(),
      }
    ]
  }