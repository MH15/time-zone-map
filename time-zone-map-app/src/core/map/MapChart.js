import React, { memo } from "react"
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

import { getTimezone } from 'countries-and-timezones';

import allStates from "../../data/allstates.json";
import topoJSON from "../../data/out_2.json"
// import topoJSON from "../../data/timezones-topo2.json"

import Color from "color"

import timezoneColors from "../../data/timezone_colors.json"


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


const MapChart = ({ setTooltipContent, markers }) => {
  return (
    <ComposableMap data-tip=""
      projection="geoEqualEarth"
      height={window.innerHeight}
      projectionConfig={{
        scale: 120,
        center: [0, -129]
      }}>

      {/* <ZoomableGroup zoom={1}> */}
      <Graticule stroke="#EAEAEC" />
      <Geographies geography={topoJSON}>
        {({ geographies }) =>
          geographies.map(geo => {
            let geoColor = "#D6D6D6"
            const tzid = geo.properties["tzid"]
            const timezoneInfo = getTimezone(tzid)

            if (timezoneInfo) {
              let utcStr = timezoneInfo.utcOffsetStr;
              if (timezoneColors[utcStr]) {
                geoColor = timezoneColors[utcStr]
              }
            }

            let hoverColor = Color(geoColor).darken(0.2)

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: geoColor,
                    outline: "none"
                  },
                  hover: {
                    fill: hoverColor,
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
                onMouseEnter={(e) => {
                  console.log(geo.properties)
                  const tzid = geo.properties["tzid"]
                  const timezoneInfo = getTimezone(tzid)
                  if (timezoneInfo) {
                    const { utcOffsetStr } = timezoneInfo;
                    setTooltipContent(`${tzid} - ${utcOffsetStr}`);
                  } else {
                    setTooltipContent(`${tzid} - No GMT Data`);

                  }
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              />
            )
          })
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={1} fill="#F00" stroke="#fff" strokeWidth={0.3} />
          <text
            textAnchor="middle"
            y={markerOffset * 0}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "3px" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      {/* </ZoomableGroup> */}
    </ComposableMap>
  );
};

export default memo(MapChart);