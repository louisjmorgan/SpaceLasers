/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, Select, VStack,
} from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import { LegendOrdinal } from '@visx/legend';
import {
  Axis,
  LineSeries,
  DataContext,
  DataProvider,
  darkTheme,
  XYChart,
  Tooltip,
} from '@visx/xychart';
import useStore from 'Model/store';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import shallow from 'zustand/shallow';

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const dataTypeDictionary = {
  chargeState: {
    name: 'Charge State',
  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
  },
};

function ChartLegend() {
  const { colorScale, theme, margin } = useContext(DataContext);

  return (
    <Center>
      <LegendOrdinal
        direction="column"
        itemMargin="2px 2px 2px 0"
        scale={colorScale}
        // labelFormat={(label) => label.replace('-', ' ')}
        legendLabelProps={{ color: 'white' }}
        shape="line"
      />
    </Center>
  );
}

function Charts() {
  const {
    time, customers, spacePowers, averages,
  } = useStore(
    (state) => ({
      time: state.mission.time,
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      averages: state.mission.satellites.averages,
    }),
    shallow,
  );
  const frame = useStore((state) => state.frame, (oldFrame, newFrame) => (newFrame - oldFrame) > 600);
  const [selectedSatellites, setSelectedSatellites] = useState([]);
  const [selectedDataTypes, setSelectedDataTypes] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!time || !customers) return;
    setData(() => []);
    selectedSatellites.forEach((satellite) => selectedDataTypes.forEach((dataType) => {
      setData((prev) => [...prev, {
        name: `${satellite.name} - ${dataTypeDictionary[dataType].name}`,
        id: `${satellite.id}-${dataType}`,
        data: time.map(
          (t, index) => ({ x: t, y: satellite.performance[dataType][index] }),
        ),
      }]);
    }));
  }, [selectedSatellites, selectedDataTypes]);

  useEffect(() => {
    setSelectedSatellites(() => [...customers]);
    setSelectedDataTypes(() => ['chargeState', 'chargeStateNoBeams']);
  }, []);
  return (
    <VStack>
      <Flex>
        <DataProvider
          xScale={{ type: 'time' }}
          yScale={{ type: 'linear' }}
          theme={darkTheme}
        >
          <XYChart height={500} width={800}>
            <Axis orientation="bottom" />
            <Axis orientation="left" />
            {data.map((series, index) => (
              <LineSeries
                key={series.id}
                dataKey={series.name}
                data={Array.from(
                  { length: 1000 },
                  (v, i) => (i < frame
                    ? series.data.slice(frame - 1000 > 0 ? frame - 1000 : 0, frame)[i]
                    : ({ x: time[i], y: undefined })),
                )}
                xAccessor={(d) => d.x}
                yAccessor={(d) => d.y}
              />
            ))}
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData, colorScale }) => accessors.xAccessor(true ? (
                <>
                  <div>
                    {new Date(
                      accessors.xAccessor((tooltipData.nearestDatum.datum)),
                    ).toString().slice(0, 21)}
                  </div>
                  {data.map((series, index) => (
                    <div key={series.id}>
                      <div style={{ color: colorScale(series.name) }}>
                        {series.name}
                      </div>
                      {(accessors.yAccessor(
                        tooltipData.datumByKey[series.name].datum,
                      ) * 100).toFixed(2)}
                      %
                    </div>
                  ))}
                </>
              ) : '')}
            />
          </XYChart>
          <ChartLegend />
        </DataProvider>
      </Flex>
    </VStack>
  );
}

export default Charts;
