import OrdersFeed from "./_components/OrderFeeds";
import SearchBar from "./_components/SearchBar";

export default async function Page({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const { keyword, range } = await params;

  return (
    <div className="px-4 py-6 space-y-4">
      <SearchBar />
      <OrdersFeed keyword={keyword} range={range} />
    </div>
  );
}
