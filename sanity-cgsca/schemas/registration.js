import { Rule } from "postcss";

export default {
    name: 'Registration',
    type: 'document',
      title: 'Registration',
    fields: [
        {
            name : 'id',
            type : 'string',
            title : 'Id',
            validation : Rule => Rule.required(),
        },
        {
            name : 'registrationDate',
            type : 'date',
            title : 'Registration Date',
            options : {
                dateFormat : 'DD-MM-YYYY',
            },
            validation : Rule => Rule.required(),
        },
      {
        name: 'firstName',
        type: 'string',
        title: 'First Name',
        validation : Rule => Rule.required()
      },
      {
         name : 'middleName',
         type : 'string',
         title : 'Middle Name'
      },
      {
        name : 'lastName',
        type : 'string',
        title : 'Last Name',
        validation : Rule => Rule.required()
      },
      {
        name : 'email',
        type : 'string',
        title : 'Email',
        validation : Rule => Rule.required()
      },
      {
        name : 'mobileNumber',
        type : 'string',
        title : 'Mobile Number',
        validation : Rule => Rule.required()
      },
      {
        name : 'parentName',
        type : 'string',
        title : 'Parent Name',
        validation : Rule => Rule.required(),
      },
      {
        name : 'relationship',
        title : 'Relationship',
        type : 'string',
        options: {
            list: [
              {title: 'Father', value: 'father'},
              {title: 'Mother', value: 'mother'},
              {title: 'Other', value: 'other'},
            ], 
          },
          validation: Rule => Rule.required()

      },
      {
        name : 'gender',
        title : 'Gender',
        type : 'string',
        options: {
            list: [
              {title: 'Male', value: 'male'},
              {title: 'Female', value: 'female'},
              {title: 'Other', value: 'other'},
            ], 
          },
          validation: Rule => Rule.required()
      },
      {
        name : 'dob',
        title : 'DOB',
        type : 'date',
        options : {
            dateFormat : 'DD-MM-YYYY',
        },
        validation: Rule => Rule.required()
      },
      {
        name : 'address',
        title : 'Address',
        type : 'string',
      },
      {
        name : 'district',
        title : 'District',
        type : 'string',
        options: {
                    list: [
                    {title: 'Balod', value: 'balod'},
                    {title: 'Baloda Bazar', value: 'baloda bazar'},
                    {title: 'Balrampur', value: 'balrampur'},
                    {title: 'Bastar', value: 'bastar'},
                    {title: 'Bemetara', value: 'bemetara'},
                    {title: 'Bijapur', value: 'bijapur'},
                    {title: 'Bilaspur', value: 'bilaspur'},
                    {title: 'Dantewada', value: 'dantewada'},
                    {title: 'Dhamtari', value: 'dhamtari'},
                    {title: 'Durg', value: 'durg'},
                    {title: 'Gariaband', value: 'gariaband'},
                    {title: 'Gaurela Pendra Marwahi', value: 'gaurelaPendraMarwahi'},
                    {title: 'Jashpur', value: 'jashpur'},
                    {title: 'Janjgir Champa', value: 'janjgirChampa'},
                    {title: 'Kabirdham', value: 'kabirdham'},
                    {title: 'Kanker', value: 'kanker'},
                    {title: 'Kondagaon', value: 'kondagaon'},
                    {title: 'Khairagarh Chhuikhadan Gandai', value: 'khairagarhChhuikhadanGandai'},
                    {title: 'Korba', value: 'korba'},
                    {title: 'Koriya', value: 'koriya'},
                    {title: 'Mahasamund', value: 'mahasamund'},
                    {title: 'Manendragarh Chirmiri Bharatpur', value: 'manendragarhChirmiriBharatpur'},
                    {title: 'Mohla Manpur', value: 'mohla manpur'},
                    {title: 'Mungeli', value: 'mungeli'},
                    {title: 'Narayanpur', value: 'narayanpur'},
                    {title: 'Raigarh', value: 'raigarh'},
                    {title: 'Raipur', value: 'raipur'},
                    {title: 'Rajnandgaon', value: 'rajnandgaon'},
                    {title: 'Sarangarh Bilaigarh', value: 'sarangarhBilaigarh'},
                    {title: 'Sakti', value: 'sakti'},
                    {title: 'Sukma', value: 'sukma'},
                    {title: 'Surajpur', value: 'surajpur'},
                    {title: 'Surguja', value: 'surguja'}
                    ], 
                }
      },
      {
        name : 'fideId',
        title : 'Fide Id',
        type : 'string'
      },
      {
        name : 'aicfId',
        title : 'Aicf Id',
        type : 'string'
      },
      {
        name : 'registrationType',
        title : 'Registration Type',
        type : 'string',
        options : {
            list : [
                {title : 'Player', value : 'player'},
                {title : 'Arbiter', value : 'arbiter'},
                {title : 'Coach', value : 'coach'}
            ]
        }
      },
      {
        name : 'photo',
        title : 'Photo',
        type : 'image',
        options : {
            hotspot : true,
        }
      },
      {
        name : 'dobProof',
        title : 'Dob Proof',
        type : 'image',
      },
      {
        name : 'paymentId',
        title : 'Payment Id',
        type : 'string',
      },
      {
        name: 'length',
        type: 'number',
        title: 'Membership Length (in years)',
        validation: Rule => Rule.required().min(1).max(5),
      },
      {
        name: 'status',
        type: 'string',
        title: 'Membership Status',
        options: {
          list: [
            {title: 'Active', value: 'active'},
            {title: 'Expired', value: 'expired'},
          ],
        },
        validation: Rule => Rule.required(),
      },
      {
        name : 'expiryDate',
        title : 'Expiry Date',
        type : 'date',
        options : {
            dateFormat : 'DD-MM-YYYY',
        },
        validation: Rule => Rule.required()
      },
    ],
  }