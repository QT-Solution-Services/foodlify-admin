import useAuthentication from "@/hooks/useAuthentication";
import {
  createContext,
  ReactNode,
  FC,
  useEffect,
  useState,
  useContext,
} from "react";

interface RestaurantData {
  body: any[];
  message: string;
}

interface ResturantContextProps {
  resturantData: [];
  resurantsLength: number;
  reqLoading: boolean;
}

export const ResturantContext = createContext<ResturantContextProps>({
  resturantData: [],
  resurantsLength: 0,
  reqLoading: false,
});

export const ResturantProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { fetchResutrants } = useAuthentication();
  const [reqLoading, setReqLoading] = useState(false);
  const [resturantData, setResturnatData] = useState<RestaurantData | null>(
    null,
  );

  useEffect(() => {
    setReqLoading(true);
    async function fetchAllResutrants() {
      const resturants = await fetchResutrants();
      const { body: resturantList } = (await resturants) || { body: [] };
      setResturnatData(resturantList);
      setReqLoading(false);
    }
    fetchAllResutrants();
  }, []);

  return (
    <ResturantContext.Provider
      value={{
        resturantData,
        resurantsLength: 0,
        reqLoading,
      }}
    >
      {children}
    </ResturantContext.Provider>
  );
};

export function useResturnats() {
  return useContext(ResturantContext);
}
