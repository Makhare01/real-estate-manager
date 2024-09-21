"use server";

import { getAgents } from "@/api/agents";
import { getCities, getRegions } from "@/api/locations";
import { AddListingForm } from "@/components/add-listing-form";
import { Suspense } from "react";

const AddListingPage = async () => {
  const cities = await getCities();
  const regions = await getRegions();
  const agents = await getAgents();

  return (
    <Suspense>
      <AddListingForm cities={cities} regions={regions} agents={agents} />{" "}
    </Suspense>
  );
};

export default AddListingPage;
