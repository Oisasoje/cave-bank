function Shimmer({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${className}`}
      style={style}
    />
  );
}

const TransactionSkeleton = ({
  style,
  number = [1, 2, 3, 4, 5],
}: {
  style?: string;
  number?: number[];
}) => (
  <div className={`${style ? style : "mt-12"} `}>
    <div className="space-y-3.5">
      {[...number].map((i) => (
        <div
          key={i}
          className="bg-white border border-neutral-200/60 p-3.5 rounded-[18px] flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Shimmer className="w-[40px] h-[40px] rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5">
              <Shimmer className="w-[130px] h-[12px] rounded" />
              <Shimmer className="w-[80px] h-[10px] rounded" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Shimmer className="w-[40px] h-[12px] rounded" />
            <Shimmer className="w-[56px] h-[18px] rounded-[6px]" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionSkeleton;
