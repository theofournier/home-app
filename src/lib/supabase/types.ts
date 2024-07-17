export interface Photo {
  id: string;
  url: string;
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
