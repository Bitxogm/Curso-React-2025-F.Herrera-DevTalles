import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useSearchParams } from "react-router";

interface Props {
  // Define any props if needed
  totalPages: number;
}

export const CustomPagination: React.FC<Props> = ({ totalPages }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const queryPages = searchParams.get('page') ?? '1';
  const page = isNaN(+queryPages) ? 1 : +queryPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }




  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      {
        Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={index + 1 === page ? "default" : "outline"} size="sm"
            onClick={() => handlePageChange(index + 1)}
            >
            {index + 1}
          </Button>
        ))
      }

      <Button variant="outline" size="sm" disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
