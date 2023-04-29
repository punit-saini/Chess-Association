
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
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200, // will be ignored if slugify is set
          slugify: input => input
                               .toLowerCase()
                               .replace(/\s+/g, '-')
                               .slice(0, 50)
        },
        validation: Rule => Rule.required()
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