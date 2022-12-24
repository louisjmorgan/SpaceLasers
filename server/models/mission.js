const Yup = require('yup')

module.exports = Yup.object().shape({
  
  size: Yup.number()
    .integer()
    .min(1, 'Size must be 1 or more!')
    .max(6, 'Size must be 6 or less!')
    .required('required'),
  satellites: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .trim(),
        tle1: Yup.string()
          .min(69, 'tle must be 69 columns')
          .max(69, 'tle must be 69 columns')
          .required('required'),
        tle2: Yup.string()
          .min(69, 'tle must be 69 columns')
          .max(69, 'tle must be 69 columns')
          .required('required'),
      })
    ),
  pvVoltage: Yup.number()
    .min(0, 'Must be positive')
    .required('required'),
  currentDensity: Yup.number()
    .min(0, 'Must be positive')
    .required('required'),
  area: Yup.number()
    .min(0, 'Must be greater than 0')
    .required('required'),
  batteryVoltage: Yup.number()
    .min(0, 'Must be positive')
    .required('required'),
  capacity: Yup.number()
    .min(0, 'Must be greater than 0')
    .required('required'),
  powerProfiles: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(30, 'Too Long!')
          .required('required!'),
        consumption: Yup.number()
          .min(0, 'Must be positive')
          .required('required'),
        duration: Yup.number()
          .min(0, 'Must be positive'),
        cycles: Yup.number()
        .integer()
          .min(1, 'Must be an integer greater than 0'),
      })
    )
});