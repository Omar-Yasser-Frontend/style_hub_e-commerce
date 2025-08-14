import PrimaryBtn from "../PrimaryBtn";

function JoinCommunity() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-20 px-10"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <h2 className="font-bold text-4xl mb-4">Join Our Community</h2>
      <p className="mb-8 max-w-xl">
        Stay updated on the latest trends, exclusive offers, and style tips.
      </p>
      <PrimaryBtn href="/login">Sign Up</PrimaryBtn>
    </section>
  );
}

export default JoinCommunity;
