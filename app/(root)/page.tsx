import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY)
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name:"his" },
  //     _id: 1,
  //     description: "This is description",
  //     image:
  //       "https://media.istockphoto.com/id/2149530993/photo/digital-human-head-concept-for-ai-metaverse-and-facial-recognition-technology.jpg?s=612x612&w=0&k=20&c=IduORJUs1c1s0m2SXQANsK8IUhtlz8QApsLxNYOYrXQ=",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  console.log(JSON.stringify(posts, null, 2))
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connecy With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post:StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
