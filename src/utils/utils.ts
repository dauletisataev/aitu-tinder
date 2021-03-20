export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const setKisToken = (val) => {
  document.cookie = "kis_token=" + val + "; path=/; Max-Age=2592000";
};
