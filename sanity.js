import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "xflz7n6y",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

export default client;
