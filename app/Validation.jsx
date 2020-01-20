export const required = (value) => {
  if (!value) return 'This field is required';
  return undefined;
};

export const maxName = (value) => {
  if (value && value.length >= 100) return 'Max 100 characters';
  return undefined;
};

export const interval = (value) => {
  if (value && (value > 48 || value < 2)) return 'Interval must be between 2 and 48';
  return undefined;
};

export const runs = (value) => {
  if (value && (value > 5 || value < 1)) return 'Run count must be between 1 an 5';
  return undefined;
};

export const url = (value) => {
  if (value && !value.match(/https?:\/\//)) return 'Url must be valid';
  return undefined;
};

export const specialCharacters = (value) => {
  if (value && value.match(/[^a-zA-Z-]/)) return 'Name can only have letters and dashes';
  return undefined;
};
