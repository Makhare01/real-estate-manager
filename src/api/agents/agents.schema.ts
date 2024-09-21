import { Tangent } from "lucide-react";
import { z } from "zod";

export const TAgent = z.object({
  id: z.number().int(),
  name: z.string(),
  surname: z.string(),
  avatar: z.string(),
});

export const TAgents = z.array(TAgent);

export type Agents = z.infer<typeof TAgents>;
