import React, { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationBar = ({
    curPage,
    handleChangePage,
}: {
    curPage: number;
    handleChangePage: (toPage: number) => void;
}) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(curPage);
    }, []);

    function handlePagination(delta: number) {
        setPage((prev: any) => {
            if (prev + delta === 0) return 1;
            handleChangePage(prev + delta);
            return prev + delta;
        });
    }

    return (
        <div className='mb-[20px]'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className='hover:bg-orange cursor-pointer hover:text-white'
                            onClick={() => handlePagination(-1)}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='border border-orange hover:bg-black hover:text-white cursor-pointer'>
                            {page ? page : 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            className='hover:border border-orange hover:bg-black hover:text-white cursor-pointer'
                            onClick={() => handlePagination(1)}>
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            className='hover:bg-orange cursor-pointer hover:text-white'
                            onClick={() => handlePagination(1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationBar;
