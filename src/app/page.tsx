import { PublicHeader } from "@/components/homepage/PublicHeader";
import SigninPage from "./(public)/auth/signin/page";

export default function page() {
  return (
    <div className="flex flex-col ">
      <PublicHeader />
      <SigninPage />
    </div>
  );
}
