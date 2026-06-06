import { ICustomWorld } from "../hooks/custom-world";

export async function getCall(iCustomWorld: ICustomWorld) {
  const apiUrl = process.env.APIURL || "https://google.com/";
  console.log("API URL", apiUrl);
  const response = await iCustomWorld.server?.post(apiUrl, {
    data: "",
    headers: {}
  });
  return await response?.json().then(
    async (res) => {
      iCustomWorld.logger?.info("Response returned : " + await res);
      return await res;
    },
    async (err) => {
      iCustomWorld.logger?.info(err); // Error!
      return err;
    });
}