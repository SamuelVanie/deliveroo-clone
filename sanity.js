import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "4x5j2z3w",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

export default client;
