"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["index"],{

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/react/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/spinner/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fontsource_barlow_700_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fontsource/barlow/700.css */ "./node_modules/@fontsource/barlow/700.css");
/* harmony import */ var _fontsource_barlow_400_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fontsource/barlow/400.css */ "./node_modules/@fontsource/barlow/400.css");
/* harmony import */ var _fontsource_azeret_mono__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fontsource/azeret-mono */ "./node_modules/@fontsource/azeret-mono/index.css");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var UI_PerformanceView_PerformanceView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! UI/PerformanceView/PerformanceView */ "./src/UI/PerformanceView/PerformanceView.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/useGLTF.js");
/* harmony import */ var _UI_Controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UI/Controls */ "./src/UI/Controls.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Model/store */ "./src/Model/store.js");
/* harmony import */ var _UI_MissionPlanner_defaultInputs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UI/MissionPlanner/defaultInputs */ "./src/UI/MissionPlanner/defaultInputs.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UI */ "./src/UI/index.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme */ "./src/theme.js");
/* harmony import */ var _UI_ViewButtons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./UI/ViewButtons */ "./src/UI/ViewButtons.js");
/* harmony import */ var _Simulation_Simulation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Simulation/Simulation */ "./src/Simulation/Simulation.js");
/* harmony import */ var _Assets_Mesh_lowpolysat_glb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Assets/Mesh/lowpolysat.glb */ "./src/Assets/Mesh/lowpolysat.glb");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/jsx-curly-brace-presence */




















(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_14__.e)({});

function App() {
  const {
    view,
    setView,
    initializeMission,
    isInitialized,
    storeObj
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_6__.useStore)(state => ({
    view: state.view,
    setView: state.setView,
    initializeMission: state.initializeMission,
    isInitialized: state.isInitialized,
    storeObj: state.storeObj
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_15__["default"]);
  const obj = (0,_react_three_drei__WEBPACK_IMPORTED_MODULE_16__.useGLTF)(_Assets_Mesh_lowpolysat_glb__WEBPACK_IMPORTED_MODULE_12__);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    obj.nodes.Satellite.geometry.rotateY(3 * Math.PI / 2);
    storeObj(obj);
  }, [obj]);
  const [firstRender, setFirstRender] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (firstRender) {
      initializeMission(_UI_MissionPlanner_defaultInputs__WEBPACK_IMPORTED_MODULE_7__.defaultValues);
    }
  }, [firstRender]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setFirstRender(true);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__.ChakraProvider, {
    theme: _theme__WEBPACK_IMPORTED_MODULE_9__["default"],
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.Grid, {
      minHeight: '100vh',
      width: '100%',
      templateRows: view.templateRows,
      templateColumns: view.templateColumns,
      templateAreas: view.templateAreas,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
        area: view.headerArea,
        display: view.name === 'simulation' ? '' : 'none',
        zIndex: 99,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.Grid, {
          h: '100%',
          templateColumns: '1fr 1fr 1fr',
          templateRows: '1fr 2fr',
          templateAreas: `". . ."
               "views title controls"`,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_UI_ViewButtons__WEBPACK_IMPORTED_MODULE_10__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
            area: 'title',
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.Flex, {
              align: "center",
              height: "100%",
              justify: "center",
              gap: 2,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h1", {
                children: "Space Power Simulator"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
                children: "(beta)"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
            area: 'controls',
            children: isInitialized ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_UI_Controls__WEBPACK_IMPORTED_MODULE_5__["default"], {}) : ''
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
        position: "relative",
        area: view.simulationArea,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.Grid, {
          h: '100%',
          templateColumns: '1fr 0.125fr',
          templateRows: '2fr 0.5fr 0.125fr',
          children: [isInitialized ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Simulation_Simulation__WEBPACK_IMPORTED_MODULE_11__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_UI__WEBPACK_IMPORTED_MODULE_8__.HUD, {})]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Spinner, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: 'translate(-50%, -50%)'
          }), view.name === 'mission' || view.name === 'performance' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
            area: '3 / 2 / 4 / 3',
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_20__.Button, {
              value: 'simulation',
              onClick: setView,
              children: "Return"
            })
          }) : '']
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_UI__WEBPACK_IMPORTED_MODULE_8__.MissionPlanner, {
        shouldDisplay: view.name === 'mission'
      }), isInitialized ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(UI_PerformanceView_PerformanceView__WEBPACK_IMPORTED_MODULE_4__["default"], {}) : '', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.GridItem, {
        area: view.footerArea,
        children: "Footer"
      })]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Model/mission.js":
/*!******************************!*\
  !*** ./src/Model/mission.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MissionSchema": () => (/* binding */ MissionSchema),
/* harmony export */   "handleMissionRequest": () => (/* binding */ handleMissionRequest)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _satellite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./satellite */ "./src/Model/satellite.js");
/* harmony import */ var _simulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simulation */ "./src/Model/simulation.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */

/* eslint-disable max-len */

/* eslint-disable no-param-reassign */




(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.e)({});

const MissionSchema = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
  satellites: yup__WEBPACK_IMPORTED_MODULE_0__.array().of(yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    name: yup__WEBPACK_IMPORTED_MODULE_0__.string().min(2, 'Too Short!').max(50, 'Too Long!').trim(),
    // size: Yup.number()
    //   .integer()
    //   .min(1, 'Size must be 1 or more!')
    //   .max(6, 'Size must be 6 or less!')
    //   .required('size is required'),
    // tle1: Yup.string()
    //   .min(69, 'tle must be 69 columns')
    //   .max(69, 'tle must be 69 columns')
    //   .required('tle line 1 is required'),
    // tle2: Yup.string()
    //   .min(69, 'tle must be 69 columns')
    //   .max(69, 'tle must be 69 columns')
    //   .required('tle line 2 required'),
    orbit: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
      tle: yup__WEBPACK_IMPORTED_MODULE_0__.string(),
      meanMotionDot: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(-1, 'Must be more than -1').max(1, 'Must be less than 1').required('meanMotionDot is required'),
      bstar: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(-2, 'Must be between -2 and 2').max(2, 'Must be between -2 and 2').required('bstar is required'),
      inclination: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-360°').max(360, 'Must be 0-360°').required('inclination is required'),
      rightAscension: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-360°').max(360, 'Must be 0-360°').required('right ascension is required'),
      eccentricity: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be between 0 and 1').max(1, 'Must be between 0 and 1').required('eccentricity is required'),
      perigee: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-360°').max(360, 'Must be 0-360°').required('perigee is required'),
      meanAnomaly: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-360°').max(360, 'Must be 0-360°').required('mean anomaly is required'),
      meanMotion: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be greater than 0').max(16, 'Must be less than 16').required('mean motion is required')
    }),
    power: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
      pvVoltage: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').required('pv voltage is required'),
      currentDensity: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').required('pv current density is required'),
      area: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be greater than 0').required('pv area is required'),
      batteryVoltage: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').required('battery voltage is required'),
      capacity: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be greater than 0').required('battery capacity is required'),
      powerStoringConsumption: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be greater than 0').required('Power storing consumption is required')
    }),
    duties: yup__WEBPACK_IMPORTED_MODULE_0__.array().of(yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
      type: yup__WEBPACK_IMPORTED_MODULE_0__.string().oneOf(['cyclical']).required('Type is required'),
      name: yup__WEBPACK_IMPORTED_MODULE_0__.string().min(2, 'Too Short!').max(30, 'Too Long!').required('required!'),
      priority: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(1).required('Priority is required'),
      consumption: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').required('Consumption is required'),
      duration: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').when('type', {
        is: 'cyclical',
        then: yup__WEBPACK_IMPORTED_MODULE_0__.number().required('Duration is required')
      }),
      cycles: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be positive').when('type', {
        is: 'cyclical',
        then: yup__WEBPACK_IMPORTED_MODULE_0__.number().required('Cycles is required')
      })
    }))
  })),
  powerSats: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(0, 'Must be an integer greater than or equal to 0'),
  offsets: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    inclination: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-36°').max(36, 'Must be 0-36°').required('inclination is required'),
    rightAscension: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-36°').max(36, 'Must be 0-36°').required('right ascension is required'),
    eccentricity: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be between 0 and 1').max(1, 'Must be between 0 and 1').required('eccentricity is required'),
    perigee: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-36°').max(36, 'Must be 0-36°').required('perigee is required'),
    meanAnomaly: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be 0-360°').max(360, 'Must be 0-360°').required('mean anomaly is required'),
    meanMotion: yup__WEBPACK_IMPORTED_MODULE_0__.number().min(0, 'Must be greater than 0').max(16, 'Must be less than 16').required('mean motion is required')
  })
});

const handleMissionRequest = req => {
  // try {
  //   missionSchema.validate(req);
  // } catch (err) {
  //   console.log(err);
  //   return new Error({ type: err.name, message: `${err.path} ${err.message}` });
  // }
  // initialize customers
  const customers = req.satellites.map(customer => (0,_satellite__WEBPACK_IMPORTED_MODULE_1__.createSatellite)(customer)); // initialize global simulation parameters

  const time = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getTimeArray)(customers[0].params.orbit.epochdate);
  const sun = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getSunPositions)(time);
  const earth = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getEarthRotationAngles)(time); // simulate customer orbits and duties

  customers.forEach(customer => {
    customer.positions = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getSatellitePositions)(customer.params, time);
    customer.performance = {
      currentDuties: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getCurrentDuties)(customer.params.load.duties, time),
      isEclipsed: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getEclipsedArray)(customer, sun, time)
    };
  });
  const offsets = (0,_satellite__WEBPACK_IMPORTED_MODULE_1__.getOffsets)(Number(req.spacePowers), req.satellites.length, req.offsets);
  const spacePowers = [];
  req.satellites.forEach((satellite, index) => {
    if (!offsets[index]) return;
    return offsets[index].forEach(offset => spacePowers.push((0,_satellite__WEBPACK_IMPORTED_MODULE_1__.createPowerSatellite)(`Space Power ${index + 1}`, satellite.orbit, offset)));
  }); // simulate space power orbits and initialize beams

  const beams = [];
  spacePowers.forEach(spacePower => {
    spacePower.positions = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getSatellitePositions)(spacePower.params, time);
    const satBeams = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getBeams)(spacePower, customers, time);
    spacePower.performance = {
      currentDuties: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getBeamDuties)(satBeams, time),
      isEclipsed: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getEclipsedArray)(spacePower, sun, time)
    };
    beams.push(...satBeams);
  }); // simulate batteries

  customers.forEach(customer => {
    customer.performance.sources = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getSources)(customer, beams, time);
    customer.performance = { ...customer.performance,
      chargeState: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getChargeStates)(customer, time),
      chargeStateNoBeams: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getChargeStates)(customer, time, false)
    };
    const [dischargeSaved, timeCharged] = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getDischargeSaved)(customer);
    customer.summary = {
      dischargeSaved,
      timeCharged
    };
  });
  spacePowers.forEach(spacePower => {
    spacePower.performance.sources = (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getSources)(spacePower, beams, time);
    spacePower.performance = { ...spacePower.performance,
      chargeState: (0,_simulation__WEBPACK_IMPORTED_MODULE_2__.getChargeStates)(spacePower, time)
    };
  }); // calculate averages

  const fleet = {
    name: 'fleet',
    performance: {
      chargeState: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeState[index], 0) / customers.length),
      chargeStateNoBeams: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeStateNoBeams[index], 0) / customers.length)
    },
    summary: {
      dischargeSaved: customers.reduce((prev, current) => prev + current.summary.dischargeSaved, 0),
      timeCharged: customers.reduce((prev, current) => prev + current.summary.timeCharged, 0)
    }
  };
  return {
    success: true,
    time,
    satellites: {
      customers,
      spacePowers,
      fleet
    },
    beams,
    sun,
    earth
  };
};



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Model/satellite.js":
/*!********************************!*\
  !*** ./src/Model/satellite.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPowerSatellite": () => (/* binding */ createPowerSatellite),
/* harmony export */   "createSatellite": () => (/* binding */ createSatellite),
/* harmony export */   "getOffsets": () => (/* binding */ getOffsets)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Util_astronomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/astronomy */ "./src/Util/astronomy.js");
/* harmony import */ var _Util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util/constants */ "./src/Util/constants.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */




(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

const PV_SOURCES = {
  sunOnly: {
    name: 'sun',
    efficiency: 1
  },
  beamOnly: {
    name: 'beam',
    efficiency: 1
  },
  sunAndBeam: {
    name: 'sun and beam',
    efficiency: 1.5
  },
  eclipsed: {
    name: 'eclipsed',
    efficiency: 0
  }
};
const POWER_SAT_REQUEST = {
  power: {
    pvVoltage: 4.7,
    currentDensity: 170.5,
    area: 0.0128,
    batteryVoltage: 3.6,
    capacity: 1.125,
    powerStoringConsumption: 1.2
  },
  duties: [{
    name: 'beaming',
    duration: null,
    cycles: null,
    consumption: 3.2,
    type: 'space power'
  }]
};

function generatePowerProfiles(pv, duties, battery) {
  const {
    area,
    voltage,
    currentDensity
  } = pv;
  const newPowerProfiles = [];
  Object.entries(pv.sources).forEach(pvSource => {
    const current = currentDensity * pvSource[1].efficiency * area;
    const pvPower = current * voltage;
    const loadProfiles = [];
    duties.forEach(duty => {
      const netPower = pvPower - duty.consumption;
      const netCurrent = netPower / battery.voltage;
      loadProfiles.push(netCurrent);
    });
    newPowerProfiles[pvSource[1].name] = loadProfiles;
  });
  return newPowerProfiles;
}

function getDutyIntervals(duty, period, time) {
  const cycles = Number(duty.cycles);
  const duration = Number(duty.duration) * 1000;
  const interval = (period - duration * cycles) / cycles;
  const totalCycles = Math.floor(_Util_constants__WEBPACK_IMPORTED_MODULE_1__.SIM_LENGTH / period * cycles);
  return Array.from({
    length: totalCycles
  }, (value, index) => {
    const start = time.valueOf() + interval * (index + 1) + duration * index;
    return {
      start,
      end: start + duration
    };
  });
}

function createSatellite(satellite, isCustomer = true) {
  const tles = (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_0__.generateTLE)({ ...satellite.orbit,
    epoch: new Date(satellite.orbit.epoch)
  });
  const orbit = (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_0__.twoline2satrec)(tles.tle1, tles.tle2);

  try {
    (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_0__.getOrbitAtTime)({
      orbit
    }, new Date());
  } catch {
    const error = `Unable to propagate orbital parameters for ${satellite.name}. ${isCustomer ? 'Please try different values or choose a TLE.' : 'Please try different offsets in the power configuration menu.'}`;
    throw new Error(error);
  }

  orbit.period = 2 * Math.PI * 60 * 1000 / orbit.no;
  const pv = {
    sources: PV_SOURCES,
    voltage: satellite.power.pvVoltage,
    currentDensity: satellite.power.currentDensity,
    area: satellite.power.area
  };
  const battery = {
    voltage: satellite.power.batteryVoltage,
    capacity: satellite.power.capacity
  };
  const duties = satellite.duties.map(duty => ({
    name: duty.name,
    type: duty.type,
    consumption: Number(duty.consumption),
    duration: Number(duty.duration) * 1000 || null,
    cycles: Number(duty.cycles) || null,
    intervals: duty.type === 'cyclical' ? getDutyIntervals(duty, orbit.period, orbit.epochdate) : null
  }));
  duties.unshift({
    name: 'Power storing',
    type: 'power storing',
    consumption: satellite.power.powerStoringConsumption
  });
  const powerProfiles = generatePowerProfiles(pv, duties, battery);
  return {
    name: satellite.name,
    id: satellite.id,
    params: {
      orbit,
      battery,
      pv,
      load: {
        powerProfiles,
        duties
      }
    },
    isCustomer
  };
}

function createPowerSatellite(name, orbit, offsets) {
  const newOrbit = { ...orbit
  };
  Object.entries(offsets).forEach(offset => {
    newOrbit[offset[0]] = orbit[offset[0]] + Number(offset[1]);
  });
  const request = { ...POWER_SAT_REQUEST,
    name,
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    orbit: newOrbit
  };
  return createSatellite(request, false);
}

function getOffsets(spacePowers, customers, offsets) {
  if (spacePowers === 0) return [];
  if (spacePowers === customers) return Array.from({
    length: customers
  }, () => [offsets]);

  if (spacePowers < customers) {
    const spacing = Math.floor(customers / spacePowers);
    let total = 0;
    return Array.from({
      length: customers
    }, (value, index) => {
      if (index % spacing) return null;
      total += 1;
      if (total > spacePowers) return null;
      return [offsets];
    });
  }

  if (spacePowers > customers) {
    let ratio = Math.ceil(spacePowers / customers);
    let total = 0;
    return Array.from({
      length: customers
    }, () => {
      let multiplier = 0;
      if (total + ratio > spacePowers) ratio = spacePowers - total;
      return Array.from({
        length: ratio
      }, (value, index) => {
        if (index % 2 === 0) multiplier += 1;
        const newOffsets = {};
        Object.entries(offsets).forEach(offset => {
          newOffsets[offset[0]] = offset[1] * multiplier * (0 - 1) ** index;
        });
        total += 1;
        return newOffsets;
      });
    });
  }
}



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Model/simulation.js":
/*!*********************************!*\
  !*** ./src/Model/simulation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBeamDuties": () => (/* binding */ getBeamDuties),
