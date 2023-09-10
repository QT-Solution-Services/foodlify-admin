import AppLayout from "@/components/layouts/AppLayout";
import ResturantItem from "./ResturantItem";
import { formatResturantData } from "@/utils/Helper";
import resturnatData from "@/constant/Data/resturantsData";
import useAuthentication from "@/hooks/useAuthentication";
import { useResturnats } from "@/contexts/ResturantsContext";

interface RestaurantData {
  body: any[];
  message: string;
}

function Index() {
  const { resturantData, reqLoading: loading } = useResturnats();

  // const [resturantData, setResturnatData] = useState<RestaurantData | null>(
  //   null,
  // );
  // useEffect(function () {
  //   async function fetchAllResutrants() {
  //     const resturants = await fetchResutrants();
  //     setResturnatData(resturants);
  //   }
  //   fetchAllResutrants();
  // }, []);

  // const { body: resturantList } = resturantData || { body: [] };

  const formatedData =
    resturantData !== null && resturantData.length > 0
      ? resturantData.map((resturant, i) => formatResturantData(resturant))
      : [];

  return (
    <AppLayout pageTitle="Lists of Resturants">
      {loading ? (
        <>
          {[...Array(8)].map((_, idx) => {
            return (
              <div
                key={idx}
                className="mb-3 h-24 w-full animate-pulse rounded-md bg-yellow-400/20 p-8"
              ></div>
            );
          })}
        </>
      ) : (
        <ul className=" divide-y divide-yellow-400 pb-20">
          {formatedData.map((resturant) => (
            <ResturantItem {...resturant} key={resturant.id} />
          ))}
        </ul>
      )}
      {!loading && formatedData.length === 0 && <p>No restaurants found</p>}
    </AppLayout>
  );
}

export default Index;
