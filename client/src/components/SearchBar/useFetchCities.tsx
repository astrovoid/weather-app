import { useState, useEffect } from "react";
import { cityFetch } from "../../api/axios";
import { useDebounce } from "../../helpers/hooks";

type useFetchCitiesResult = [
  { cities: any[]; isLoading: boolean; isError: boolean },
  (value: string) => void,
  (value: any) => void
];

const useFetchCities = (maxElements: number): useFetchCitiesResult => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 3) {
      setIsError(false);
      setIsLoading(true);

      findCity(debouncedSearchQuery, maxElements)
        .then((data) => {
          setCitiesList(data);
          setIsLoading(false);
        })
        .catch(e => {
          console.error(e)
          setIsError(true);
        });
    }
  }, [debouncedSearchQuery, maxElements]);

  return [{ cities, isLoading, isError }, setSearchQuery, setCitiesList];
};

const findCity = async (word: string, maxElements: number): Promise<never[]> => {
  try {
    const response = await cityFetch.get("/autocomplete/cities", { params: { name: word, maxElements }});

    return response.data;
  } catch (e) {
    throw e;
  }
};

export default useFetchCities;
