export interface ChangeChildItemOrder {
  id: number;
  newOrder: number;
}

export interface ChildItem {
  id: number;
  name: string;
  order: number;
}

export interface CreateChildItem {
  name: string;
  parentId: number;
}

export interface UpdateChildItem {
  name: string;
}

export interface ChangeParentItemOrder {
  id: number;
  newOrder: number;
}

export interface CreateParentItem {
  name: string;
}

export interface ParentItem {
  id: number;
  name: string;
  order: number;
  childCount: number;
}

export interface UpdateParentItem {
  name: string;
}