/* harmony export */   "getBeams": () => (/* binding */ getBeams),
/* harmony export */   "getChargeStates": () => (/* binding */ getChargeStates),
/* harmony export */   "getCurrentDuties": () => (/* binding */ getCurrentDuties),
/* harmony export */   "getDischargeSaved": () => (/* binding */ getDischargeSaved),
/* harmony export */   "getEarthRotationAngles": () => (/* binding */ getEarthRotationAngles),
/* harmony export */   "getEclipsedArray": () => (/* binding */ getEclipsedArray),
/* harmony export */   "getSatellitePositions": () => (/* binding */ getSatellitePositions),
/* harmony export */   "getSources": () => (/* binding */ getSources),
/* harmony export */   "getSunPositions": () => (/* binding */ getSunPositions),
/* harmony export */   "getTimeArray": () => (/* binding */ getTimeArray)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! satellite.js/lib/constants */ "./node_modules/satellite.js/lib/constants.js");
/* harmony import */ var _Util_astronomy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util/astronomy */ "./src/Util/astronomy.js");
/* harmony import */ var _Util_power__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util/power */ "./src/Util/power.js");
/* harmony import */ var _Util_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Util/constants */ "./src/Util/constants.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */

/* eslint-disable max-len */






(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

function getTimeArray(initial) {
  const initialMillisecs = initial.getTime();
  const mspf = _Util_constants__WEBPACK_IMPORTED_MODULE_3__.SIM_LENGTH / _Util_constants__WEBPACK_IMPORTED_MODULE_3__.FRAMES;
  return Array.from({
    length: _Util_constants__WEBPACK_IMPORTED_MODULE_3__.FRAMES
  }, (value, index) => {
    const time = initialMillisecs + index * mspf;
    return time;
  });
}

function getSatellitePositions(satellite, timeArray) {
  const x = [];
  const y = [];
  const z = [];
  timeArray.forEach(time => {
    const pos = (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_1__.getOrbitAtTime)(satellite, new Date(time));
    x.push(pos.x);
    y.push(pos.y);
    z.push(pos.z);
  });
  return {
    x,
    y,
    z
  };
}

function getSunPositions(timeArray) {
  const x = [];
  const y = [];
  const z = [];
  timeArray.forEach(time => {
    const pos = (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_1__.getSunPosition)(new Date(time));
    x.push(pos.x);
    y.push(pos.y);
    z.push(pos.z);
  });
  return {
    x,
    y,
    z
  };
}

function getEarthRotationAngles(timeArray) {
  return timeArray.map(time => (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_1__.getEarthRotationAngle)(time));
}

function getEclipsedArray(satellite, sun, timeArray) {
  return timeArray.map((time, index) => {
    const satPosition = {
      x: satellite.positions.x[index],
      y: satellite.positions.y[index],
      z: satellite.positions.z[index]
    };
    const sunPosition = {
      x: sun.x[index],
      y: sun.y[index],
      z: sun.z[index]
    };
    return (0,_Util_power__WEBPACK_IMPORTED_MODULE_2__.isEclipsed)(satPosition, sunPosition);
  });
}

function getCurrentDuties(duties, timeArray) {
  return timeArray.map(time => {
    let currentDuty = 0;
    duties.forEach((duty, index) => {
      if (duty.type === 'power storing') return;
      duty.intervals.forEach(cycle => {
        if (time >= cycle.start && time <= cycle.end) currentDuty = index;
      });
    });
    return currentDuty;
  });
}

function getBeams(spacePower, customers, timeArray) {
  return customers.map(customer => {
    const beamName = `${spacePower.name} - ${customer.name}`;
    const distances = timeArray.map((time, index) => {
      const spacePowerPosition = {
        x: spacePower.positions.x[index],
        y: spacePower.positions.y[index],
        z: spacePower.positions.z[index]
      };
      const customerPosition = {
        x: customer.positions.x[index],
        y: customer.positions.y[index],
        z: customer.positions.z[index]
      };
      return (0,_Util_astronomy__WEBPACK_IMPORTED_MODULE_1__.getDistance)(spacePowerPosition, customerPosition);
    });
    const activated = distances.map(distance => {
      if (distance * satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius < _Util_constants__WEBPACK_IMPORTED_MODULE_3__.BEAM_DISTANCE) return true;
      return false;
    });
    return {
      name: beamName,
      distances,
      activated,
      customerId: customer.id,
      spacePowerId: spacePower.id,
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])()
    };
  });
}

function getBeamDuties(beams, timeArray) {
  return timeArray.map((time, index) => beams.reduce((prev, current) => current.activated[index] || prev, false) ? 1 : 0);
}

function getSource(satellite, beams, index) {
  let hasBeam;

  if (beams) {
    const satBeams = beams.filter(b => b.customerId === satellite.id);
    hasBeam = satBeams.reduce((prev, current) => current.activated[index] || prev, false);
  } else {
    hasBeam = false;
  }

  const hasSun = !satellite.performance.isEclipsed[index];
  if (!hasSun && hasBeam) return 'beam';
  if (hasSun && hasBeam) return 'sun and beam';
  if (!hasSun && !hasBeam) return 'eclipsed';
  if (hasSun && !hasBeam) return 'sun';
}

function getSources(satellite, beams, timeArray) {
  return timeArray.map((time, index) => getSource(satellite, beams, index));
}

function getChargeStates(satellite, timeArray, hasBeams = true) {
  const delta = _Util_constants__WEBPACK_IMPORTED_MODULE_3__.SIM_LENGTH / (60 * 60 * 1000) / _Util_constants__WEBPACK_IMPORTED_MODULE_3__.FRAMES;
  let chargeState = 1;
  return timeArray.map((time, index) => {
    let source = satellite.performance.sources[index];

    if (hasBeams === false) {
      if (source === 'sun and beam') source = 'sun';
      if (source === 'beam') source = 'eclipsed';
    }

    chargeState = (0,_Util_power__WEBPACK_IMPORTED_MODULE_2__.getChargeState)(satellite.params, satellite.performance.currentDuties[index], source, chargeState, delta);
    return chargeState;
  });
}

function getDischargeSaved(satellite) {
  let timeCharged = 0;
  const totalCurrent = satellite.performance.sources.reduce((prev, source, i) => {
    const currentDuty = satellite.performance.currentDuties[i];
    const netCurrent = (0,_Util_power__WEBPACK_IMPORTED_MODULE_2__.getNetCurrent)(satellite.params, source, currentDuty);
    let sourceNoBeams = source;

    if (source === 'sun and beam') {
      sourceNoBeams = 'sun';
      timeCharged += 1;
    } else if (source === 'beam') {
      timeCharged += 1;
      sourceNoBeams = 'eclipsed';
    }

    const netCurrentNoBeams = (0,_Util_power__WEBPACK_IMPORTED_MODULE_2__.getNetCurrent)(satellite.params, sourceNoBeams, currentDuty);
    return netCurrent - netCurrentNoBeams + prev;
  }, 0);
  const dischargeSaved = totalCurrent * (_Util_constants__WEBPACK_IMPORTED_MODULE_3__.SIM_LENGTH / (1000 * 60 * 60)) / _Util_constants__WEBPACK_IMPORTED_MODULE_3__.FRAMES;
  timeCharged = timeCharged / _Util_constants__WEBPACK_IMPORTED_MODULE_3__.FRAMES * _Util_constants__WEBPACK_IMPORTED_MODULE_3__.SIM_LENGTH / (1000 * 60);
  return [dischargeSaved, timeCharged];
}



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Model/store.js":
/*!****************************!*\
  !*** ./src/Model/store.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useFrameStore": () => (/* binding */ useFrameStore),
/* harmony export */   "useStore": () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.js");
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/zustand/esm/vanilla.js");
/* harmony import */ var _mission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mission */ "./src/Model/mission.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");






(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.e)({});

const defaultOptions = {
  showLabel: false
};
const views = {
  simulation: {
    name: 'simulation',
    templateRows: '0.375fr 2.125fr 0.125fr',
    templateColumns: '1fr',
    templateAreas: '',
    simulationArea: ' 1 / 1 / 4 / 2',
    headerArea: ' 1 / 1 / 2 / 4',
    footerArea: '3 / 1 / 4 / 2'
  },
  mission: {
    name: 'mission',
    templateRows: '0.75fr 1.75fr 0.125fr',
    templateColumns: '1fr 2.25fr',
    templateAreas: `"simulation parameters"
  "select parameters"
  "footer footer"`,
    simulationArea: 'simulation',
    headerArea: '',
    footerArea: 'footer'
  },
  performance: {
    name: 'performance',
    templateRows: '1fr 1.5fr 0.125fr',
    templateColumns: '1fr 2fr',
    templateAreas: `"simulation performance"
  "summary performance"
  "footer footer"`
  }
};
const useFrameStore = (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_2__["default"])(() => ({
  frame: 0
}));
const useStore = (0,zustand__WEBPACK_IMPORTED_MODULE_3__["default"])(set => ({
  isPaused: false,
  speed: 1,
  cameraTarget: {
    name: 'earth',
    ref: null,
    lock: true,
    id: null
  },
  refs: new Map(),
  satelliteOptions: new Map(),
  view: views.simulation,
  mission: null,
  isInitialized: false,
  satelliteObj: null,
  storeObj: obj => set(() => ({
    satelliteObj: obj
  })),
  setInitialized: shouldInitialized => set(() => ({
    isInitialized: shouldInitialized
  })),
  togglePaused: () => set(state => ({
    isPaused: !state.isPaused
  })),
  setSpeed: speed => set(() => ({
    speed
  })),
  attachCamera: id => set(state => ({
    cameraTarget: { ...state.cameraTarget,
      ref: state.refs.get(id),
      id,
      name: state.satelliteOptions.get(id).name
    }
  })),
  detachCamera: () => set(state => ({
    cameraTarget: { ...state.cameraTarget,
      name: 'earth',
      ref: null,
      id: null
    }
  })),
  toggleLabel: id => set(state => {
    const prev = state.satelliteOptions.get(id);
    return {
      satelliteOptions: new Map(state.satelliteOptions).set(id, { ...prev,
        showLabel: !prev.showLabel
      })
    };
  }),
  toggleAllLabels: shouldShow => set(state => {
    const newOptions = new Map(state.satelliteOptions);

    if (!shouldShow) {
      newOptions.forEach((value, key) => newOptions.set(key, { ...value,
        showLabel: false
      }));
    } else {
      newOptions.forEach((value, key) => newOptions.set(key, { ...value,
        showLabel: true
      }));
    }

    return {
      satelliteOptions: newOptions
    };
  }),
  setLockCamera: lock => set(state => ({
    cameraTarget: { ...state.cameraTarget,
      lock
    }
  })),
  storeRef: (id, ref) => set(state => ({
    refs: new Map(state.refs).set(id, ref)
  })),
  initializeMission: values => set(() => {
    const mission = (0,_mission__WEBPACK_IMPORTED_MODULE_0__.handleMissionRequest)(values);
    const satellites = [...mission.satellites.customers, ...mission.satellites.spacePowers];
    const newOptions = new Map();
    satellites.forEach(satellite => {
      newOptions.set(satellite.id, { ...defaultOptions,
        name: satellite.name,
        color: satellite.isCustomer ? 'red' : 'yellow'
      });
    });
    return {
      mission,
      satelliteOptions: newOptions,
      isInitialized: true,
      cameraTarget: {
        name: 'earth',
        ref: null,
        lock: true,
        id: null
      }
    };
  }),
  setView: e => set(() => ({
    view: views[`${e.target.value}`]
  }))
}));


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Beam.js":
/*!********************************!*\
  !*** ./src/Simulation/Beam.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Shaders_LaserBeam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shaders/LaserBeam */ "./src/Simulation/Shaders/LaserBeam.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */







(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

function Beam({
  beam,
  spacePower,
  customer
}) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const laser = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new three__WEBPACK_IMPORTED_MODULE_5__.Object3D());
  const texture = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const material = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const meshes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    texture.current = new three__WEBPACK_IMPORTED_MODULE_5__.Texture((0,_Shaders_LaserBeam__WEBPACK_IMPORTED_MODULE_2__.generateLaserBodyCanvas)());
    texture.current.needsUpdate = true;
    material.current = new three__WEBPACK_IMPORTED_MODULE_5__.MeshBasicMaterial({
      map: texture.current,
      blending: three__WEBPACK_IMPORTED_MODULE_5__.AdditiveBlending,
      color: 0x4444aa,
      side: three__WEBPACK_IMPORTED_MODULE_5__.DoubleSide,
      depthWrite: false,
      transparent: false
    });
    meshes.current = (0,_Shaders_LaserBeam__WEBPACK_IMPORTED_MODULE_2__.getLaserMeshes)(1, material.current);
    meshes.current.forEach(mesh => laser.current.add(mesh));
  }, []);
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.subscribe(state => {
      frame.current = state.frame;
    });
  }, []);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.z)(() => {
    if (beam.activated[frame.current]) {
      if (ref.current.children.length === 0) {
        ref.current.children = meshes.current;
      }

      ref.current.position.x = spacePower.positions.x[frame.current];
      ref.current.position.y = spacePower.positions.y[frame.current];
      ref.current.position.z = spacePower.positions.z[frame.current];
      ref.current.lookAt(customer.positions.x[frame.current], customer.positions.y[frame.current], customer.positions.z[frame.current]);
      ref.current.rotateY(-Math.PI / 2);
      ref.current.scale.set(beam.distances[frame.current], 1, 1);
    } else if (ref.current.children) {
      ref.current.children = [];
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("primitive", {
    object: laser.current,
    position: [0, 0, 0],
    ref: ref
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Beam);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Camera.js":
/*!**********************************!*\
  !*** ./src/Simulation/Camera.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable no-console */

/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */







(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.e)({});

function Camera() {
  const controls = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    camera
  } = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.y)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    camera.position.z = 4;
  }, [camera]);
  const target = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => state.cameraTarget);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    controls.current.maxDistance = 10;
    controls.current.minDistance = 2;
  }, [controls]);
  const earth = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0));
  const spherical = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new three__WEBPACK_IMPORTED_MODULE_4__.Spherical());
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (target.lock || target.name === 'earth') controls.current.target = earth.current;else controls.current.target = target.ref.position;
  }, [target]);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.z)(({
    clock
  }, delta) => {
    if (!target.ref) return;

    if (target.lock) {
      // controls.current.target = earth.current;
      spherical.current.setFromVector3(target.ref.position);
      controls.current.setAzimuthalAngle(spherical.current.theta);
      controls.current.setPolarAngle(spherical.current.phi);
    } else {// controls.current.target = target.ref.position;
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_5__.OrbitControls, {
    makeDefault: true,
    enableZoom: true,
    enableRotate: target.name === 'earth' || !target.lock,
    enablePan: false,
    ref: controls
  });
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Earth.js":
/*!*********************************!*\
  !*** ./src/Simulation/Earth.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_src_loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/src/loaders/TextureLoader */ "./node_modules/three/src/loaders/TextureLoader.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Assets_Textures_earth_texture_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Assets/Textures/earth-texture.jpg */ "./src/Assets/Textures/earth-texture.jpg");
/* harmony import */ var _Assets_Textures_twoTone_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Assets/Textures/twoTone.jpg */ "./src/Assets/Textures/twoTone.jpg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");






/* eslint-disable consistent-return */

/* eslint-disable react/prop-types */

/* eslint-disable no-param-reassign */

/* eslint-disable import/no-cycle */

/* eslint-disable no-unused-vars */










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.e)({
  Mesh: three__WEBPACK_IMPORTED_MODULE_6__.Mesh,
  SphereGeometry: three__WEBPACK_IMPORTED_MODULE_6__.SphereGeometry,
  MeshToonMaterial: three__WEBPACK_IMPORTED_MODULE_6__.MeshToonMaterial
});

