import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginationDesign() {
  return (
    <Pagination className="flex">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="hover:bg-blue hover:text-white"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="hover:bg-blue hover:text-white" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="hover:bg-blue hover:text-white"
            href="#"
            isActive
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="hover:bg-blue hover:text-white" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="hover:bg-blue hover:text-white" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
