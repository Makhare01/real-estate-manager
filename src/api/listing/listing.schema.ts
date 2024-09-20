import { z } from "zod";

const TRegion = z.object({
  id: z.number().int(),
  name: z.string(),
});

const TCity = z.object({
  id: z.number().int(),
  name: z.string(),
  region_id: z.number().int(),
  region: TRegion,
});

export const TRealEstate = z.object({
  id: z.number().int(),
  address: z.string(),
  zip_code: z.string(),
  price: z.number(),
  area: z.number(),
  bedrooms: z.number().int(),
  is_rental: z.number().int(),
  image: z.string(),
  city_id: z.number().int(),
  city: TCity,
});

export type RealEstate = z.infer<typeof TRealEstate>;
