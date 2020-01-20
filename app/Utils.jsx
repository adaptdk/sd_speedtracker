import queryString from 'query-string';

const getColor = (color, opacity) => (
  `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity || 1})`
);

const leftPad = (input, length, pad) => {
  const inputStr = input.toString();
  const lengthDiff = length - inputStr.length;

  if (lengthDiff > 0) {
    return (pad || '0').repeat(lengthDiff) + inputStr;
  }

  return inputStr;
};

const getVideoFrameURL = (baseURL, id, frame) => {
  const {
    _t: time,
    _i: name,
  } = frame;

  const filename = name || `frame_${leftPad(time / 100, 4)}.jpg`;

  return `${baseURL || 'https://www.webpagetest.org'}/getfile.php?test=${id}&video=video_1&file=${filename}`;
};


const traverseObject = (obj, callback, path) => {
  if ((typeof obj === 'object') && !(obj instanceof Array)) {
    Object.keys(obj).forEach((key) => {
      traverseObject(obj[key], callback, (path || []).concat(key));
    });
  } else {
    callback(obj, (path || []));
  }
};

const formatProfileValues = (values) => {
  const {
    isfrontpage, name, interval, connectivity, location, url, runs, video,
  } = values;

  return {
    isfrontpage,
    name,
    interval,
    parameters: {
      connectivity,
      location,
      url,
      runs,
      video,
    },
  };
};

const getProfile = (query) => {
  const { name } = queryString.parse(query);
  const profiles = window.PROFILES;

  if (!name) return undefined;
  return profiles.find(profile => profile.name === name);
};

const getTimestampsByInterval = (timestamps, dateFrom, dateTo) => (
  timestamps
    .filter(({ date }) => {
      const timestampMillis = date * 1000;
      return ((timestampMillis >= dateFrom) && (timestampMillis <= dateTo));
    })
    .map(({ date }) => date)
);

const hexToRgb = (hexes) => {
  let transformedHexes = {};
  Object.values(hexes).forEach((hex, index) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    transformedHexes = {
      ...transformedHexes,
      [Object.keys(hexes)[index]]: `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`,
    };
  });
  return transformedHexes;
};

const formatDashboard = (props) => {
  const {
    results,
    period: { from, to },
    profile: { parameters: { url }, wptUrl: wpt },
  } = props;
  const dateFrom = from.getTime();
  const dateTo = to.getTime();
  const timestamps = getTimestampsByInterval(results, dateFrom, dateTo);
  const lastTs = timestamps[timestamps.length - 1];
  const lastResult = results.find(obj => (
    obj.date === lastTs
  ));
  const videoFrames = (lastResult && lastResult.videoFrames) || [];
  let wptUrl = null;

  if (wpt) {
    if (wpt.indexOf('http') === 0) {
      wptUrl = wpt;
    }
  } else {
    wptUrl = 'https://www.webpagetest.org';
  }

  const profileUrl = url;

  return {
    timestamps,
    profileUrl,
    lastResult,
    wptUrl,
    videoFrames,
    results,
  };
};

export {
  getProfile,
  formatProfileValues,
  hexToRgb,
  getColor,
  getVideoFrameURL,
  getTimestampsByInterval,
  traverseObject,
  formatDashboard,
};
