import dynamic from "next/dynamic";

const UserLayout = dynamic(
  () => import("@/components/common/navigation/drawerLayout/UserLayout"),
  {
    ssr: false,
  },
);

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayout>{children}</UserLayout>;
}
