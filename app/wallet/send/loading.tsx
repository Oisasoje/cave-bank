export const AmountAndNoteEntrySkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col flex-1">
      <div className="px-6 mt-6 flex flex-col">
        {/* Sending to */}
        <div className="mb-2">
          <div className="h-3.5 w-16 bg-neutral-200 rounded mb-2" />
          <div className="bg-neutral-200 rounded-[16px] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-neutral-300 shrink-0" />
              <div className="space-y-2">
                {/* Name */}
                <div className="h-4 w-28 bg-neutral-300 rounded" />
                {/* Wallet address */}
                <div className="h-3.5 w-40 bg-neutral-300 rounded" />
              </div>
            </div>
            {/* Change button */}
            <div className="h-8 w-16 bg-neutral-300 rounded-[8px]" />
          </div>
        </div>

        {/* From */}
        <div className="mt-4 mb-4">
          <div className="h-3.5 w-10 bg-neutral-200 rounded mb-2" />
          <div className="bg-neutral-200 rounded-[16px] p-4 flex flex-col gap-2">
            <div className="h-3 w-24 bg-neutral-300 rounded" />
            <div className="h-5 w-20 bg-neutral-300 rounded" />
          </div>
        </div>

        {/* Amount + Note card */}
        <div className="bg-white border border-neutral-200/60 rounded-[20px] p-5 shadow-sm space-y-4">
          {/* Amount */}
          <div>
            <div className="h-3 w-14 bg-neutral-200 rounded mb-2" />
            <div className="h-[56px] w-full bg-neutral-100 rounded-[14px]" />
          </div>
          {/* Description */}
          <div>
            <div className="h-3 w-20 bg-neutral-200 rounded mb-2" />
            <div className="h-[56px] w-full bg-neutral-100 rounded-[14px]" />
            <div className="h-2.5 w-8 bg-neutral-200 rounded mt-1.5" />
          </div>
        </div>

        {/* Send button */}
        <div className="h-[54px] w-full bg-neutral-200 rounded-[14px] mt-6 mb-4" />
      </div>
    </div>
  );
};

export default AmountAndNoteEntrySkeleton;
