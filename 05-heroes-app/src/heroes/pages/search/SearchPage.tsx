import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";

export const SearchPage: React.FC= () => {
  return (
    <>
    <CustomJumbotron
      title="Search Heroes"
      description="Find your favorite superheroes and villains"
    />

    <CustomBreadcrumbs currentPage="Search Heroes" 
    // breadCrumbs={[
    //   {label: 'Home', to: '/'},
    //   {label: 'Home1', to: '/'},
    //   {label: 'Home2', to: '/'}
    // ]}
    />  

    {/* Stats Dashboard */}
    <HeroStats />
  
    {/* Search Controls and filters */}
    <SearchControls />
    </>

  )
}

export default SearchPage;
