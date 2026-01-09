import SuperheroProfile from "@/heroes/components/SuperheroProfile";
import { useParams } from "react-router";

export const HeroPage = () => {

  const {idSlug = ''} = useParams();
  console.log({idSlug});
  return (
    <SuperheroProfile />
  )
}

export default HeroPage;