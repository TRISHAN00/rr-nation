const BASE_URL = process.env.CMS_API_BASE_URL;

export async function getApi(param) {
  const response = await fetch(
    `${BASE_URL}/api/get-req-data/sections?type=slug&value=${param}&get_section=yes&image=yes&post=yes&file=no&gallery=no`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getChildApi(param) {
  const response = await fetch(
    `${BASE_URL}/api/get-req-data/child-pages?page_id=${param}&image=yes&post=yes&file=no&gallery=no&sections=yes`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getSettingApi() {
  const response = await fetch(
    `${BASE_URL}/api/get-req-data/settings-data`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
