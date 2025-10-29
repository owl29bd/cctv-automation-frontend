import dynamic from "next/dynamic";

const AdminLayout = dynamic(
  () => import("@/components/common/navigation/drawerLayout/AdminLayout"),
  {
    ssr: false,
  },
);

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
