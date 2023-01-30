import { PaginationModel } from "../../Model/PaginationModel";
import { Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
@Injectable()
export class PaginationService {
    private paginationModel: PaginationModel;

    get page(): number {
        return this.paginationModel.pageIndex;
    }

    get selectItemsPerPage(): number[] {
        return this.paginationModel.selectItemsPerPage;
    }

    get pageSize(): number {
        return this.paginationModel.pageSize;
    }

    constructor() {
        this.paginationModel = new PaginationModel();
        this.paginationModel.pageIndex = 0;
        this.paginationModel.pageSize = 5;
        this.paginationModel.selectItemsPerPage = [5, 100, 150, 200];

    }

    change(pageEvent: PageEvent): any {
        this.paginationModel.pageIndex = pageEvent.pageIndex;
        if (this.paginationModel.pageIndex >= 1) {
            this.paginationModel.pageIndex = ((this.paginationModel.pageIndex) * this.paginationModel.pageSize);
        }
        this.paginationModel.pageSize = pageEvent.pageSize;
        this.paginationModel.allItemsLength = pageEvent.length;
        this.paginationModel.selectItemsPerPage = [5, 50, 100, 150, 200];
    }
    resetPage(): any {
        this.paginationModel = new PaginationModel();
        this.paginationModel.pageIndex = 0;
        this.paginationModel.pageSize = 5;
        this.paginationModel.selectItemsPerPage = [5, 50, 100, 150, 200];

    }

}
