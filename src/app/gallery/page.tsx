export default function GalleryPage() {
  return (
    <div>
      <h1>GALLERY</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-gray-300 p-4">
              <img src="/home-img.webp" alt=" 1" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
