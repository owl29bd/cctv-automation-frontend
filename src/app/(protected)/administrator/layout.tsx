import dynamic from "next/dynamic";

const AdministratorLayout = dynamic(
  () =>
    import("@/components/common/navigation/drawerLayout/AdministratorLayout"),
  {
    ssr: false,
  },
);

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdministratorLayout>{children}</AdministratorLayout>;
}
