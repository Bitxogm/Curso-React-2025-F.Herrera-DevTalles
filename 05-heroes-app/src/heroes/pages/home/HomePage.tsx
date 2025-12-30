
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/ui/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";


export const HomePage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "heroes" | "villains">("all")
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Superhero Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        <CustomBreadcrumbs currentPage="Super Heroes"/>

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setActiveTab("all")}
            >All Characters (16)</TabsTrigger>

            <TabsTrigger value="favorites"
              onClick={() => setActiveTab("favorites")}
              className="flex items-center gap-2">
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActiveTab("villains")}>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all" >
            {/* Show all heroes */}
            <HeroGrid />
          </TabsContent>

          <TabsContent value="favorites" >
            {/* Show favorite heroes */}
            <h1> Favorites </h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="heroes" >
            {/* Show heroes */}
            <h1>Heroes</h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="villains" >
            {/* Show villains */}
            <h1>Villains</h1>
            <HeroGrid />
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8}/>

      </>
    </>
  )
}
