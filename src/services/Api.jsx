
export const Config = {
    baseURL: 'https://api.cloudfilmes.com',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25vbWUiOiJ0ZXN0ZSIsImV4cCI6MTcyNTU4MzcyNSwiZGlhcyI6InRlc3RlQCIsInNlbmhhIjoiMTIzNCIsInBlcm1pc3NvZXMiOiJhbGwifQ.rj5rcj4Smm59FreUVZ1wgi-7oHnj39DjHWEUoxqq6sY",
}

export const buscar_token = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/token`, {
      method: 'GET'
      })
      const json = await response.json();
      //console.log(json.results)
      const status = response.status;

      return {success: true, data: json.results, status: status};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
}



export const buscar_animes = async (token) => {
    try {
      const response = await fetch(`${Config.baseURL}/anime/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
        })
        const json = await response.json();
        //console.log(json.results)
        const status = response.status;

        return {success: true, data: json.results, status: status};

    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
};


export const buscar_animes_andamento = async (token) => {
  try {
    const response = await fetch(`${Config.baseURL}/episodio/releaseEp`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
      })
      const json = await response.json();
      //console.log(json.results)
      const status = response.status;

      return {success: true, data: json.results, status: status};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const buscar_animes_release = async (token) => {
  try {
    const response = await fetch(`${Config.baseURL}/anime/?order_by=-releaseDate`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
      })
      const json = await response.json();
      //console.log(json.results)
      const status = response.status;

      return {success: true, data: json.results, status: status};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

export const buscar_generos = async (token) => {
  try {
    const response = await fetch(`${Config.baseURL}/genero/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
      })
      const json = await response.json();
      //console.log(json.results)
      const status = response.status;

      return {success: true, data: json.results, status: status};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
}


