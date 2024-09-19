import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  values: Array<number>;
  onClick: (price: number) => void;
  symbol: string | ReactNode;
};

export const RangeSelectItem = ({ label, values, onClick, symbol }: Props) => {
  return (
    <div className="mt-6 ml-1">
      <p className="text-sm font-semibold mb-3">{label}</p>

      <div className="flex flex-col gap-2">
        {values.map((value) => (
          <p
            key={value}
            className="text-blue-charcoal-700 text-base cursor-pointer hover:text-blue-charcoal-800"
            onClick={() => {
              onClick(value);
            }}
          >
            {new Intl.NumberFormat("ja-JP", {}).format(value)} {symbol}
          </p>
        ))}
      </div>
    </div>
  );
};
