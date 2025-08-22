import type { Client } from "../utils/types";
import type { SortItem } from "../store/sortSlice"; 

export function applyMultiSort(data: Client[], activeClientType: string, sorts: SortItem[]): Client[] {
    
    let filtered = [...data];
    if (activeClientType !== "All") {
      filtered = filtered.filter((c) => c.clientType === activeClientType);
    }

    return [...filtered].sort((a, b) => {
    for (const sort of sorts) {
      const { key, direction } = sort;

      const aVal = a[key as keyof Client] as string | Date | number;
      const bVal = b[key as keyof Client] as string | Date | number;

      let comparison = 0;

    if (typeof aVal === "string" && typeof bVal === "string") { 
        comparison = aVal.localeCompare(bVal);
    } else if (aVal instanceof Date && bVal instanceof Date) { 
        comparison = aVal.getTime() - bVal.getTime();
    } else if (typeof aVal === "number" && typeof bVal === "number") { 
        comparison = aVal - bVal;
    } else { 
        comparison = 0;
    }

      if (comparison !== 0) {
        return direction === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });
}