function Earth() {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const colorMap = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.C)(three_src_loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_7__.TextureLoader, _Assets_Textures_earth_texture_jpg__WEBPACK_IMPORTED_MODULE_2__);
  const gradientMap = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.C)(three_src_loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_7__.TextureLoader, _Assets_Textures_twoTone_jpg__WEBPACK_IMPORTED_MODULE_3__);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    gradientMap.minFilter = three__WEBPACK_IMPORTED_MODULE_6__.NearestFilter;
    gradientMap.magFilter = three__WEBPACK_IMPORTED_MODULE_6__.NearestFilter;
  }, [gradientMap]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    colorMap.wrapS = three__WEBPACK_IMPORTED_MODULE_6__.RepeatWrapping;
    colorMap.offset.x = 0.5;
  }, [colorMap]);
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.subscribe(state => {
      frame.current = state.frame;
    });
  }, []);
  const angles = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => state.mission.earth);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.z)(() => {
    ref.current.rotation.y = angles[frame.current];
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("mesh", {
    ref: ref,
    rotation: [0, angles[0], 0],
    position: [0, 0, 0],
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sphereGeometry", {
      attach: "geometry",
      args: [1, 64, 64]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("meshToonMaterial", {
      attach: "material",
      map: colorMap,
      gradientMap: gradientMap
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Earth);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Frame.js":
/*!*********************************!*\
  !*** ./src/Simulation/Frame.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Util_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util/constants */ "./src/Util/constants.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */


 // import { unstable_batchedUpdates } from 'react-dom'; // or 'react-native'




(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.e)({});

const interval = 1 / 60;

function Frame() {
  const updateFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(frame => {
    _Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.setState({
      frame
    });
  }, []);
  const {
    isPaused,
    speed
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => ({
    isPaused: state.isPaused,
    speed: state.speed
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_4__["default"]);
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.z)(({
    clock
  }, delta) => {
    if (!isPaused) {
      let newFrame = frame.current + Math.round(_Util_constants__WEBPACK_IMPORTED_MODULE_2__.FRAMES * (delta * 1000 * _Util_constants__WEBPACK_IMPORTED_MODULE_2__.MIN_SPEED * speed / _Util_constants__WEBPACK_IMPORTED_MODULE_2__.SIM_LENGTH));

      if (newFrame >= _Util_constants__WEBPACK_IMPORTED_MODULE_2__.FRAMES) {
        newFrame = 0;
      }

      if (newFrame !== frame.current) {
        frame.current = newFrame;
        updateFrame(newFrame);
      }
    }
  });
  const {
    clock
  } = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.y)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isPaused === true) clock.stop();
    clock.start();
  }, [isPaused]);
  return null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Frame);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Satellite.js":
/*!*************************************!*\
  !*** ./src/Simulation/Satellite.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/Instances.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/web/Html.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable no-param-reassign */

/* eslint-disable import/no-cycle */

/* eslint-disable react/destructuring-assignment */

/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */








(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.e)({});

const earth = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0);

function Satellite({
  satellite
}) {
  const {
    storeRef,
    toggleLabel,
    satelliteOptions
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => ({
    storeRef: state.storeRef,
    toggleLabel: state.toggleLabel,
    satelliteOptions: state.satelliteOptions.get(satellite.id)
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const satRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (node !== null) {
      storeRef(satellite.id, node);
      satRef.current = node;
    }
  }, []);
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_1__.useFrameStore.subscribe(state => {
      frame.current = state.frame;
    });
  }, []);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.z)(({
    clock
  }, delta) => {
    satRef.current.position.x = satellite.positions.x[frame.current];
    satRef.current.position.y = satellite.positions.y[frame.current];
    satRef.current.position.z = satellite.positions.z[frame.current];
    const lookAt = earth.clone().sub(satRef.current.position);
    satRef.current.lookAt(earth);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_6__.Instance, {
    ref: ref,
    scale: 0.01 // onClick={() => toggleLabel(satellite.id)}
    ,
    color: satelliteOptions.color || 'red',
    up: [0, 0, 1],
    children: satelliteOptions.showLabel ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_7__.Html, {
      style: {
        fontFamily: 'sans-serif',
        color: 'white',
        fontSize: '1rem',
        width: '100ch',
        height: '2rem'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        children: satellite.name
      })
    }) : ''
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Satellite);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Satellites.js":
/*!**************************************!*\
  !*** ./src/Simulation/Satellites.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/Instances.js");
/* harmony import */ var Model_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Model/store */ "./src/Model/store.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Beam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Beam */ "./src/Simulation/Beam.js");
/* harmony import */ var _Satellite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Satellite */ "./src/Simulation/Satellite.js");
/* harmony import */ var _Assets_Textures_twoTone_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Assets/Textures/twoTone.jpg */ "./src/Assets/Textures/twoTone.jpg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");




/* eslint-disable react/prop-types */













(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_6__.e)({
  MeshToonMaterial: three__WEBPACK_IMPORTED_MODULE_7__.MeshToonMaterial
});

function Satellites() {
  const {
    customers,
    spacePowers,
    beams,
    satelliteObj
  } = (0,Model_store__WEBPACK_IMPORTED_MODULE_0__.useStore)(state => ({
    customers: state.mission.satellites.customers,
    spacePowers: state.mission.satellites.spacePowers,
    beams: state.mission.beams,
    satelliteObj: state.satelliteObj
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const gradientMap = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_6__.C)(three__WEBPACK_IMPORTED_MODULE_7__.TextureLoader, _Assets_Textures_twoTone_jpg__WEBPACK_IMPORTED_MODULE_4__);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_three_drei__WEBPACK_IMPORTED_MODULE_9__.Instances, {
      geometry: satelliteObj.nodes.Satellite.geometry,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("meshToonMaterial", {
        gradientMap: gradientMap
      }), spacePowers.map(satellite => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Satellite__WEBPACK_IMPORTED_MODULE_3__["default"], {
        satellite: satellite
      }, satellite.id)), customers.map(satellite => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Satellite__WEBPACK_IMPORTED_MODULE_3__["default"], {
        satellite: satellite
      }, satellite.id))]
    }), beams.map(beam => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Beam__WEBPACK_IMPORTED_MODULE_2__["default"], {
      beam: beam,
      customer: customers.find(customer => customer.id === beam.customerId),
      spacePower: spacePowers.find(spacePower => spacePower.id === beam.spacePowerId)
    }, beam.id))]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Satellites);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Shaders/LaserBeam.js":
/*!*********************************************!*\
  !*** ./src/Simulation/Shaders/LaserBeam.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LaserBeam": () => (/* binding */ LaserBeam),
/* harmony export */   "generateLaserBodyCanvas": () => (/* binding */ generateLaserBodyCanvas),
/* harmony export */   "getLaserMeshes": () => (/* binding */ getLaserMeshes)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable no-shadow */

/* eslint-disable no-plusplus */

/* eslint-disable no-use-before-define */


(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_0__.e)({});

const LaserBeam = (width, height, canvas) => {
  const object3d = new three__WEBPACK_IMPORTED_MODULE_1__.Object3D(); // generate the texture

  const texture = new three__WEBPACK_IMPORTED_MODULE_1__.Texture(canvas);
  texture.needsUpdate = true; // do the material

  const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
    map: texture,
    blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
    color: 0x4444aa,
    side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide,
    depthWrite: false,
    transparent: false
  });
  const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(width, height); //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeRotationX(-Math.PI / 2)
  //   );
  //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeTranslation(0, -height / 2, 0)
  //   );

  const nPlanes = 4;

  for (let i = 0; i < nPlanes; i++) {
    const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
    mesh.translateX(width / 2);
    mesh.rotation.x = i / nPlanes * Math.PI;
    mesh.rotateX(-Math.PI / 2);
    object3d.add(mesh);
  }

  return object3d;
};

const getLaserMeshes = (width, material) => {
  const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(width, 0.01);
  const nPlanes = 4;
  const meshes = [];

  for (let i = 0; i < nPlanes; i++) {
    const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
    mesh.translateX(width / 2);
    mesh.rotation.x = i / nPlanes * Math.PI;
    mesh.rotateX(-Math.PI / 2);
    meshes.push(mesh);
  }

  return meshes;
};

function generateLaserBodyCanvas() {
  // init canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 1;
  canvas.height = 1; // set gradient

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(  0,  0,  0,0.1)');
  gradient.addColorStop(0.4, 'rgba(160,160,160,0.3)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(0.6, 'rgba(160,160,160,0.3)');
  gradient.addColorStop(1.0, 'rgba(  0,  0,  0,0.1)'); // fill the rectangle

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height); // return the just built canvas

  return canvas;
}



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Simulation.js":
/*!**************************************!*\
  !*** ./src/Simulation/Simulation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/react-three-fiber.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/web/View.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/PerformanceMonitor.js");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @react-three/drei */ "./node_modules/@react-three/drei/core/Stars.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frame */ "./src/Simulation/Frame.js");
/* harmony import */ var _Earth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Earth */ "./src/Simulation/Earth.js");
/* harmony import */ var _Sun__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sun */ "./src/Simulation/Sun.js");
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Camera */ "./src/Simulation/Camera.js");
/* harmony import */ var _Satellites__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Satellites */ "./src/Simulation/Satellites.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");




/* eslint-disable react/jsx-curly-brace-presence */

/* eslint-disable react/prop-types */













(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_8__.e)({
  Camera: three__WEBPACK_IMPORTED_MODULE_9__.Camera
});

function Simulation() {
  const viewRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const container = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const isPaused = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => state.isPaused);
  const [dpr, setDpr] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.GridItem, {
    area: "1 / 1 / 4 / 3",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      ref: container,
      style: {
        width: '100%',
        height: '100%',
        position: 'relative' // display: `${shouldDisplay ? 'block' : 'none'}`,

      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        ref: viewRef,
        style: {
          width: '100%',
          height: '100%',
          display: 'inline-block',
          zIndex: 0
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_react_three_fiber__WEBPACK_IMPORTED_MODULE_11__.Canvas, {
        className: "canvas",
        onCreated: state => {
          state.events.connect(container.current);
        },
        style: {
          pointerEvents: 'none',
          position: 'fixed',
          top: '0px',
          left: '0px'
        },
        dpr: dpr,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_12__.View, {
          track: viewRef,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_13__.PerformanceMonitor, {
              onChange: ({
                factor
              }) => setDpr((0.5 + 1.5 * factor).toFixed(1))
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Camera__WEBPACK_IMPORTED_MODULE_5__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Frame__WEBPACK_IMPORTED_MODULE_2__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_14__.Stars, {
              radius: 100 // Radius of the inner sphere (default=100)
              ,
              depth: 50 // Depth of area where stars should fit (default=50)
              ,
              count: 5000 // Amount of stars (default=5000)
              ,
              factor: 4 // Size factor (default=4)
              ,
              saturation: 1 // Saturation 0-1 (default=0)
              ,
              fade: true,
              speed: isPaused ? 0 : 1
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Sun__WEBPACK_IMPORTED_MODULE_4__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Earth__WEBPACK_IMPORTED_MODULE_3__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Satellites__WEBPACK_IMPORTED_MODULE_6__["default"], {})]
          })
        })
      })]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Simulation);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Simulation/Sun.js":
/*!*******************************!*\
  !*** ./src/Simulation/Sun.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! satellite.js/lib/constants */ "./node_modules/satellite.js/lib/constants.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");





/* eslint-disable no-param-reassign */

/* eslint-disable import/no-cycle */

/* eslint-disable react/destructuring-assignment */

/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */







(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({
  Group: three__WEBPACK_IMPORTED_MODULE_5__.Group,
  DirectionalLight: three__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight
});

function Sun() {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.subscribe(state => {
      frame.current = state.frame;
    });
  }, []);
  const position = (0,_Model_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => state.mission.sun);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.z)(({
    clock
  }) => {
    ref.current.position.x = position.x[frame.current];
    ref.current.position.y = position.y[frame.current];
    ref.current.position.z = position.z[frame.current];
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("group", {
    ref: ref,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("directionalLight", {
      color: 0xffffff,
      intensity: 0.5,
      position: [position.x[0], position.y[0], position.z[0]]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sun);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/Controls.js":
/*!****************************!*\
  !*** ./src/UI/Controls.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/menu/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/switch/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/slider/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/radio/dist/index.esm.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/jsx-boolean-value */

/* eslint-disable react/prop-types */

/* eslint-disable consistent-return */











(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

function SimControls() {
  const {
    isPaused,
    togglePaused,
    speed,
    setSpeed
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => ({
    isPaused: state.isPaused,
    togglePaused: state.togglePaused,
    speed: state.speed,
    setSpeed: state.setSpeed
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_5__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuItem, {
      as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Flex,
      justify: "space-between",
      align: "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Button, {
        onClick: () => togglePaused(),
        children: isPaused ? 'Resume' : 'Pause'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.FormLabel, {
        htmlFor: "loop",
        alignSelf: "center",
        mb: 0,
        children: ["Loop", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Switch, {
          id: "loop",
          mx: 1
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuItem, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.FormLabel, {
        htmlFor: "speed",
        children: "Speed"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Slider, {
        name: "speed",
        value: speed,
        onChange: v => setSpeed(v),
        min: 1,
        max: 10,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.SliderTrack, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.SliderFilledTrack, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.SliderThumb, {})]
      })]
    })]
  });
}

function CameraControls({
  satellites
}) {
  const {
    cameraTarget,
    attachCamera,
    detachCamera,
    setLockCamera
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => ({
    cameraTarget: state.cameraTarget,
    attachCamera: state.attachCamera,
    detachCamera: state.detachCamera,
    setLockCamera: state.setLockCamera
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_5__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__.Select, {
      onChange: e => {
        if (e.target.value === 'earth') detachCamera();else attachCamera(e.target.value);
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option", {
        value: "earth",
        children: "Earth"
      }), satellites.customers.map(customer => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option", {
        value: customer.id,
        children: customer.name
      }, customer.id))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuItem, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.RadioGroup, {
        onChange: v => setLockCamera(v === '1'),
        value: cameraTarget.lock ? '1' : '0',
        disabled: cameraTarget.name === 'earth',
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Radio, {
          value: "1",
          children: "Lock"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Radio, {
          value: "0",
          children: "Watch"
        })]
      })
    })]
  });
}
/* eslint-disable react/prop-types */


