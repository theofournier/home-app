import NextImage from "next/image";

export default function Home() {
  return (
    <section className="relative h-full">
      <NextImage
        fill
        alt="NextUI hero Image"
        sizes="100vw"
        src="/home-img.jpg"
        style={{
          objectFit: "cover",
        }}
      />
    </section>
  );
}
