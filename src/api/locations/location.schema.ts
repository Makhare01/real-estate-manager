import { z } from "zod";

export const TCities = z.array(
  z.object({
    id: z.number().int(),
    name: z.string(),
    region_id: z.number().int(),
  })
);

export type Cities = z.infer<typeof TCities>;
