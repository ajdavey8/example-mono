type CdkResource = {
  [key: string]: {
    [key: string]: unknown;
  };
};

export const logicalIdFromResource = (resource: CdkResource) => {
  try {
    const resKeys = Object.keys(resource);
    if (resKeys.length !== 1) {
      throw new Error("Resource is not unique.");
    }
    const [logicalId] = resKeys;
    return logicalId;
  } catch (err) {
    console.log(resource);
    throw err;
  }
};
