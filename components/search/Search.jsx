"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [searchTerm, setSearchTerm] = useState({
    destination: params.get("destination") || "Puglia",
    checkin: params.get("checkin") || "",
    checkout: params.get("checkout") || ""
  });
  const [allowSearch, setAllowSearch] = useState(true);
  
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    const state = {
      ...searchTerm,
      [e.target.name]: e.target.value
    }

    if ((checkin && checkout) && (new Date(state.checkin).getTime() > new Date(state.checkout).getTime())) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }

    setSearchTerm(state);
  }

  const handleSearch = (e) => {
    const newSearchParams = new URLSearchParams(searchTerm);
    if (!searchTerm.destination) {
      newSearchParams.delete("destination");
    }
    if (!(searchTerm.checkin && searchTerm.checkout)) {
      newSearchParams.delete("checkin");
      newSearchParams.delete("checkout");
    }
    if (pathname.includes('hotel')) {
      replace(`${pathname}?${newSearchParams.toString()}`);
    } else {
      replace(`${pathname}hotels?${newSearchParams.toString()}`);
    }
    
  }

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select 
                name="destination" 
                id="destination" 
                onChange={handleChange}
                defaultValue={searchTerm.destination}
              >
                <option value="Puglia">Puglia</option>
                <option value="Catania">Catania</option>
                <option value="Palermo">Palermo</option>
                <option value="Frejus">Frejus</option>
                <option value="Paris">Paris</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input 
                type="date"
                name="checkin"
                id="checkin"
                onChange={handleChange}
                defaultValue={searchTerm.checkin}
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input 
                type="date" 
                name="checkout" 
                id="checkout" 
                onChange={handleChange}
                defaultValue={searchTerm.checkout}
              />
            </h4>
          </div>
        </div>
      </div>

      <button 
        className="search-btn disabled:bg-gray-500" 
        onClick={handleSearch}
        disabled={!allowSearch}
      >
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
