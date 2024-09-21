import { TAGS } from "@/lib/constants";
import { request } from "@/lib/request";
import { TCities } from "./location.schema";

export const getCities = async () => {
  return await request("/cities").get(
    {
      requestInit: {
        next: {
          tags: [TAGS.cities],
          revalidate: 300,
        },
      },
      withoutAuth: true,
    },
    TCities
  );
};

export const getRegions = async () => {
  return await request("/regions").get(
    {
      requestInit: {
        next: {
          tags: [TAGS.regions],
          revalidate: 300,
        },
      },
      withoutAuth: true,
    }
    // TRegions
  );
};
