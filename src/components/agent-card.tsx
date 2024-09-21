import { Agent } from "@/api/listing";
import { IconEmail, IconPhone } from "@/assets/icons";
import Image from "next/image";

type Props = {
  agent: Agent;
};

export const AgentCard = ({ agent }: Props) => {
  return (
    <div className="w-auto border border-alto-300 rounded-lg p-5">
      <div className="flex gap-5 mb-4">
        <Image
          src={agent.avatar}
          alt={agent.name + "avatar"}
          className="rounded-full"
          width={72}
          height={72}
        />
        <div className="flex flex-col items-start justify-center gap-3">
          <p className="text-base text-blue-charcoal-800">{agent.name}</p>

          <p className="text-sm text-oslo-gray-800">აგენტი</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <IconEmail className="text-oslo-gray-500 w-4" />
        <p className="text-sm text-oslo-gray-500 ">{agent.email}</p>
      </div>

      <div className="flex items-center gap-2">
        <IconPhone className="text-oslo-gray-500 w-4" />
        <p className="text-sm text-oslo-gray-500 ">{agent.email}</p>
      </div>
    </div>
  );
};
