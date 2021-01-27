export const getIdpUri = (uriConfig = {}, idpName) => {
  const { baseUri, idps } = uriConfig;

  if (!idpName || !baseUri || !idps) {
    return "";
  };

  const idpId = idps[idpName];

  if (!idpId) {
    return "";
  }

  return `${baseUri}/sso/idps/${idpId}`;
};
