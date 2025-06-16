export const useClaimJwt = () => {
  const setClaimJwt = (value: string) => {
    const data = { value, expiresAt: Date.now() + 2 * 24 * 60 * 60 * 1000 };
    localStorage.setItem('claimJwt', JSON.stringify(data));
  };

  const getClaimJwt = () => {
    const stored = localStorage.getItem('claimJwt');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Date.now() < parsed.expiresAt) {
        return parsed.value;
      } else {
        localStorage.removeItem('claimJwt');
      }
      return null;
    }
  };

  const removeClaimJwt = () => {
    localStorage.removeItem('claimJwt');
  };

  return {
    setClaimJwt,
    getClaimJwt,
    removeClaimJwt,
  };
};
