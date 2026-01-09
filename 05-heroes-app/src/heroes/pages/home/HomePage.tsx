
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/ui/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { useHomePage } from "@/heroes/hooks/useHomePage";


export const HomePage: React.FC = () => {

  const { selectedTab, page, limit, category, setSearchParams } = useHomePage();
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Superhero Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        <CustomBreadcrumbs currentPage="Super Heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })}
            >All Characters ({summary?.totalHeroes})</TabsTrigger>

            <TabsTrigger value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites');
                return prev;
              })}
              className="flex items-center gap-2">
              Favorites (3)
            </TabsTrigger>

            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes');
              prev.set('category', 'hero');
              prev.set('page', '1');
              return prev;
            })}>Heroes ({summary?.heroCount})</TabsTrigger>

            <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains');
              prev.set('category', 'villain');
              prev.set('page', '1');
              return prev;
            })}>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" >
            {/* Show all heroes */}
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>

          <TabsContent value="favorites" >
            {/* Show favorite heroes */}
            <h1> Favorites </h1>
            <HeroGrid heroes={[]} />
          </TabsContent>

          <TabsContent value="heroes" >
            {/* Show heroes */}
            <h1>Heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>

          <TabsContent value="villains" >
            {/* Show villains */}
            <h1>Villains</h1>
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 0} />

      </>
    </>
  )
}
