import DetailsPage from '@/components/PropartesDetais/DetailsPage';


const PropertyDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log("Property ID from params:", id);
  
    const res = await fetch(`http://localhost:5000/properties/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
const data = await res.json();
  if (!data) {
    return (
      <div className="w-full min-h-screen bg-[#040605] flex items-center justify-center text-white">
        <p className="text-xl">Property details not found or failed to load!</p>
      </div>
    );
  }
  return (
    <div>
      <DetailsPage data={data} />
    </div>
  );
};

export default PropertyDetailsPage;