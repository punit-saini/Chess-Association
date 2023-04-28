
export default {
    name: 'blog',
    type: 'document',
      title: 'Blog',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => [Rule.required().min(40).error('min 40'),Rule.required().max(100).error('A title of max. 100 characters is required')]
        
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
        validation: Rule => Rule.required()
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