import { request } from "@/lib/request";
import {
  TRealEstate,
  TRealEstateDetails,
  TRealEstates,
} from "./listing.schema";
import { TAGS } from "@/lib/constants";
import { AddListingFormValues } from "@/components/add-listing-form";

export const getRealEstates = async () => {
  return await request("/real-estates").get(
    {
      requestInit: {
        next: {
          tags: [TAGS.realEstates],
          revalidate: 300,
        },
      },
    },
    TRealEstates
  );
};

type GetRealEstateDetailsInput = {
  estateId: string;
};

export const getRealEstateDetails = async ({
  estateId,
}: GetRealEstateDetailsInput) => {
  return await request("/real-estates/:estateId").get(
    {
      params: {
        estateId,
      },
      requestInit: {
        next: {
          tags: [TAGS.realEstateDetails],
          revalidate: 300,
        },
      },
    },
    TRealEstateDetails
  );
};

type DeleteRealEstateDetailsInput = {
  estateId: string;
};

export const deleteListing = async ({
  estateId,
}: DeleteRealEstateDetailsInput) => {
  return await request("/real-estates/:estateId").delete({
    params: {
      estateId,
    },
  });
};

export const addListing = async (body: AddListingFormValues) => {
  return await request("/real-estates").post(
    {
      type: "file",
      body,
      mode: "no-cors",
    },
    TRealEstate
  );
};
