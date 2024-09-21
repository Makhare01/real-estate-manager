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

const TAgent = z.object({
  id: z.number().int(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  avatar: z.string(),
  phone: z.string(),
});

export type Agent = z.infer<typeof TAgent>;

export const TRealEstateDetails = z.intersection(
  TRealEstate,
  z.object({
    description: z.string(),
    agent_id: z.number().int(),
    agent: TAgent,
    created_at: z.string(),
  })
);

export type RealEstateDetails = z.infer<typeof TRealEstateDetails>;