function Controls() {
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.subscribe(state => {
      frame.current = state.frame;
    });
  }, []);
  const {
    time,
    satellites
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => ({
    time: state.mission.time,
    satellites: state.mission.satellites
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const timeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.n)(() => {
    if (!timeRef.current) return;
    (0,d3__WEBPACK_IMPORTED_MODULE_0__.select)(timeRef.current).text(new Date(time[frame.current]).toString().slice(0, 21));
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    align: "center",
    justify: "center",
    height: "100%",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Text, {
      ref: timeRef,
      width: "22ch",
      children: new Date(time[0]).toString().slice(0, 21)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Menu, {
      closeOnSelect: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuButton, {
        as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Button,
        rightIcon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__.ChevronDownIcon, {}),
        children: "Controls"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuList, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuGroup, {
          title: "Animation",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SimControls, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuDivider, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuGroup, {
          title: "Camera",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(CameraControls, {
            satellites: satellites
          })
        })]
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controls);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/HUD/Gauge.js":
/*!*****************************!*\
  !*** ./src/UI/HUD/Gauge.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gauge)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/no-this-in-sfc */

/* eslint-disable no-underscore-dangle */

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable react/prop-types */

/* eslint-disable no-nested-ternary */






(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

const color = d3__WEBPACK_IMPORTED_MODULE_1__.scaleOrdinal(['white', 'grey', 'rgba(255,255,255,0.2)']);
const pie = d3__WEBPACK_IMPORTED_MODULE_1__.pie().value(d => d.value).startAngle(-Math.PI / 2.2).endAngle(Math.PI / 2.2).sort(null);
function Gauge({
  height,
  selected
}) {
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.subscribe(state => {
      if (state.frame - 2 > frame.current) {
        frame.current = state.frame;
      }

      if (frame.current > state.frame) frame.current = state.frame;
    });
  }, []);
  const data = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const updateData = () => {
    data.current = [{
      id: 2,
      value: selected.performance.chargeStateNoBeams[frame.current] * 100,
      color: selected.performance.chargeStateNoBeams[frame.current] > 0.33 ? 'white' : 'red'
    }, {
      id: 1,
      value: (selected.performance.chargeState[frame.current] - selected.performance.chargeStateNoBeams[frame.current]) * 100,
      color: 'grey'
    }, {
      id: 3,
      value: 100 - selected.performance.chargeState[frame.current] * 100,
      color: 'lightgrey'
    }];
  };

  const arc = d3__WEBPACK_IMPORTED_MODULE_1__.arc().innerRadius(height / 2 - 20).outerRadius(height / 3 - 10);
  const pieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const group = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const groupWithData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const groupWithUpdate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const path = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const createPie = () => {
    group.current = d3__WEBPACK_IMPORTED_MODULE_1__.select(pieRef.current);
    groupWithData.current = group.current.selectAll('g.arc').data(pie(data.current));
    groupWithData.current.exit().remove();
    groupWithUpdate.current = groupWithData.current.enter().append('g').attr('class', 'arc');
    path.current = groupWithUpdate.current.append('path').merge(groupWithData.current.select('path.arc'));
    path.current.attr('class', 'arc').attr('d', arc).attr('fill', d => color(d));
  };

  const prevFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.n)(() => {
    if (prevFrame === frame.current) return;
    if (!pieRef.current) return;
    updateData();
    createPie();
    prevFrame.current = frame.current;
  });
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    pieRef.current = node;
    updateData();
    createPie(data.current);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
    width: height,
    height: height / 2,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("g", {
      ref: ref,
      transform: `translate(${height / 2} ${height / 2})`
    })
  });
} // function change() {
//   const pie = d3.pie()
//     .value((d) => d.presses)(data);
//   path = d3.select('#pie').selectAll('path').data(pie);
// }

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/HUD/HUD.js":
/*!***************************!*\
  !*** ./src/UI/HUD/HUD.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/stat/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Gauge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Gauge */ "./src/UI/HUD/Gauge.js");
/* harmony import */ var _HUD_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HUD.css */ "./src/UI/HUD/HUD.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable react/jsx-curly-brace-presence */

/* eslint-disable consistent-return */

/* eslint-disable react/prop-types */












(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_6__.e)({});

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const statProps = [{
  key: 'netCurrent',
  label: 'Net Current',
  shouldArrows: true,
  getValue: (frame, selected) => {
    const netCurrent = selected.params.load.powerProfiles[selected.performance.sources[frame]][selected.performance.currentDuties[frame]];
    return netCurrent;
  },
  formatValue: value => `${value.toFixed(2)}A`,
  getHelpText: (frame, selected) => capitalize(selected.performance.sources[frame])
}, {
  key: 'consumption',
  label: 'Consumption',
  shouldArrows: false,
  getValue: (frame, selected) => selected.params.load.duties[selected.performance.currentDuties[frame]].consumption,
  formatValue: value => `${value}W`,
  getHelpText: (frame, selected) => `${capitalize(selected.params.load.duties[selected.performance.currentDuties[frame]].name)}`
}, {
  key: 'chargeState',
  label: '',
  shouldArrows: false,
  getValue: (frame, selected) => selected.performance.chargeStateNoBeams[frame] * 100,
  formatValue: value => `${value.toPrecision(3)}%`,
  getHelpText: () => 'w/ Space Power',
  getHelpNumber: (frame, selected) => `${(selected.performance.chargeState[frame] * 100).toPrecision(3)}% `
}];

function HUD() {
  const {
    satellites,
    toggleLabel,
    toggleAllLabels,
    attachCamera,
    detachCamera,
    cameraTarget,
    satelliteOptions,
    view
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => ({
    satellites: state.mission.satellites,
    toggleLabel: state.toggleLabel,
    toggleAllLabels: state.toggleAllLabels,
    satelliteOptions: state.satelliteOptions,
    attachCamera: state.attachCamera,
    detachCamera: state.detachCamera,
    cameraTarget: state.cameraTarget,
    view: state.view
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_7__["default"]); // const [selected, setSelected] = useState(satellites.customers[0]);
  // const selected = useRef(satellites.customers[0]);

  const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(satellites.customers[0]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // selected.current = satellites.customers[0];
    setSelected(() => satellites.customers[0]);
  }, [satellites]);

  const handleSelectSatellite = e => {
    const selection = e.target.value;

    if (selection === 'fleet') {
      setSelected(() => satellites.fleet);
    } else {
      setSelected(() => satellites.customers.find(customer => customer.id === selection));
    }
  };

  const handleLabel = () => {
    toggleLabel(selected.id);
  };

  const handleCamera = () => {
    if (cameraTarget.id === selected.id) detachCamera();else attachCamera(selected.id);
  };

  const hideAllLabels = () => {
    toggleAllLabels(false);
  };

  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_2__.useFrameStore.subscribe(state => {
      if (state.frame - 10 > frame.current) frame.current = state.frame;
      if (frame.current > state.frame) frame.current = state.frame;
    });
  }, []); // const statRefs = useRef([]);

  const statRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());
  const handleStatRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (!node) return;
    const stat = statProps.find(v => v.key === node.id);
    statRefs.current.set(stat.key, { ...stat,
      ref: node
    });
  }, []);
  const prevFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_6__.n)(() => {
    if (prevFrame.current === frame.current) return;
    statRefs.current.forEach(stat => {
      if (!stat.ref) return;
      const parent = d3__WEBPACK_IMPORTED_MODULE_1__.select(stat.ref);

      if (selected.name === 'fleet' && stat.key !== 'chargeState') {
        if (!parent.classed('hide')) d3__WEBPACK_IMPORTED_MODULE_1__.select(stat.ref).classed('hide', true);
        return;
      }

      if (parent.classed('hide')) d3__WEBPACK_IMPORTED_MODULE_1__.select(stat.ref).classed('hide', false);
      const value = stat.getValue(frame.current, selected);
      parent.selectAll('.chakra-stat__number').select('span').text(stat.formatValue(value));
      parent.selectAll('.chakra-stat__help-text').select('.help-text').text(stat.getHelpText(frame.current, selected));

      if (stat.getHelpNumber) {
        parent.selectAll('.chakra-stat__help-text').select('.help-number').text(stat.getHelpNumber(frame.current, selected));
      }

      if (stat.shouldArrows) {
        const upArrow = parent.select('.chakra-stat__help-text').select('.up-arrow');
        const downArrow = parent.select('.chakra-stat__help-text').select('.down-arrow');

        if (value > 0) {
          upArrow.attr('visibility', 'visible');
          upArrow.style('position', 'relative');
          downArrow.attr('visibility', 'hidden');
          downArrow.style('position', 'absolute');
        } else {
          upArrow.attr('visibility', 'hidden');
          upArrow.style('position', 'absolute');
          downArrow.attr('visibility', 'visible');
          downArrow.style('position', 'relative');
        }
      }
    });
    prevFrame.current = frame.current;
  });
  if (!satellites) return;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.GridItem, {
    area: '2 / 1 / 3 / 3',
    zIndex: 99,
    transform: view.name === 'simulation' ? '' : 'translate(-9999px, 0)',
    position: view.name === 'simulation' ? '' : 'absolute',
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex, {
      height: "100%",
      justify: "space-between",
      "align-items": "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Center, {
        flex: 1,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
          px: 2,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Select, {
            onChange: handleSelectSatellite,
            children: [satellites.customers.map(customer => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
              value: customer.id,
              children: customer.name
            }, customer.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
              value: "fleet",
              children: "Fleet"
            })]
          })
        }), selected.name !== 'fleet' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.ButtonGroup, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Button, {
            onClick: handleLabel,
            children: satelliteOptions.get(selected.id).showLabel ? 'Hide Label' : 'Show Label'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Button // onClick={
          //     cameraTarget.id === selected.id
          //       ? () => detachCamera() : () => attachCamera(selected.id)
          //   }
          , {
            onClick: handleCamera,
            children: cameraTarget.id === selected.id ? 'Detach Camera' : 'Attach Camera'
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Button, {
          onClick: hideAllLabels,
          children: 'Hide All Labels'
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
        height: "100%",
        flex: 1,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Center, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Stat, {
            align: "center",
            ref: handleStatRefs,
            id: 'chargeState',
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatLabel, {
              children: "Charge"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Gauge__WEBPACK_IMPORTED_MODULE_3__["default"], {
              height: 200,
              selected: selected,
              styles: {
                position: 'absolute'
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatNumber, {
              textStyle: "number",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {})
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatHelpText, {
              width: "100%",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Text, {
                as: 'span',
                textStyle: "number",
                className: "help-number"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "help-text"
              })]
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Center, {
        flex: 1,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatGroup, {
            children: statProps.slice(0, 2).map(stat => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Stat, {
              width: "30ch",
              id: stat.key,
              ref: handleStatRefs,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatLabel, {
                children: stat.label
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatNumber, {
                textStyle: "number",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {})
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatHelpText, {
                children: [stat.shouldArrows ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatArrow, {
                    type: "increase",
                    className: "up-arrow hide"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.StatArrow, {
                    type: "decrease",
                    className: "down-arrow hide"
                  })]
                }) : '', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  className: "help-text"
                })]
              })]
            }, stat.key))
          })
        })
      })]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HUD);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/ConfigModal.js":
/*!**********************************************!*\
  !*** ./src/UI/MissionPlanner/ConfigModal.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/hooks/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomNumberInput */ "./src/UI/MissionPlanner/CustomNumberInput.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */







(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

const fields = [{
  id: 'inclination',
  step: 1,
  label: 'Inclination',
  min: 0,
  max: 36,
  units: '°'
}, {
  id: 'rightAscension',
  step: 0.01,
  label: 'Right Ascension',
  min: 0,
  max: 36,
  units: '°'
}, {
  id: 'eccentricity',
  step: 0.001,
  label: 'Eccentricity',
  min: -0.1,
  max: 0.1,
  units: '°'
}, {
  id: 'perigee',
  step: 0.001,
  label: 'Perigee',
  min: 0,
  max: 36,
  units: '°'
}, {
  id: 'meanAnomaly',
  step: 0.01,
  label: 'Mean Anomaly',
  min: 0,
  max: 36,
  units: '°'
}, {
  id: 'meanMotion',
  step: 0.01,
  label: 'Mean Motion',
  min: 0,
  max: 0.5,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
    children: ["revs day", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("sup", {
      children: "-1"
    })]
  })
}];

function ConfigModal({
  formik
}) {
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.useDisclosure)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
      onClick: onOpen,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.SettingsIcon, {
        mx: 2
      }), "Power"]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Modal, {
      isOpen: isOpen,
      onClose: onClose,
      size: "xl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalOverlay, {
        backdropFilter: "blur(10px)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalContent, {
        bg: "background.100",
        width: "80vw",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalHeader, {
          align: "center",
          children: "Configure Space Power"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalCloseButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalBody, {
          width: "100%",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__["default"], {
              value: formik.values.spacePowers,
              name: "spacePowers",
              formik: formik,
              label: "Number of power satellites",
              min: 0,
              max: 10
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
            align: "center",
            children: "Offsets"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Flex, {
            justify: "center",
            direction: "row",
            wrap: "wrap",
            width: "100%",
            children: fields.map(param => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__["default"], {
              value: formik.values.offsets[`${param.id}`],
              step: param.step,
              name: `offsets[${param.id}]`,
              units: param.units,
              formik: formik,
              label: param.label,
              min: param.min,
              max: param.max
            }, param.id))
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.ModalFooter, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
            colorScheme: "blue",
            mr: 3,
            onClick: onClose,
            children: "Close"
          })
        })]
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigModal);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/CustomEditableInput.js":
/*!******************************************************!*\
  !*** ./src/UI/MissionPlanner/CustomEditableInput.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/editable/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/input/dist/index.esm.js");
/* harmony import */ var _EditableControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditableControls */ "./src/UI/MissionPlanner/EditableControls.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */





