import { RealEstate } from "@/api/listing";
import { IconArea, IconBed, IconLocation, IconZipCode } from "@/assets/icons";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const RealEstateBadge = ({ is_rental }: { is_rental: boolean }) => {
  return (
    <div className="p-2 px-3 bg-blue-charcoal-800/50 absolute left-4 top-4 rounded-[15px]">
      <p className="text-xs font-semibold text-white">
        {is_rental ? "ქირავდება" : "იყიდება"}
      </p>
    </div>
  );
};

type Props = {
  realEstate: RealEstate;
};

export const ListingCard = ({ realEstate }: Props) => {
  return (
    <div className="w-full max-w-[370px] rounded-[14px] bg-white border border-alto-300 relative cursor-pointer hover:shadow-[5px_5px_12px_0px_#02152614] transition delay-75">
      <RealEstateBadge is_rental={Boolean(realEstate.is_rental)} />
      <Image
        src={realEstate.image}
        alt={"image" + realEstate.id.toString()}
        className="rounded-t-[14px]"
        width={0}
        height={0}
        sizes="100%"
        layout="responsive"
      />

      <div className="p-5">
        <p className="text-[28px] font-bold text-blue-charcoal-800">
          {formatCurrency(realEstate.price)} ₾
        </p>

        <div className="flex items-center gap-2 mt-2">
          <IconLocation className="text-blue-charcoal-800 opacity-50 w-5" />
          <p className="text-blue-charcoal-800 opacity-70">
            {realEstate.city.name}, {realEstate.address}
          </p>
        </div>

        <div className="flex items-center gap-7 mt-3">
          <div className="flex items-center gap-2">
            <IconBed className="text-blue-charcoal-800 opacity-50 h-6" />
            <p className="text-blue-charcoal-800 opacity-70">
              {realEstate.bedrooms}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IconArea className="text-blue-charcoal-800 opacity-50 h-6" />
            <p className="text-blue-charcoal-800 opacity-70">
              {realEstate.area} მ<sup>2</sup>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IconZipCode className="text-blue-charcoal-800 opacity-50 h-6" />
            <p className="text-blue-charcoal-800 opacity-70">
              {realEstate.zip_code} მ<sup>2</sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
