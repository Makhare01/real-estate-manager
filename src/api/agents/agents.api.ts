import { TAGS } from "@/lib/constants";
import { request } from "@/lib/request";
import { TAgent, TAgents } from "./agents.schema";
import { AddAgentFormValues } from "@/components/navigation-buttons/add-agent-button";

export const getAgents = async () => {
  return await request("/agents").get(
    {
      requestInit: {
        next: {
          tags: [TAGS.agents],
          revalidate: 300,
        },
      },
    },
    TAgents
  );
};

export const addAgent = async (body: AddAgentFormValues) => {
  return await request("/agents").post(
    {
      type: "file",
      body,
    },
    TAgent
  );
};