(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

function CustomEditableInput({
  value,
  name,
  form,
  onSubmit
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.FormControl, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Editable, {
      as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.Flex,
      submitOnBlur: true,
      defaultValue: value,
      align: "center",
      width: "auto",
      cursor: "pointer",
      justify: "center",
      onSubmit: v => {
        form.setFieldValue(`${name}`, v);
        onSubmit();
      },
      onCancel: v => {
        form.setFieldValue(`${name}`, v);
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.EditablePreview, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Input, {
        textAlign: "center",
        as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.EditableInput,
        id: "name",
        name: name,
        type: "text",
        variant: "filled"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_EditableControls__WEBPACK_IMPORTED_MODULE_0__["default"], {})]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomEditableInput);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/CustomNumberInput.js":
/*!****************************************************!*\
  !*** ./src/UI/MissionPlanner/CustomNumberInput.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/number-input/dist/index.esm.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */





(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

function CustomNumberInput({
  value,
  min,
  max,
  label,
  name,
  units,
  step,
  formik
}) {
  const errors = (0,formik__WEBPACK_IMPORTED_MODULE_0__.getIn)(formik.errors, name);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.FormControl, {
    maxWidth: "40%",
    p: 5,
    isInvalid: errors,
    as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex,
    direction: "column",
    align: "start",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.FormLabel, {
      htmlFor: `${name}`,
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {
      gap: 1,
      align: "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.NumberInput, {
        id: name,
        name: `${name}`,
        onChange: v => {
          formik.setFieldValue(`${name}`, v);
        },
        value: value,
        step: step,
        min: min,
        max: max,
        flex: 3,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.NumberInputField, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.NumberInputStepper, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.NumberIncrementStepper, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.NumberDecrementStepper, {})]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {
        flex: 1,
        align: "left",
        children: units
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.FormErrorMessage, {
      children: errors
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomNumberInput);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/DutyTab.js":
/*!******************************************!*\
  !*** ./src/UI/MissionPlanner/DutyTab.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/accordion/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/editable/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/input/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _CustomNumberInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomNumberInput */ "./src/UI/MissionPlanner/CustomNumberInput.js");
/* harmony import */ var _defaultInputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultInputs */ "./src/UI/MissionPlanner/defaultInputs.js");
/* harmony import */ var _EditableControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditableControls */ "./src/UI/MissionPlanner/EditableControls.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/no-array-index-key */

/* eslint-disable react/prop-types */










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.e)({});

const defaultFields = [{
  id: 'consumption',
  step: 0.1,
  label: 'Consumption',
  min: 0,
  units: 'W'
}, {
  id: 'priority',
  step: 1,
  min: 1,
  label: 'Priority'
}];
const cyclicalFields = [{
  id: 'cycles',
  steps: 0.1,
  label: 'Cycles per orbit',
  min: 0,
  units: 'cycles'
}, {
  id: 'duration',
  steps: 1,
  label: 'Cycle duration',
  min: 0,
  units: 's'
}];

function DutyTab({
  satIndex,
  formik
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Accordion, {
    maxHeight: "75vh",
    overflowY: "auto",
    width: "100%",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(formik__WEBPACK_IMPORTED_MODULE_0__.FormikProvider, {
      value: formik,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(formik__WEBPACK_IMPORTED_MODULE_0__.FieldArray, {
        name: `satellites[${satIndex}].duties`,
        children: fieldArrayProps => {
          const {
            push,
            remove,
            form
          } = fieldArrayProps;
          const {
            values
          } = form;
          const satellite = values.satellites[satIndex];
          const allFields = satellite.duties.map((duty, index) => {
            const fields = [...defaultFields];

            if (duty.type === 'cyclical') {
              fields.push(...cyclicalFields);
            }

            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AccordionItem, {
              width: "100%",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AccordionButton, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
                  as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Editable, {
                    as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex,
                    align: "center",
                    justify: "center",
                    width: "100%",
                    cursor: "pointer",
                    onChange: v => {
                      form.setFieldValue(`satellites[${satIndex}].duties[${index}].name`, v);
                    },
                    value: duty.name,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.EditablePreview, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Input, {
                      as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.EditableInput,
                      id: "name",
                      name: `satellites[${satIndex}].duties[${index}].name`,
                      type: "text",
                      variant: "filled",
                      maxWidth: "80%"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_EditableControls__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AccordionIcon, {})]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AccordionPanel, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex, {
                  wrap: "wrap",
                  justify: "space-around",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
                    width: "65%",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {
                      htmlFor: `satellites[${satIndex}].duties[${index}].type`,
                      children: "Type"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Select, {
                      name: `satellites[${satIndex}].duties[${index}].type`,
                      onChange: form.handleChange,
                      value: duty.type,
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                        value: "cyclical",
                        children: "Cyclical"
                      })
                    })]
                  }), fields.map(param => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    value: duty[param.id],
                    step: param.step,
                    name: `satellites[${satIndex}].duties[${index}][${param.id}]`,
                    units: param.units,
                    formik: form,
                    label: param.label
                  }, param.id))]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__.Button, {
                  m: 5,
                  onClick: () => {
                    remove(index);
                  },
                  children: "Remove"
                })]
              })]
            }, `${satellite.id}${index}`);
          });
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [allFields, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__.Button, {
              m: 5,
              onClick: e => {
                e.preventDefault();
                push({ ..._defaultInputs__WEBPACK_IMPORTED_MODULE_2__.defaultDuty,
                  name: `Duty ${satellite.duties.length + 1}`,
                  priority: satellite.duties.length + 1
                });
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_13__.AddIcon, {})
            })]
          });
        }
      })
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DutyTab);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/EditableControls.js":
/*!***************************************************!*\
  !*** ./src/UI/MissionPlanner/EditableControls.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/editable/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/prop-types */

/* eslint-disable no-nested-ternary */





(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.e)({});

function EditableControls({
  showEditIcon
}) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps
  } = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.useEditableControls)();
  return isEditing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    justifyContent: "center",
    size: "sm",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_4__.CheckIcon, {}),
      ...getSubmitButtonProps()
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_4__.CloseIcon, {}),
      ...getCancelButtonProps()
    })]
  }) : showEditIcon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
    size: "sm",
    mx: 2,
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_4__.EditIcon, {}),
    ...getEditButtonProps()
  }) : '';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditableControls);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/MissionPlanner.js":
/*!*************************************************!*\
  !*** ./src/UI/MissionPlanner/MissionPlanner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/spinner/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/tabs/dist/index.esm.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Util_astronomy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Util/astronomy */ "./src/Util/astronomy.js");
/* harmony import */ var Model_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Model/store */ "./src/Model/store.js");
/* harmony import */ var _Model_mission__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Model/mission */ "./src/Model/mission.js");
/* harmony import */ var _SatelliteList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SatelliteList */ "./src/UI/MissionPlanner/SatelliteList.js");
/* harmony import */ var _OrbitTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OrbitTab */ "./src/UI/MissionPlanner/OrbitTab.js");
/* harmony import */ var _PowerTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PowerTab */ "./src/UI/MissionPlanner/PowerTab.js");
/* harmony import */ var _DutyTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DutyTab */ "./src/UI/MissionPlanner/DutyTab.js");
/* harmony import */ var _ConfigModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ConfigModal */ "./src/UI/MissionPlanner/ConfigModal.js");
/* harmony import */ var _defaultInputs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./defaultInputs */ "./src/UI/MissionPlanner/defaultInputs.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/no-array-index-key */

/* eslint-disable react/prop-types */

/* eslint-disable no-nested-ternary */

/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable no-unused-expressions */
















(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_12__.e)({});

function fetchTLEs(urls) {
  const tles = [];
  Object.entries(urls).forEach(([key, url]) => {
    (0,Util_astronomy__WEBPACK_IMPORTED_MODULE_2__.loadTLEs)((0,Util_astronomy__WEBPACK_IMPORTED_MODULE_2__.getCorsFreeUrl)(url)).then(res => {
      tles.push({
        name: key,
        tles: res
      });
    });
  });
  return tles;
}

const urls = {
  OneWeb: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=oneweb&FORMAT=tle',
  Starlink: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle',
  Orbcomm: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=orbcomm&FORMAT=tle',
  Galileo: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=galileo&FORMAT=tle',
  Geosynchronous: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=geo&FORMAT=tle'
};

function MissionPlanner({
  shouldDisplay
}) {
  const [satIndex, setSatIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [constellations, setConstellations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const {
    initializeMission,
    setInitialized
  } = (0,Model_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => ({
    initializeMission: state.initializeMission,
    setInitialized: state.setInitialized
  }));
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setConstellations(fetchTLEs(urls));
  }, []);
  const formik = (0,formik__WEBPACK_IMPORTED_MODULE_0__.useFormik)({
    initialValues: _defaultInputs__WEBPACK_IMPORTED_MODULE_10__.defaultValues,
    validationSchema: _Model_mission__WEBPACK_IMPORTED_MODULE_4__.MissionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async values => {
      formik.setSubmitting(true);
      await new Promise((resolve, reject) => {
        setInitialized(false);
        setTimeout(() => {
          try {
            initializeMission(values);
            formik.setStatus('');
          } catch (error) {
            formik.setStatus('Error. Please try different orbital parameters and offsets.');
            reject();
          }

          resolve();
        }, 500);
      });
    }
  });
  return shouldDisplay ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.GridItem, {
      area: "select",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("form", {
        onSubmit: formik.handleSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_SatelliteList__WEBPACK_IMPORTED_MODULE_5__["default"], {
          formik: formik,
          satIndex: satIndex,
          setSatIndex: setSatIndex
        }), formik.values.satellites.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Center, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ConfigModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
              formik: formik
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Button, {
              m: 5,
              type: "submit",
              disabled: formik.isSubmitting,
              children: formik.isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__.Spinner, {}) : 'Generate Mission'
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Center, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Text, {
              color: "red",
              width: "50%",
              align: "center",
              children: formik.status
            })
          })]
        }) : '']
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.GridItem, {
      area: "parameters",
      children: formik.values.satellites.length > 0 && satIndex >= 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Center, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.Tabs, {
          p: 10,
          minWidth: "50%",
          maxWidth: "80%",
          align: "center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.TabList, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.Tab, {
              children: "Orbit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.Tab, {
              children: "Power"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.Tab, {
              children: "Duty"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.TabPanels, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.TabPanel, {
              pt: 10,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_OrbitTab__WEBPACK_IMPORTED_MODULE_6__["default"], {
                satIndex: satIndex,
                formik: formik,
                constellations: constellations
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.TabPanel, {
              pt: 10,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PowerTab__WEBPACK_IMPORTED_MODULE_7__["default"], {
                satIndex: satIndex,
                formik: formik
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.TabPanel, {
              pt: 10,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_DutyTab__WEBPACK_IMPORTED_MODULE_8__["default"], {
                satIndex: satIndex,
                formik: formik
              })
            })]
          })]
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Flex, {
        height: "100%",
        justify: "center",
        align: "center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
          children: "Add satellite to begin..."
        })
      })
    })]
  }) : '';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MissionPlanner);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/OrbitTab.js":
/*!*******************************************!*\
  !*** ./src/UI/MissionPlanner/OrbitTab.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrbitTab)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/input/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/tabs/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/textarea/dist/index.esm.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Util_astronomy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Util/astronomy.js */ "./src/Util/astronomy.js");
/* harmony import */ var _CustomNumberInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomNumberInput */ "./src/UI/MissionPlanner/CustomNumberInput.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/no-array-index-key */

/* eslint-disable react/prop-types */









(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.e)({});

const fields = [{
  id: 'meanMotionDot',
  step: 0.000001,
  label: '1st Derivative of Mean Motion',
  min: -1,
  max: 1,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
    children: ["revs day", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
      children: "-2"
    })]
  })
}, {
  id: 'bstar',
  step: 0.0001,
  label: 'BSTAR',
  min: -2,
  max: 2,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
    children: ["m", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
      children: "-1"
    })]
  })
}, {
  id: 'inclination',
  step: 0.01,
  label: 'Inclination',
  min: 0,
  max: 360,
  units: '°'
}, {
  id: 'rightAscension',
  step: 0.01,
  label: 'Right Ascension',
  min: 0,
  max: 360,
  units: '°'
}, {
  id: 'eccentricity',
  step: 0.001,
  label: 'Eccentricity',
  min: 0,
  max: 1,
  units: '°'
}, {
  id: 'perigee',
  step: 0.001,
  label: 'Perigee',
  min: 0,
  max: 360,
  units: '°'
}, {
  id: 'meanAnomaly',
  step: 0.01,
  label: 'Mean Anomaly',
  min: 0,
  max: 360,
  units: '°'
}, {
  id: 'meanMotion',
  step: 0.01,
  label: 'Mean Motion',
  min: 0,
  max: 16,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
    children: ["revs day", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
      children: "-1"
    })]
  })
}];
function OrbitTab({
  formik,
  satIndex,
  constellations
}) {
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();

  const handleExtractTle = e => {
    e.preventDefault();
    let satRec;

    try {
      const {
        tles
      } = (0,Util_astronomy_js__WEBPACK_IMPORTED_MODULE_2__.parseTLEs)(formik.values.satellites[satIndex].orbit.tle)[0];
      satRec = (0,Util_astronomy_js__WEBPACK_IMPORTED_MODULE_2__.twoline2satrec)(tles.tle1, tles.tle2);
    } catch {
      setError('Error extracting TLE.  Please enter a valid TLE.');
      return;
    }

    const newOrbit = {
      epoch: satRec.epochdatetimelocal,
      meanMotionDot: satRec.ndottle,
      bstar: satRec.bstar,
      inclination: satRec.inclotle,
      rightAscension: satRec.nodeotle,
      eccentricity: satRec.ecco,
      perigee: satRec.argpotle,
      meanAnomaly: satRec.motle,
      meanMotion: satRec.notle,
      tle: formik.values.satellites[satIndex].orbit.tle
    };
    Object.entries(newOrbit).forEach(entry => {
      if (!entry[1]) {
        setError(`Error setting ${entry[0]}. Please enter a valid TLE and try again`);
        return;
      }

      formik.setFieldValue(`satellites[${satIndex}].orbit.[${entry[0]}]`, entry[1]);
    });
    setError('');
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
      justify: "space-around",
      wrap: "wrap",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
        width: "65%",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {
          htmlFor: `satellites[${satIndex}].orbit.epoch`,
          children: "Epoch"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Input, {
          id: "epoch",
          name: `satellites[${satIndex}].orbit.epoch`,
          type: "datetime-local",
          variant: "filled",
          onChange: formik.handleChange,
          value: formik.values.satellites[satIndex].orbit.epoch
        }), !formik.errors.epoch ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormHelperText, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormErrorMessage, {
          children: formik.errors.orbit.epoch
        })]
      }), fields.map(param => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
        value: formik.values.satellites[satIndex].orbit[param.id],
        step: param.step,
        name: `satellites[${satIndex}].orbit[${param.id}]`,
        units: param.units,
        formik: formik,
        label: param.label,
        min: param.min,
        max: param.max
      }, param.id))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Tabs, {
      p: 10,
      minWidth: "50%",
      maxWidth: "80%",
      align: "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.TabList, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Tab, {
          children: "Choose"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Tab, {
          children: "Paste TLE"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.TabPanels, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.TabPanel, {
          pt: 10,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
            wrap: "wrap",
            justify: "space-around",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
              width: "40%",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {
                htmlFor: `satellites[${satIndex}].orbit.constellation`,
                children: "Constellation"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Select, {
                name: `satellites[${satIndex}].orbit.constellation`,
                value: formik.values.satellites[satIndex].orbit.constellation,
                onChange: formik.handleChange,
                children: constellations.map(c => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                  value: c.name,
                  children: c.name
                }, c.name))
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
              width: "40%",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {
                htmlFor: `satellites[${satIndex}].orbit.tle`,
                children: "Satellite"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Select, {
                name: `satellites[${satIndex}].orbit.tle`,
                value: formik.values.satellites[satIndex].orbit.tle,
                onChange: formik.handleChange,
                children: constellations.find(v => v.name === formik.values.satellites[satIndex].orbit.constellation).tles.map((tle, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                  value: `${tle.name}\n${tle.tles.tle1}\n${tle.tles.tle2}`,
                  children: tle.name
                }, `${i}${tle.name}`))
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Button, {
              onClick: handleExtractTle,
              m: 3,
              children: "Extract"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {
            color: "red",
            children: error
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.TabPanel, {
          pt: 10,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {
            width: "90%",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {
              htmlFor: `satellites[${satIndex}].orbit.tle`,
              children: "TLE Input"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__.Textarea, {
              id: "tle",
              name: `satellites[${satIndex}].orbit.tle`,
              onChange: formik.handleChange,
              value: formik.values.satellites[satIndex].orbit.tle,
              placeholder: "Enter TLE here"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormErrorMessage, {
              children: formik.errors.tle
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Button, {
            onClick: handleExtractTle,
            m: 3,
            children: "Extract"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {
            color: "red",
            children: error
          })]
        })]
      })]
    })]
  });
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/PowerTab.js":
/*!*******************************************!*\
  !*** ./src/UI/MissionPlanner/PowerTab.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomNumberInput */ "./src/UI/MissionPlanner/CustomNumberInput.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */






