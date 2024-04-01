export type TFoundItem = {
  categoryId: string;
  foundItemName: string;
  location: string;
  description: string;
};


export type TItemFilter = {
  searchTerm?: string;
  page?: string;
  limit?:string;
  foundItemName?: string;
  sortBy?: "foundItemName" | "category" | "foundDate";
  sortOrder?: "asc" | "desc" 

}