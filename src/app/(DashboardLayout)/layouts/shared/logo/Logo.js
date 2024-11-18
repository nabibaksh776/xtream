import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="block text-[24px] text-center text-dark"
      style={{ fontWeight: "700", color: "#344054" }}
    >
      ROCKETRAMP AI
    </Link>
  );
};

export default Logo;