(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

const fields = [{
  id: 'pvVoltage',
  step: 0.1,
  label: 'Voltage',
  min: 0,
  units: 'V'
}, {
  id: 'currentDensity',
  step: 0.1,
  label: 'Current Density',
  min: 0,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
    children: ["Am", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("sup", {
      children: "-2"
    })]
  })
}, {
  id: 'area',
  step: 0.001,
  label: 'Area',
  min: 0,
  units: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
    children: ["m", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("sup", {
      children: "2"
    })]
  })
}];

function PowerTab({
  satIndex,
  formik
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
      children: "Photovoltaic"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      wrap: "wrap",
      justify: "space-around",
      mb: 10,
      children: fields.map(param => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__["default"], {
        value: formik.values.satellites[satIndex].power[param.id],
        step: param.step,
        name: `satellites[${satIndex}].power[${param.id}]`,
        units: param.units,
        formik: formik,
        label: param.label,
        min: param.min,
        max: param.max
      }, param.id))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
      children: "Battery"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      wrap: "wrap",
      justify: "space-around",
      children: [{
        id: 'batteryVoltage',
        step: 0.1,
        label: 'Voltage',
        min: 0,
        units: 'V'
      }, {
        id: 'capacity',
        step: 0.01,
        label: 'Capacity',
        min: 0,
        units: 'Ah'
      }, {
        id: 'powerStoringConsumption',
        step: 0.1,
        label: 'Power storing consumption',
        min: 0,
        units: 'W'
      }].map(param => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CustomNumberInput__WEBPACK_IMPORTED_MODULE_0__["default"], {
        value: formik.values.satellites[satIndex].power[param.id],
        step: param.step,
        name: `satellites[${satIndex}].power[${param.id}]`,
        units: param.units,
        formik: formik,
        label: param.label,
        min: param.min,
        max: param.max
      }, param.id))
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PowerTab);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/SatelliteList.js":
/*!************************************************!*\
  !*** ./src/UI/MissionPlanner/SatelliteList.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _CustomEditableInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomEditableInput */ "./src/UI/MissionPlanner/CustomEditableInput.js");
/* harmony import */ var _defaultInputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultInputs */ "./src/UI/MissionPlanner/defaultInputs.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

function SatelliteListItem({
  satellite,
  index,
  satIndex,
  setSatIndex,
  form,
  remove
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.ListItem, {
    as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.Flex,
    p: 1,
    justify: "space-around",
    align: "center",
    borderRadius: 5,
    layerStyle: index === satIndex ? 'selected' : '',
    onClick: () => setSatIndex(index),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_CustomEditableInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
      value: satellite.name,
      name: `satellites[${index}].name`,
      form: form,
      onSubmit: () => setSatIndex(index)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Button, {
      type: "button",
      className: "secondary",
      onClick: e => {
        e.stopPropagation();

        if (index === satIndex) {
          setSatIndex(() => index > 0 ? index - 1 : 0);
        } else if (index < satIndex) {
          setSatIndex(prev => prev - 1);
        }

        remove(index);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_7__.SmallCloseIcon, {})
    })]
  }, satellite.id);
}

function SatelliteList({
  formik,
  satIndex,
  setSatIndex
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.VStack, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
      align: "center",
      children: "Satellites"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(formik__WEBPACK_IMPORTED_MODULE_0__.FormikProvider, {
      value: formik,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(formik__WEBPACK_IMPORTED_MODULE_0__.FieldArray, {
        name: "satellites",
        children: fieldArrayProps => {
          const {
            push,
            remove,
            form
          } = fieldArrayProps;
          const {
            values
          } = form;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.List, {
              width: "80%",
              maxHeight: "20rem",
              overflowY: "auto",
              children: values.satellites.length > 0 && values.satellites.map((satellite, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SatelliteListItem, {
                satellite: satellite,
                index: index,
                satIndex: satIndex,
                setSatIndex: setSatIndex,
                form: form,
                remove: remove
              }, satellite.id))
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Button, {
              m: 5,
              onClick: () => {
                push({ ..._defaultInputs__WEBPACK_IMPORTED_MODULE_2__.defaultSatellite,
                  name: `Satellite ${values.satellites.length + 1}`,
                  id: (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])()
                });
                setSatIndex(values.satellites.length);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_7__.AddIcon, {})
            })]
          });
        }
      })
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SatelliteList);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/MissionPlanner/defaultInputs.js":
/*!************************************************!*\
  !*** ./src/UI/MissionPlanner/defaultInputs.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultDuty": () => (/* binding */ defaultDuty),
/* harmony export */   "defaultSatellite": () => (/* binding */ defaultSatellite),
/* harmony export */   "defaultValues": () => (/* binding */ defaultValues)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");




(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_0__.e)({});

const defaultDuty = {
  name: 'Cyclical',
  consumption: 3.2,
  type: 'cyclical',
  duration: 600,
  cycles: 6,
  priority: 1
};
const defaultSatellite = {
  orbit: {
    epoch: '2022-09-16T04:30:45',
    meanMotionDot: 0.00003242,
    bstar: 0.0084918,
    inclination: 87.9147,
    rightAscension: 147.6632,
    eccentricity: 0.0002947,
    perigee: 88.9181,
    meanAnomaly: 343.2887,
    meanMotion: 13.16587847,
    tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
    constellation: 'OneWeb'
  },
  power: {
    pvVoltage: 4.7,
    currentDensity: 170.5,
    area: 0.0064,
    batteryVoltage: 3.6,
    capacity: 1.125,
    powerStoringConsumption: 1.2
  },
  duties: [{
    name: 'Cyclical',
    consumption: 3.2,
    type: 'cyclical',
    duration: 600,
    cycles: 6,
    priority: 1
  }]
};
const defaultValues = {
  satellites: [{
    orbit: {
      epoch: '2022-09-16T04:30:45',
      meanMotionDot: 0.00003242,
      bstar: 0.0084918,
      inclination: 87.9147,
      rightAscension: 147.6632,
      eccentricity: 0.0002947,
      perigee: 88.9181,
      meanAnomaly: 343.2887,
      meanMotion: 13.16587847,
      tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
      constellation: 'OneWeb'
    },
    power: {
      pvVoltage: 4.7,
      currentDensity: 170.5,
      area: 0.0064,
      batteryVoltage: 3.6,
      capacity: 1.125,
      powerStoringConsumption: 1.2
    },
    duties: [{
      name: 'Cyclical',
      consumption: 3.2,
      type: 'cyclical',
      duration: 600,
      cycles: 6,
      priority: 1
    }],
    name: 'Satellite 1',
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])()
  }, {
    orbit: {
      epoch: '2022-09-16T05:06:16',
      meanMotionDot: 0.00001674,
      bstar: 0.004385,
      inclination: 87.9151,
      rightAscension: 147.6525,
      eccentricity: 0.0002601,
      perigee: 76.2503,
      meanAnomaly: 352.9196,
      meanMotion: 13.16593118,
      tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
      constellation: 'OneWeb'
    },
    power: {
      pvVoltage: 4.7,
      currentDensity: 170.5,
      area: 0.0064,
      batteryVoltage: 3.6,
      capacity: 1.125,
      powerStoringConsumption: 1.2
    },
    duties: [{
      name: 'Cyclical',
      consumption: 3.2,
      type: 'cyclical',
      duration: 600,
      cycles: 6,
      priority: 1
    }],
    name: 'Satellite 2',
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])()
  }, {
    orbit: {
      epoch: '2022-09-16T07:37:44',
      meanMotionDot: 2e-7,
      bstar: 0.000052609,
      inclination: 87.9156,
      rightAscension: 147.6698,
      eccentricity: 0.0001678,
      perigee: 89.1265,
      meanAnomaly: 358.4823,
      meanMotion: 13.16600059,
      tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
      constellation: 'OneWeb'
    },
    power: {
      pvVoltage: 4.7,
      currentDensity: 170.5,
      area: 0.0064,
      batteryVoltage: 3.6,
      capacity: 1.125,
      powerStoringConsumption: 1.2
    },
    duties: [{
      name: 'Cyclical',
      consumption: 3.2,
      type: 'cyclical',
      duration: 600,
      cycles: 6,
      priority: 1
    }],
    name: 'Satellite 3',
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])()
  }],
  spacePowers: 3,
  offsets: {
    inclination: 6,
    rightAscension: 0,
    eccentricity: 0,
    perigee: 0,
    meanAnomaly: 0,
    meanMotion: 0
  }
};


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/PerformanceView/Chart.js":
/*!*****************************************!*\
  !*** ./src/UI/PerformanceView/Chart.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3fc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3fc */ "./node_modules/d3fc/build/d3fc.js");
/* harmony import */ var d3fc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3fc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var d3_svg_legend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-svg-legend */ "./node_modules/d3-svg-legend/indexRollupNext.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Charts_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Charts.css */ "./src/UI/PerformanceView/Charts.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable no-param-reassign */

/* eslint-disable react/prop-types */











(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_7__.e)({});

const colors = [[[139, 0, 0, 1], [205, 92, 92, 1]], [[0, 100, 0, 1], [85, 107, 47, 1]], [[0, 0, 139, 1], [173, 216, 230, 1]], [[48, 25, 52, 1], [147, 112, 219, 1]], [[204, 85, 0, 1], [255, 191, 0, 1]], [[31, 38, 42, 1], [128, 128, 128, 1]]];
const webglColors = colors.map(color => color.map(col => col.map((c, i) => i < 3 ? c / 255 : 1)));
const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    unit: '%',
    label: '',
    getValue: (frame, satellite) => satellite.performance.chargeState[frame] * 100,
    min: 0,
    max: 100
  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
    label: 'w/o Space Power',
    getValue: (frame, satellite) => satellite.performance.chargeStateNoBeams[frame] * 100,
    min: 0,
    max: 100
  },
  netCurrent: {
    name: 'Net Current',
    unit: 'A',
    label: '',
    getValue: (frame, satellite) => satellite.params.load.powerProfiles[satellite.performance.sources[frame]][satellite.performance.currentDuties[frame]]
  },
  consumption: {
    name: 'Consumption',
    unit: 'W',
    label: '',
    getValue: (frame, satellite) => satellite.params.load.duties[satellite.performance.currentDuties[frame]].consumption
  }
};
const xExtent = d3fc__WEBPACK_IMPORTED_MODULE_1__.extentDate().accessors([d => d[0].x]);
const yExtent = d3fc__WEBPACK_IMPORTED_MODULE_1__.extentLinear().accessors([d => d[0].y]).pad([1, 0]);

const getSeries = (index, context, colorMap) => d3fc__WEBPACK_IMPORTED_MODULE_1__.seriesWebglLine().crossValue(d => d[index].x).mainValue(d => d[index].y).defined(() => 1).equals(previousData => previousData.length > 0).lineWidth(3).context(context).decorate(c => {
  const {
    i,
    j
  } = colorMap[index];
  d3fc__WEBPACK_IMPORTED_MODULE_1__.webglStrokeColor(webglColors[i][j])(c);
});

const gridlines = d3fc__WEBPACK_IMPORTED_MODULE_1__.annotationSvgGridline();

function Chart({
  selected,
  shouldUpdate,
  time,
  zoom
}) {
  const frame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_Model_store__WEBPACK_IMPORTED_MODULE_4__.useFrameStore.getState().frame);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model_store__WEBPACK_IMPORTED_MODULE_4__.useFrameStore.subscribe(state => {
      if (state.frame - 2 > frame.current) {
        frame.current = state.frame;
      }

      if (frame.current > state.frame) {
        frame.current = state.frame;
      } // frame.current = state.frame;

    });
  }, []);
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const data = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const chart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const chartRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const drawChart = () => {
    d3__WEBPACK_IMPORTED_MODULE_2__.select(chartRef.current).datum(data.current).call(chart.current);
  };

  const colorMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const newSeries = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const updateData = () => time.current.map((t, f) => {
    newSeries.current = [];
    selected.current.satellites.forEach(satellite => {
      selected.current.params.forEach(param => {
        const helpers = dataHelpers[param];
        newSeries.current.push({
          x: t,
          y: helpers.getValue(f, satellite)
        });
      });
    });
    return newSeries.current;
  });

  const legendRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const multi = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const series = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const legend = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const ordinal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const labels = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const updateChart = () => {
    const {
      satellites,
      params
    } = selected.current;
    labels.current = satellites.map(satellite => params.map(param => `${satellite.name} ${dataHelpers[param].label}`)).flat();
    colorMap.current = satellites.map((satellite, i) => params.map((param, j) => ({
      i,
      j
    }))).flat();
    ordinal.current = d3__WEBPACK_IMPORTED_MODULE_2__.scaleOrdinal().domain(labels.current).range(labels.current.map((label, index) => {
      const {
        i,
        j
      } = colorMap.current[index];
      return `rgb(${colors[i][j].slice(0, 3)})`;
    }));
    series.current = Array.from({
      length: satellites.length * params.length
    }, (v, i) => getSeries(i, context.current, colorMap.current));
    if (!multi.current) multi.current = d3fc__WEBPACK_IMPORTED_MODULE_1__.seriesWebglMulti();
    multi.current.series(series.current).context(context.current);
    legend.current = (0,d3_svg_legend__WEBPACK_IMPORTED_MODULE_3__.legendColor)().shape('path', d3__WEBPACK_IMPORTED_MODULE_2__.symbol().type(d3__WEBPACK_IMPORTED_MODULE_2__.symbolSquare).size(150)()).shapePadding(20).labelWrap(100).scale(ordinal.current);

    try {
      d3__WEBPACK_IMPORTED_MODULE_2__.select(legendRef.current).select('svg').call(legend.current).select('.legendCells').attr('transform', 'translate(0,150)').attr('align', 'center');
    } catch {}

    if (!chart.current) {
      chart.current = d3fc__WEBPACK_IMPORTED_MODULE_1__.chartCartesian(d3__WEBPACK_IMPORTED_MODULE_2__.scaleTime(), d3__WEBPACK_IMPORTED_MODULE_2__.scaleLinear()).xLabel('Time').svgPlotArea(gridlines).webglPlotArea(multi.current);
    }

    const helpers = dataHelpers[params[0]];
    chart.current.yLabel(helpers.unit).chartLabel(helpers.name).yDomain(yExtent(data.current));
  };

  const nextData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const prevFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_7__.n)(() => {
    if (prevFrame.current === frame.current) return;
    if (!time.current) return;

    if (!chart.current) {
      data.current = updateData();
      updateChart();
      drawChart();

      if (!context.current) {
        const canvas = d3__WEBPACK_IMPORTED_MODULE_2__.select(chartRef.current).select('d3fc-canvas canvas').node();
        context.current = canvas.getContext('webgl');
      }
    }

    if (shouldUpdate.current) {
      data.current = updateData();
      updateChart();
      shouldUpdate.current = false;
    }

    nextData.current = data.current.slice(frame.current - zoom.current > 0 ? frame.current - zoom.current : 0, frame.current); // nextData.current = data.current.slice(0, frame.current);

    chart.current.xDomain(xExtent(nextData.current));
    drawChart();
    prevFrame.current = frame.current;
  });
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    chartRef.current = node;
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
    maxHeight: 500,
    width: "100%",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex, {
      justify: "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        style: {
          width: '80%',
          height: '500px',
          padding: '2.5rem'
        },
        ref: ref,
        id: "chart"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("d3fc-svg", {
        id: "legend",
        ref: legendRef,
        style: {
          width: '20%',
          height: '500px'
        }
      })]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(Chart));

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/PerformanceView/ChartEditor.js":
/*!***********************************************!*\
  !*** ./src/UI/PerformanceView/ChartEditor.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/form-control/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/number-input/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chart */ "./src/UI/PerformanceView/Chart.js");
/* harmony import */ var _SatelliteList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SatelliteList */ "./src/UI/PerformanceView/SatelliteList.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */

/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies









(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.e)({});

