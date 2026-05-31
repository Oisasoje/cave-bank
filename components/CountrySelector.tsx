"use client";

import React, { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { DM_Sans } from "next/font/google";

import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from "libphonenumber-js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export type Country = {
  code: CountryCode;
  name: string;
  dialCode: string;
};

const countryList: Country[] = getCountries()
  .map((code) => ({
    code,
    name: countries.getName(code, "en") || "",
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .filter((c) => c.name)
  .sort((a, b) => a.name.localeCompare(b.name));

export default function CountrySelector({
  selectedCountry,
  onSelect,
  onClose,
}: {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = countryList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search),
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div
        className={`bg-white w-full max-w-md rounded-t-[24px] max-h-[70vh] flex flex-col ${dm_sans.className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-[18px] font-bold text-neutral-900">
            Select Country
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <input
            type="text"
            placeholder="Search country or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[44px] border border-neutral-200 rounded-[12px] px-4 text-[14px] outline-none focus:border-neutral-400 transition-colors"
            autoFocus
          />
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 px-2 pb-[env(safe-area-inset-bottom)]">
          {filtered.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                onSelect(country);
                onClose();
              }}
              className={`flex items-center gap-3 px-3 py-3 rounded-[10px] cursor-pointer transition-colors ${
                selectedCountry.code === country.code
                  ? "bg-neutral-100"
                  : "hover:bg-neutral-50"
              }`}
            >
              <CircleFlag
                countryCode={country.code.toLowerCase()}
                height={28}
                width={28}
              />
              <span className="text-[12px] text-neutral-900 flex-1">
                {country.name}
              </span>
              <span className="text-[12px] text-neutral-500 font-medium">
                {country.dialCode}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
