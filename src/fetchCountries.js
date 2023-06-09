import { Notify } from "notiflix"

export const fetchCountries = function(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
      .then(response => {
            if(response.status === 404) {
                return Notify.failure("Oops, there is no country with that name")
            }
            
            return response.json()
      })
}
