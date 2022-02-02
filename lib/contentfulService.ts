import { createClient } from "contentful";

const client = createClient({
  space: "x0aigtiomhhn",
  accessToken: "HoK3JaEhoUdiL2xUx6bKCfyhwHmn-FJ6HLavstAUPZY",
  host: "cdn.contentful.com",
});

export default client;

export async function fetchEntries() {
  const entries = await client.getEntries();

  if (!entries.items) {
    return [];
  }
  let data = entries.items.filter(
    () =>
      function (item) {
        return item.sys.contentType.sys.id === "newsConfig";
      }
  );
  const contentServiceData = data.map((item) => item.fields);

  return contentServiceData;
}
