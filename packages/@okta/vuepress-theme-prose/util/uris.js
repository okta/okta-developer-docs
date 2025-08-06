export const getIdpUri = (uriConfig = {}, idpName) => {
  const { baseUriSocial, idps } = uriConfig;

  if (!idpName || !baseUriSocial || !idps) {
    return "";
  };

  const idpId = idps[idpName];

  if (!idpId) {
    return "";
  }

  return `${baseUriSocial}/sso/idps/${idpId}`;
};
