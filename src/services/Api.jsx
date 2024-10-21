
export const Config = {
    baseURL: 'http://127.0.0.1:5000'
}


export const buscar_animes = async () => {
    try {
      const response = await fetch(`${Config.baseURL}/anime/`, {
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
};


export const buscar_animes_andamento = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/episodio/releaseEp`, {
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
};


export const buscar_animes_release = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/anime/?order_by=-releaseDate`, {
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
};

export const buscar_generos = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/genero/`, {
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


