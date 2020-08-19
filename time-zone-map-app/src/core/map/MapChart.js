import React, { memo } from "react"
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Annotation
} from "react-simple-maps";

import { getTimezone } from 'countries-and-timezones';

import allStates from "../../data/allstates.json";
import topoJSON from "../../data/out_0.json"

let geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
geoUrl = "./"

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


const MapChart = ({ setTooltipContent }) => {
  return (
    <ComposableMap data-tip="" projection="geoEqualEarth" projectionConfig={{
      scale: 120
    }}>
      <Graticule stroke="#EAEAEC" />
      <Geographies geography={topoJSON}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#9998A3"
                stroke="#EAEAEC"
                strokeWidth="0.3px"
                onMouseEnter={() => {
                  const tzid = geo.properties["tzid"]
                  const timezoneInfo = getTimezone(tzid)
                  console.log(timezoneInfo)
                  setTooltipContent(tzid);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default memo(MapChart);