const paramChoices = [{
  key: 'chargeState',
  name: 'Charge State',
  selection: ['chargeState', 'chargeStateNoBeams']
}, {
  key: 'netCurrent',
  name: 'Net Current',
  selection: ['netCurrent']
}, {
  key: 'consumption',
  name: 'Consumption',
  selection: ['consumption']
}];

function ChartEditor() {
  const {
    customers,
    time,
    spacePowers,
    averages
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => ({
    customers: state.mission.satellites.customers,
    spacePowers: state.mission.satellites.spacePowers,
    averages: state.mission.satellites.averages,
    time: state.mission.time
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_6__["default"]); // const [selected.current.satellites, setselected.current.satellite] = useState([...customers]);
  // const [selectedParams, setSelectedParams] = useState('chargeState');

  const selected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    satellites: customers.slice(0, 3),
    params: ['chargeState', 'chargeStateNoBeams']
  });
  const [selectedSatellites, setSelectedSatellites] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(customers.slice(0, 3));
  const shouldUpdate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  const toggleSelected = id => {
    const satellite = customers.find(v => v.id === id);

    if (selected.current.satellites.includes(satellite)) {
      if (selected.current.satellites.length === 1) return;
      selected.current.satellites = selected.current.satellites.filter(v => v.id !== satellite.id);
    } else {
      selected.current.satellites = [...selected.current.satellites, satellite];

      if (selected.current.satellites.length > 6) {
        selected.current.satellites.splice(0, 1);
      }
    }

    (0,react__WEBPACK_IMPORTED_MODULE_0__.startTransition)(() => {
      setSelectedSatellites(selected.current.satellites);
    });
    shouldUpdate.current = true;
  };

  const handleSelectParam = e => {
    selected.current.params = paramChoices.find(v => v.key === e.target.value).selection;
    shouldUpdate.current = true;
  };

  const zoom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(1500);

  const handleZoom = v => {
    zoom.current = v;
  };

  const timeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    selected.current.satellites = customers.slice(0, 3);
    timeRef.current = time;
    shouldUpdate.current = true;
  }, [customers, time]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.VStack, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Chart__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selected: selected,
      shouldUpdate: shouldUpdate,
      time: timeRef,
      zoom: zoom
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.FormControl, {
      width: "50%",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Flex, {
        gap: 3,
        align: "center",
        justify: "center",
        m: 3,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.FormLabel, {
          height: "100%",
          margin: 0,
          children: "Zoom:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.NumberInput, {
          defaultValue: 1500,
          min: 500,
          max: 5000,
          step: 100,
          onChange: handleZoom,
          maxWidth: "10rem",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.NumberInputField, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.NumberInputStepper, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.NumberIncrementStepper, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.NumberDecrementStepper, {})]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Text, {
          flex: 1,
          align: "left",
          children: "frames"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Flex, {
      width: "100%",
      justify: "flex-start",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SatelliteList__WEBPACK_IMPORTED_MODULE_3__["default"], {
        toggleSelected: toggleSelected,
        selected: selectedSatellites
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {
        width: "50%",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.VStack, {
          width: "50%",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
            children: "Choose parameter"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Select, {
            onChange: handleSelectParam,
            children: paramChoices.map(choice => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
              value: choice.key,
              children: choice.name
            }, choice.key))
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Box, {
        width: "20%"
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartEditor);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/PerformanceView/PerformanceView.js":
/*!***************************************************!*\
  !*** ./src/UI/PerformanceView/PerformanceView.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _ChartEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChartEditor */ "./src/UI/PerformanceView/ChartEditor.js");
/* harmony import */ var _Summary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Summary */ "./src/UI/PerformanceView/Summary.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */

/* eslint-disable react/prop-types */










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_5__.e)({});

function PerformanceView() {
  const {
    view
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => ({
    view: state.view
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_6__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.GridItem, {
      area: "performance",
      transform: view.name === 'performance' ? '' : 'translate(-9999px, 0)',
      position: view.name === 'performance' ? '' : 'absolute',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ChartEditor__WEBPACK_IMPORTED_MODULE_2__["default"], {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.GridItem, {
      area: "summary",
      transform: view.name === 'performance' ? '' : 'translate(-9999px, 0)',
      position: view.name === 'performance' ? '' : 'absolute',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Summary__WEBPACK_IMPORTED_MODULE_3__["default"], {})
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(PerformanceView));

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/PerformanceView/SatelliteList.js":
/*!*************************************************!*\
  !*** ./src/UI/PerformanceView/SatelliteList.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/checkbox/dist/index.esm.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Charts_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Charts.css */ "./src/UI/PerformanceView/Charts.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */







(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.e)({});

function SatelliteList({
  toggleSelected,
  selected
}) {
  const {
    customers
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_0__.useStore)(state => ({
    customers: state.mission.satellites.customers
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_4__["default"]);

  const handleSelect = e => {
    const {
      id
    } = e.target;
    toggleSelected(id);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.VStack, {
    width: "50%",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h4", {
      children: ["Show data for", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        children: "(max 6)"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.CheckboxGroup, {
      width: "100%",
      children: customers.map(customer => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Checkbox, {
        onChange: handleSelect,
        id: customer.id,
        align: "start",
        isDisabled: selected.length === 1 && selected.includes(customer),
        isChecked: selected.includes(customer),
        children: customer.name
      }, customer.id))
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SatelliteList);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/PerformanceView/Summary.js":
/*!*******************************************!*\
  !*** ./src/UI/PerformanceView/Summary.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/select/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/stat/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/shallow */ "./node_modules/zustand/esm/shallow.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/store */ "./src/Model/store.js");
/* harmony import */ var _Util_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Util/constants */ "./src/Util/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

const statProps = [{
  key: 'dischargeSaved',
  name: 'Discharge Saved',
  getValue: selected => selected.summary.dischargeSaved,
  format: value => `${value.toFixed(2)}Ah`,
  getHelpText: (selected, customers) => {
    if (selected.params) return `${(selected.summary.dischargeSaved / selected.params.battery.capacity).toFixed(1)} full batteries`;
    return `${(selected.summary.dischargeSaved / customers[0].battery.capacity).toFixed(1)} full batteriesd`;
  }
}, {
  key: 'timeCharged',
  name: 'Time spent charging',
  getValue: selected => selected.summary.timeCharged,
  format: value => `${value.toFixed(1)} minutes`,
  getHelpText: selected => {
    const days = _Util_constants__WEBPACK_IMPORTED_MODULE_2__.SIM_LENGTH / (1000 * 60 * 60 * 24);
    return `${(selected.summary.timeCharged * 100 / (days * 60 * 60)).toFixed(1)}% of ${days} days`;
  }
}];

function Summary() {
  const {
    customers,
    fleet
  } = (0,_Model_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => ({
    customers: state.mission.satellites.customers,
    fleet: state.mission.satellites.fleet
  }), zustand_shallow__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(customers[0]);

  const handleSelectSatellite = e => {
    if (e.target.value === 'fleet') setSelected(() => fleet);else {
      setSelected(() => customers.find(v => v.id === e.target.value));
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.VStack, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
      children: "Summary"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Center, {
      minWidth: "50%",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Select, {
        onChange: handleSelectSatellite,
        children: [customers.map(customer => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option", {
          value: customer.id,
          children: customer.name
        }, customer.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option", {
          value: "fleet",
          children: "Fleet"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.StatGroup, {
      children: statProps.map(stat => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Stat, {
        m: 5,
        width: "100%",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.StatLabel, {
          children: stat.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.StatNumber, {
          children: stat.format(stat.getValue(selected))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.StatHelpText, {
          children: stat.getHelpText(selected, customers)
        })]
      }, stat.key))
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Summary);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/ViewButtons.js":
/*!*******************************!*\
  !*** ./src/UI/ViewButtons.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/index.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/index.esm.js");
/* harmony import */ var _Model_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/store */ "./src/Model/store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable react/prop-types */





(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

function ViewButtons() {
  const setView = (0,_Model_store__WEBPACK_IMPORTED_MODULE_0__.useStore)(state => state.setView);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.GridItem, {
    area: "views" // sx={{
    //   borderImageSlice: '1',
    //   borderWidth: '5px',
    //   borderImageSource: 'linear-gradient(to left, #743ad5, #d53a9d)',
    //   borderRadius: '5%',
    // }}
    ,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      alignItems: "center",
      justify: "center",
      height: "100%",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
        onClick: setView,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
          value: "mission",
          children: "Mission Planner"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
          value: "performance",
          children: "Performance View"
        })]
      })
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewButtons);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/UI/index.js":
/*!*************************!*\
  !*** ./src/UI/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HUD": () => (/* reexport safe */ _HUD_HUD__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "MissionPlanner": () => (/* reexport safe */ _MissionPlanner_MissionPlanner__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _MissionPlanner_MissionPlanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissionPlanner/MissionPlanner */ "./src/UI/MissionPlanner/MissionPlanner.js");
/* harmony import */ var _HUD_HUD__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HUD/HUD */ "./src/UI/HUD/HUD.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_0__.e)({});

/* eslint-disable import/prefer-default-export */



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Util/astronomy.js":
/*!*******************************!*\
  !*** ./src/Util/astronomy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractTLE": () => (/* binding */ extractTLE),
/* harmony export */   "generateTLE": () => (/* binding */ generateTLE),
/* harmony export */   "getCorsFreeUrl": () => (/* binding */ getCorsFreeUrl),
/* harmony export */   "getDistance": () => (/* binding */ getDistance),
/* harmony export */   "getEarthRotationAngle": () => (/* binding */ getEarthRotationAngle),
/* harmony export */   "getOrbitAtTime": () => (/* binding */ getOrbitAtTime),
/* harmony export */   "getSunPosition": () => (/* binding */ getSunPosition),
/* harmony export */   "loadTLEs": () => (/* binding */ loadTLEs),
/* harmony export */   "loadTLEsJSON": () => (/* binding */ loadTLEsJSON),
/* harmony export */   "parseTLEs": () => (/* binding */ parseTLEs),
/* harmony export */   "twoline2satrec": () => (/* binding */ twoline2satrec)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! satellite.js/lib/constants */ "./node_modules/satellite.js/lib/constants.js");
/* harmony import */ var satellite_js_lib_ext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! satellite.js/lib/ext */ "./node_modules/satellite.js/lib/ext.js");
/* harmony import */ var satellite_js_lib_propagation_sgp4init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! satellite.js/lib/propagation/sgp4init */ "./node_modules/satellite.js/lib/propagation/sgp4init.js");
/* harmony import */ var satellite_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! satellite.js */ "./node_modules/satellite.js/dist/satellite.es.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable consistent-return */

/* eslint-disable no-param-reassign */

/* eslint-disable no-plusplus */

/* eslint-disable no-continue */

/* eslint-disable no-console */

/* eslint-disable import/prefer-default-export */




/**
 * Return a Satellite imported from two lines of TLE data.
 *
 * Provide the two TLE lines as strings `longstr1` and `longstr2`,
 * and select which standard set of gravitational constants you want
 * by providing `gravity_constants`:
 *
 * `sgp4.propagation.wgs72` - Standard WGS 72 model
 * `sgp4.propagation.wgs84` - More recent WGS 84 model
 * `sgp4.propagation.wgs72old` - Legacy support for old SGP4 behavior
 *
 * Normally, computations are made using letious recent improvements
 * to the algorithm.  If you want to turn some of these off and go
 * back into "afspc" mode, then set `afspc_mode` to `True`.
 */

(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

function extractTLE(longstr1, longstr2) {
  const orbitElements = {};
  orbitElements.epochYear = parseInt(longstr1.substring(18, 20), 10);
  orbitElements.epochDays = parseFloat(longstr1.substring(20, 32));
  orbitElements.meanMotionDot = parseFloat(longstr1.substring(33, 43));
  orbitElements.meanMotionDoubleDot = parseFloat(`.${parseInt(longstr1.substring(44, 50), 10)}E${longstr1.substring(50, 52)}`);
  orbitElements.bstar = parseFloat(`${longstr1.substring(53, 54)}.${parseInt(longstr1.substring(54, 59), 10)}E${longstr1.substring(59, 61)}`); // satrec.satnum = longstr2.substring(2, 7);

  orbitElements.inclination = parseFloat(longstr2.substring(8, 16));
  orbitElements.rightAscension = parseFloat(longstr2.substring(17, 25));
  orbitElements.eccentricity = parseFloat(`.${longstr2.substring(26, 33)}`);
  orbitElements.perigee = parseFloat(longstr2.substring(34, 42));
  orbitElements.meanAnomaly = parseFloat(longstr2.substring(43, 51));
  orbitElements.meanMotion = parseFloat(longstr2.substring(52, 63));
  let year;

  if (orbitElements.epochYear < 57) {
    year = orbitElements.epochYear + 2000;
  } else {
    year = orbitElements.epochYear + 1900;
  }

  const mdhmsResult = (0,satellite_js_lib_ext__WEBPACK_IMPORTED_MODULE_1__.days2mdhms)(year, orbitElements.epochDays);
  const {
    mon,
    day,
    hr,
    minute,
    sec
  } = mdhmsResult;
  orbitElements.epoch = new Date(year, mon, day, hr, minute, sec);
  return orbitElements;
}

function daysIntoYear(date) {
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function generateTLE(orbitElements) {
  const {
    epoch,
    meanMotionDot,
    bstar,
    inclination,
    rightAscension,
    eccentricity,
    perigee,
    meanAnomaly,
    meanMotion
  } = orbitElements;
  let epochYr = String(epoch.getYear());
  if (epochYr > 100) epochYr = epochYr.substring(1);
  let epochDay = daysIntoYear(epoch);
  if (epochDay < 100) epochDay = `0${epochDay}`;
  const epochFraction = String((epoch.getHours() / 24 + epoch.getMinutes() / (60 * 24) + epoch.getSeconds() / (60 * 60 * 24)).toFixed(8)).substring(1);
  let meanMotionDotString = String(meanMotionDot.toFixed(8)).substring(1);

  if (meanMotionDot < 0) {
    meanMotionDotString = `-${meanMotionDotString.substring(1)}`;
  }

  if (meanMotionDot >= 0) {
    meanMotionDotString = ` ${meanMotionDotString}`;
  }

  let bstarMant = String(bstar.toExponential(5)).split('.').join('').substring(0, 6);
  if (bstar > 0) bstarMant = ` ${bstarMant.substring(0, 5)}`;
  const bstarExp = Math.ceil(Math.log10(Math.abs(bstar)));
  const tle1 = `1 00000C 00000A   ${epochYr}${epochDay}${epochFraction} ${meanMotionDotString}  00000-0 ${bstarMant}${bstarExp} 0  0000`;
  let inclinationString = String(inclination.toFixed(4));
  if (inclination < 100) inclinationString = ` ${inclinationString}`;
  let rightAscensionString = String(rightAscension.toFixed(4));

  if (rightAscension < 100) {
    rightAscensionString = ` ${rightAscensionString}`;
  }

  const eccentricityString = String(eccentricity.toFixed(7)).substring(2);
  let perigeeString = String(perigee.toFixed(4));
  if (perigee < 100) perigeeString = ` ${perigeeString}`;
  let meanAnomalyString = String(meanAnomaly.toFixed(4));

  if (meanAnomalyString < 100) {
    meanAnomalyString = ` ${meanAnomalyString}`;
  }

  const meanMotionString = String(meanMotion.toPrecision(10));
  const tle2 = `2 00000 ${inclinationString} ${rightAscensionString} ${eccentricityString} ${perigeeString} ${meanAnomalyString} ${meanMotionString}    00`;
  return {
    tle1,
    tle2
  };
}

function twoline2satrec(longstr1, longstr2) {
  const opsmode = 'i';
  const xpdotp = 1440.0 / (2.0 * satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.pi); // 229.1831180523293;

  let year = 0;
  const satrec = {};
  satrec.error = 0;
  satrec.satnum = longstr1.substring(2, 7);
  satrec.epochyr = parseInt(longstr1.substring(18, 20), 10);
  satrec.epochdays = parseFloat(longstr1.substring(20, 32));
  satrec.ndot = parseFloat(longstr1.substring(33, 43));
  satrec.nddot = parseFloat(`.${parseInt(longstr1.substring(44, 50), 10)}E${longstr1.substring(50, 52)}`);
  satrec.bstar = parseFloat(`${longstr1.substring(53, 54)}.${parseInt(longstr1.substring(54, 59), 10)}E${longstr1.substring(59, 61)}`); // satrec.satnum = longstr2.substring(2, 7);

  satrec.inclo = parseFloat(longstr2.substring(8, 16));
  satrec.nodeo = parseFloat(longstr2.substring(17, 25));
  satrec.ecco = parseFloat(`.${longstr2.substring(26, 33)}`);
  satrec.argpo = parseFloat(longstr2.substring(34, 42));
  satrec.mo = parseFloat(longstr2.substring(43, 51));
  satrec.no = parseFloat(longstr2.substring(52, 63)); // ---- find no, ndot, nddot ----

  satrec.notle = satrec.no;
  satrec.no /= xpdotp; //   rad/min
  // satrec.nddot= satrec.nddot * Math.pow(10.0, nexp);
  // satrec.bstar= satrec.bstar * Math.pow(10.0, ibexp);
  // ---- convert to sgp4 units ----

  satrec.a = (satrec.no * satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.tumin) ** (-2.0 / 3.0);
  satrec.ndottle = satrec.ndot;
  satrec.ndot /= xpdotp * 1440.0; // ? * minperday

  satrec.nddot /= xpdotp * 1440.0 * 1440; // ---- find standard orbital elements ----

  satrec.inclotle = satrec.inclo;
  satrec.inclo *= satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.deg2rad;
  satrec.nodeotle = satrec.nodeo;
  satrec.nodeo *= satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.deg2rad;
  satrec.argpotle = satrec.argpo;
  satrec.argpo *= satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.deg2rad;
  satrec.motle = satrec.mo;
  satrec.mo *= satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.deg2rad;
  satrec.alta = satrec.a * (1.0 + satrec.ecco) - 1.0;
  satrec.altp = satrec.a * (1.0 - satrec.ecco) - 1.0; // ----------------------------------------------------------------
  // find sgp4epoch time of element set
  // remember that sgp4 uses units of days from 0 jan 1950 (sgp4epoch)
  // and minutes from the epoch (time)
  // ----------------------------------------------------------------
  // ---------------- temp fix for years from 1957-2056 -------------------
  // --------- correct fix will occur when year is 4-digit in tle ---------

  if (satrec.epochyr < 57) {
    year = satrec.epochyr + 2000;
  } else {
    year = satrec.epochyr + 1900;
  }

  const mdhmsResult = (0,satellite_js_lib_ext__WEBPACK_IMPORTED_MODULE_1__.days2mdhms)(year, satrec.epochdays);
  const {
    mon,
    day,
    hr,
    minute,
    sec
  } = mdhmsResult;
  satrec.jdsatepoch = (0,satellite_js_lib_ext__WEBPACK_IMPORTED_MODULE_1__.jday)(year, mon, day, hr, minute, sec);
  satrec.epochdate = new Date(year, mon, day, hr, minute, sec);
  satrec.epochdatetimelocal = new Date(satrec.epochdate.getTime() - satrec.epochdate.getTimezoneOffset() * 60000).toISOString().substring(0, 19); //  ---------------- initialize the orbit at sgp4epoch -------------------

  (0,satellite_js_lib_propagation_sgp4init__WEBPACK_IMPORTED_MODULE_2__["default"])(satrec, {
    opsmode,
    satn: satrec.satnum,
    epoch: satrec.jdsatepoch - 2433281.5,
    xbstar: satrec.bstar,
    xecco: satrec.ecco,
    xargpo: satrec.argpo,
    xinclo: satrec.inclo,
    xmo: satrec.mo,
    xno: satrec.no,
    xnodeo: satrec.nodeo
  });
  return satrec;
}

function getCorsFreeUrl(url) {
  return `https://api.allorigins.win/raw?url=${url}`;
}

function parseTLEs(fileContent) {
  const result = [];
  const lines = fileContent.split('\n');
  if (lines < 2) throw new Error('Error parsing TLE');
  let current = null;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    if (line.length === 0) continue;

    if (line[0] !== '1' && line[0] !== '2') {
      current = {
        name: line
      };
    } else if (line[0] === '1') {
      current = { ...current,
        tles: { ...current.tles,
          tle1: line
        }
      };
    } else if (line[0] === '2') {
      current = { ...current,
        tles: { ...current.tles,
          tle2: line
        }
      };
      result.push(current);
    } else throw new Error('Error parsing TLE');
  }

  return result;
}

function loadTLEsJSON(url) {
  return fetch(url).then(res => {
    if (res.ok) {
      return res.text().then(text => JSON.parse(text));
    }
  });
}

function loadTLEs(url) {
  return fetch(url).then(res => {
    if (res.ok) {
      return res.text().then(text => {
        const satellites = parseTLEs(text);
        return satellites;
      });
    }
  });
}

const toThree = v => ({
  x: v.x / satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius,
  y: v.z / satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius,
  z: -v.y / satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius
});

function getPositionFromTLE(satellite, date) {
  const positionVelocity = satellite_js__WEBPACK_IMPORTED_MODULE_3__.propagate(satellite.orbit, date);
  const positionEci = positionVelocity.position;
  return toThree(positionEci);
}

function getOrbitAtTime(satellite, time) {
  const pos = getPositionFromTLE(satellite, time); // return new THREE.Vector3(pos.x, pos.y, pos.z);

  return {
    x: pos.x,
    y: pos.y,
    z: pos.z
  };
}

function getSunPosition(time) {
  const N = time.getTime() / 86400000 + 2440587 - 2451545;
  let L = 4.89495042 + 0.0172027923937 * N;
  if (L > 2 * Math.PI) L -= 2 * Math.PI;
  let g = 6.240040768 + 0.0172019703436 * N;
  if (g > 2 * Math.PI) g -= 2 * Math.PI;
  const longitude = L + 0.033423055 * Math.sin(g) + 0.0003490659 * Math.sin(g);
  const distance = 1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g) * (149597870.7 / satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius);
  const obliquity = 0.40907027 - 6.981317008e-9 * N;
  const y = distance * Math.sin(obliquity) * Math.sin(longitude);
  const x = distance * Math.cos(longitude);
  const z = -(distance * Math.cos(obliquity) * Math.sin(longitude));
  return {
    x,
    y,
    z
  };
}

function getEarthRotationAngle(date) {
  const JD = date / 86400000 + 2440587 - 2451545;
  return 2 * Math.PI * (0.779057273264 + 1.002737811911355 * JD);
}

function getDistance(position1, position2) {
  const a = position1.x - position2.x;
  const b = position1.y - position2.y;
  const c = position1.z - position2.z;
  return Math.sqrt(a * a + b * b + c * c);
}



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Util/constants.js":
/*!*******************************!*\
  !*** ./src/Util/constants.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BEAM_DISTANCE": () => (/* binding */ BEAM_DISTANCE),
/* harmony export */   "FRAMES": () => (/* binding */ FRAMES),
/* harmony export */   "MIN_SPEED": () => (/* binding */ MIN_SPEED),
/* harmony export */   "SIM_LENGTH": () => (/* binding */ SIM_LENGTH)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_0__.e)({});

const SIM_LENGTH = 24 * 60 * 60 * 2 * 1000; // ms

const FPmS = 120 / 1000;
const BEAM_DISTANCE = 1000;
const MIN_SPEED = 600;
const FRAMES = SIM_LENGTH * (FPmS / MIN_SPEED);


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/Util/power.js":
/*!***************************!*\
  !*** ./src/Util/power.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getChargeState": () => (/* binding */ getChargeState),
/* harmony export */   "getNetCurrent": () => (/* binding */ getNetCurrent),
/* harmony export */   "isEclipsed": () => (/* binding */ isEclipsed)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! satellite.js/lib/constants */ "./node_modules/satellite.js/lib/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/Util/constants.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable no-param-reassign */

/* eslint-disable import/prefer-default-export */



(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.e)({});

const THREE = __webpack_require__(/*! three */ "./node_modules/three/build/three.cjs");

const earthPosition = new THREE.Vector3(0, 0, 0);
const sunPosition = new THREE.Vector3();
const satPosition = new THREE.Vector3();
const sunEarth = new THREE.Vector3();
const sunSat = new THREE.Vector3();

function isEclipsed(satellite, sun) {
  sunPosition.fromArray([sun.x, sun.y, sun.z]);
  satPosition.fromArray([satellite.x, satellite.y, satellite.z]);
  sunEarth.subVectors(earthPosition, sunPosition);
  sunSat.subVectors(satPosition, earthPosition);
  const angle = sunEarth.angleTo(sunSat);
  const sunEarthDistance = sunPosition.distanceTo(earthPosition);
  const sunSatDistance = sunPosition.distanceTo(satPosition);
  const limbAngle = Math.atan2(satellite_js_lib_constants__WEBPACK_IMPORTED_MODULE_0__.earthRadius, sunEarthDistance);

  if (angle > limbAngle || sunSatDistance < sunEarthDistance) {
    return false;
  }

  return true;
}

function getNetCurrent(params, source, currentDuty) {
  const powerProfile = params.load.powerProfiles[source];
  return powerProfile[currentDuty];
}

function getChargeState(params, currentDuty, source, chargeState, delta) {
  const netCurrent = getNetCurrent(params, source, currentDuty);
  const {
    capacity
  } = params.battery;

  if (chargeState >= 1.0 && netCurrent >= 0) {
    return 1;
  }

  if (chargeState <= 0 && netCurrent <= 0) {
    return 0;
  }

  return (chargeState * capacity + delta * netCurrent) / capacity;
}



const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/color-mode/dist/index.esm.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ "./src/theme.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");










(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.e)({});

const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(document.getElementById('root')); // createRoot(container!) if you use TypeScript

root.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.ColorModeScript, {
    initialColorMode: _theme__WEBPACK_IMPORTED_MODULE_2__["default"].config.initialColorMode
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_App__WEBPACK_IMPORTED_MODULE_1__["default"], {})]
}));

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-three/fiber */ "./node_modules/@react-three/fiber/dist/index-05f8627d.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/react/dist/index.esm.js");
/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/theme-tools */ "./node_modules/@chakra-ui/theme-tools/dist/index.esm.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



/* eslint-disable quotes */



(0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_0__.e)({});

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
};
const styles = {
  global: props => ({
    body: {
      bg: (0,_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__.mode)('white', '#110916')(props),
      fontFamily: `'Barlow', sans-serif`
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      padding: '2rem'
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      padding: '1.5rem'
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: '0.5rem'
    }
  })
};
const fonts = {
  fonts: {
    heading: `'Arial', sans-serif`,
    body: `'Barlow', sans-serif`
  }
};
const layerStyles = {
  selected: {
    bg: 'rgba(255,255,255,0.1)'
  }
};
const textStyles = {
  number: {
    fontFamily: '"Azeret Mono", monospace'
  }
};
const components = {
  FormControl: {
    baseStyle: {
      width: "auto"
    }
  },
  Modal: {
    sizes: {
      xl: {
        dialog: {
          height: "auto",
          minWidth: "50vw"
        }
      }
    }
  }
};
const colors = {
  background: {
    100: 'hsl(276.9,41.9%,20%)',
    200: 'hsl(276.9,41.9%,10%)',
    300: 'hsl(276.9,41.9%,6.1%)'
  }
};
const theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.extendTheme)({
  config,
  styles,
  fonts,
  layerStyles,
  textStyles,
  components,
  colors
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/HUD/HUD.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/HUD/HUD.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".hide {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/UI/HUD/HUD.css"],"names":[],"mappings":"AAAA;EACE,aAAA;AACF","sourcesContent":[".hide {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/PerformanceView/Charts.css":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/PerformanceView/Charts.css ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".gridline-x, .gridline-y {\n  z-index: 4;\n  stroke: white;\n  stroke-width: 0.1;\n}\n\n.webgl-plot-area {\n  background-color: hsl(276.9deg, 41.9%, 20%);\n}\n\n.domain {\n  stroke: white;\n}\n\n.tick > text {\n  stroke: white;\n  fill: white;\n  outline: 0;\n  font-family: \"Barlow\", \"sans-serif\";\n  stroke-width: 0;\n}\n\n.tick > path {\n  stroke: white;\n  fill: white;\n}\n\n/* .y-label {\n  transform: rotate(-90)\n} */\n.selected {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n#legend {\n  position: relative;\n  display: block;\n  stroke: white;\n  fill: white;\n  stroke-width: 0px;\n  font-size: 0.75rem;\n}", "",{"version":3,"sources":["webpack://./src/UI/PerformanceView/Charts.css"],"names":[],"mappings":"AACA;EACE,UAAA;EACA,aAAA;EACA,iBAAA;AAAF;;AAGA;EACE,2CAAA;AAAF;;AAIA;EACE,aAAA;AADF;;AAIA;EACE,aAAA;EACA,WAAA;EACA,UAAA;EACA,mCAAA;EACA,eAAA;AADF;;AAGA;EACE,aAAA;EACA,WAAA;AAAF;;AAGA;;GAAA;AAIA;EACE,0CAAA;AADF;;AAIA;EACE,kBAAA;EACA,cAAA;EACA,aAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AADF","sourcesContent":["\n.gridline-x, .gridline-y {\n  z-index: 4;\n  stroke: white;\n  stroke-width: 0.1;\n}\n\n.webgl-plot-area {\n  background-color: hsl(276.9,41.9%,20%);\n\n}\n\n.domain {\n  stroke: white;\n}\n\n.tick > text {\n  stroke: white;\n  fill: white;\n  outline: 0;\n  font-family: 'Barlow', 'sans-serif';\n  stroke-width: 0;\n}\n.tick > path{\n  stroke: white;\n  fill: white;\n}\n\n/* .y-label {\n  transform: rotate(-90)\n} */\n\n.selected {\n  background-color: rgba(255,255,255,0.1),\n};\n\n#legend {\n  position: relative;\n  display: block;\n  stroke: white;\n  fill: white;\n  stroke-width: 0px;\n  font-size: 0.75rem;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/UI/HUD/HUD.css":
/*!****************************!*\
  !*** ./src/UI/HUD/HUD.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_HUD_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./HUD.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/HUD/HUD.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_HUD_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_HUD_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_HUD_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_HUD_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/UI/PerformanceView/Charts.css":
/*!*******************************************!*\
  !*** ./src/UI/PerformanceView/Charts.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_Charts_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Charts.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/UI/PerformanceView/Charts.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_Charts_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_Charts_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_Charts_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_Charts_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Assets/Mesh/lowpolysat.glb":
/*!****************************************!*\
  !*** ./src/Assets/Mesh/lowpolysat.glb ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/a8ff8cdd5673af8ebb34.glb";

/***/ }),

/***/ "./src/Assets/Textures/earth-texture.jpg":
/*!***********************************************!*\
  !*** ./src/Assets/Textures/earth-texture.jpg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/1156fe1d14e10444eb47.jpg";

/***/ }),

/***/ "./src/Assets/Textures/twoTone.jpg":
/*!*****************************************!*\
  !*** ./src/Assets/Textures/twoTone.jpg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/c6a4c44bb1719fc3dfc4.jpg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_chakra-ui_icons_dist_index_esm_js-node_modules_chakra-ui_react_dist_inde-3b2d57"], () => (__webpack_exec__("./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js"), __webpack_exec__("./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ErrorOverlayEntry.js?sockPort=3000&sockProtocol=http"), __webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.bundle.js.map