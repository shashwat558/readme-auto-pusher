export const createRepo = async ({token}: {token:string}) => {
  const url = `https://api.github.com/user/repos`;

  const body = JSON.stringify({
    name: "proof-of-work",
    auto_init: true

  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
       
        'Accept': 'application/vnd.github.v3+json'
    },
    body: body
  });

  if(!response.ok){
    const error = await response.json() as { message?: string };
    throw new Error(error.message || "An unknown error occurred");
  }

  const data = await response.json();
  console.log("Repo created", data);
  return data;
};