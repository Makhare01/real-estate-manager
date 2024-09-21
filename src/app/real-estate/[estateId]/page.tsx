import Image from "next/image";
import { format } from "date-fns";
import { IconArea, IconBed, IconLocation, IconZipCode } from "@/assets/icons";
import { AgentCard } from "@/components/agent-card";
import { RealEstateBadge } from "@/components/listing/listing-card";
import { DeleteListingDialog } from "@/components/delete-listing-dialog";

const realEstate = {
  id: 2254,
  address: "Khelvachauri Makho",
  image:
    "https://api.real-estate-manager.redberryinternship.ge/storage/images/yuczXaKnc9mnvJnuAKoJinBxP81FeDfCbBWK22yW.jpg",
  zip_code: "6010",
  description:
    "იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით, ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით. ",
  price: 100000,
  bedrooms: 3,
  area: 100.5,
  is_rental: 1,
  agent_id: 1773,
  city_id: 1,
  created_at: "2024-09-21T07:13:56.000000Z",
  city: {
    id: 1,
    name: "სოხუმი",
    region_id: 1,
    region: {
      id: 1,
      name: "აფხაზეთი",
    },
  },
  agent: {
    id: 1773,
    name: "მახარე",
    surname: "მახარაძე",
    email: "makhare@redberry.ge",
    avatar:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/nmf3gSVrgYA30STVmx206RL4Wn8cBvUISajbQC9i.jpg",
    phone: "555455242",
  },
};

const RealEstateDetails = ({ params }: { params: { estateId: string } }) => {
  console.log({ params });
  return (
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

        <DeleteListingDialog listingId={Number(5)} />
      </div>
    </div>
  );
};

export default RealEstateDetails;
