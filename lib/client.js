// import sanityClient from '@sanity/client';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: "qqqmpyde",
    dataset: "production",
    apiVersion: "2023-04-24",
    useCdn: false,
    token : process.env.sanity_token
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);