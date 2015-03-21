export const nestedKey = (key: string, instance: object): any => {  // eslint-disable-line
  const keys = key.split('.');

  let currentObject: any = instance;

  for (let i = 0; i < keys.length; i += 1) {
    let selectedKey = keys[i] as any;
    const numericKey = Number(selectedKey);

    if (numericKey) {
      selectedKey = numericKey;
    }

    if (!currentObject[selectedKey]) {
      currentObject[selectedKey] = {};
    }

    currentObject = currentObject[selectedKey];
  }

  return currentObject || undefined;
};
