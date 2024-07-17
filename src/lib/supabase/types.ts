export interface Photo {
  id: string;
  url: string;
  height: number;
  width: number;
  title?: string;
  description?: string;
  location?: string;
  exposure?: string;
  date?: string;
  tags?: Tag[];
  createdAt: string;
}

export interface Tag {
  value: string;
  description?: string;
}
