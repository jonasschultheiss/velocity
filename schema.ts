interface IReturnedData {
  swimmer: {
    gender: gender;
    firstName: string;
    lastName: string;
    birthday: string;
  };
  stroke: strokes;
  trackLength: trackLength;
  data: {
    '50': number | undefined;
    '100': number | undefined;
    '200': number | undefined;
    '400': number | undefined;
    '800': number | undefined;
    '1500': number | undefined;
    '5000': number | undefined;
  };
}

enum strokes {
  butterfly,
  backstroke,
  breaststroke,
  freestyle,
  medley,
}

enum gender {
  'MALE',
  'FEMALE',
  'DIVERSE',
}

enum distance {
  '50m',
  '100m',
  '200m',
  '400m',
  '800m',
  '1500m',
  '5000m',
}

enum trackLength {
  '25m',
  '50m',
}
