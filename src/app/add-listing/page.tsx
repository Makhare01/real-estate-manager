"use server";

import { getAgents } from "@/api/agents";
import { getCities, getRegions } from "@/api/locations";
import { AddListingForm } from "@/components/add-listing-form";

const AddListingPage = async () => {
  const cities = await getCities();
  const regions = await getRegions();
  const agents = await getAgents();

  return <AddListingForm cities={cities} regions={regions} agents={agents} />;
};

export default AddListingPage;
