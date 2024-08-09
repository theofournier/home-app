export type NextPageProps<
  T = { [key: string]: string | string[] | undefined }
> = {
  params: { id: string };
  searchParams: T;
};
