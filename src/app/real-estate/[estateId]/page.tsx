"use server";

import Image from "next/image";
import { format } from "date-fns";
import { IconArea, IconBed, IconLocation, IconZipCode } from "@/assets/icons";
import { AgentCard } from "@/components/agent-card";
import { RealEstateBadge } from "@/components/listing/listing-card";
import { DeleteListingDialog } from "@/components/delete-listing-dialog";
import { getRealEstateDetails, getRealEstates } from "@/api/listing";
import { RealEstatesCarousel } from "@/components/real-estates-carousel";

const RealEstateDetails = async ({
  params,
}: {
  params: { estateId: string };
}) => {
  const realEstate = await getRealEstateDetails({
    estateId: params.estateId,
  });

  const realEstates = await getRealEstates();

  return (
    <div className="w-full">
      <div className="w-full flex gap-10">
        <div className="w-full max-w-[50%] relative">
          <RealEstateBadge
            is_rental={Boolean(realEstate.is_rental)}
            className="left-8 top-6"
          />

          <Image
            src={realEstate.image}
            alt={realEstate.id + "image"}
            className="rounded-t-[14px]"
            width={0}
            height={0}
            layout="responsive"
          />

          <p className="text-base text-oslo-gray-500 text-end mt-2">
            გამოქვეყნების თარიღი {format(realEstate.created_at, "dd/MM/yy")}
          </p>
        </div>

        <div className="w-full max-w-[500px] pt-5">
          <p className="text-5xl text-blue-charcoal-800 mb-5 font-bold">
            {new Intl.NumberFormat("ja-JP", {}).format(realEstate.price)} ₾
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mt-2">
              <IconLocation className="text-oslo-gray-500 w-6" />
              <p className="text-oslo-gray-500">
                {realEstate.city.name}, {realEstate.address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <IconArea className="text-oslo-gray-500 w-6" />
              <p className="text-oslo-gray-500">
                ფართი {realEstate.area} მ<sup>2</sup>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <IconBed className="text-oslo-gray-500 w-6" />
              <p className="text-oslo-gray-500">
                საძინებელი {realEstate.bedrooms}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <IconZipCode className="text-oslo-gray-500 w-6" />
              <p className="text-oslo-gray-500">
                საფოსტო ინდექსი {realEstate.zip_code}
              </p>
            </div>
          </div>

          <p className="test-base text-oslo-gray-500 mt-8 mb-12">
            {realEstate.description}
          </p>

          <AgentCard agent={realEstate.agent} />

          <DeleteListingDialog listingId={realEstate.id} />
        </div>
      </div>

      <p className="text-[32px] font-semibold mt-16">ბინები მსგავს ლოკაციაზე</p>

      <RealEstatesCarousel
        realEstates={realEstates.filter(
          (item) => item.city.region_id === realEstate.city.region_id
        )}
      />
    </div>
  );
};

export default RealEstateDetails;
