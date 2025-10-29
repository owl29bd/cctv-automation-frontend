import dynamic from "next/dynamic";

const ServiceProviderLayout = dynamic(
  () =>
    import("@/components/common/navigation/drawerLayout/ServiceProviderLayout"),
  {
    ssr: false,
  },
);

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceProviderLayout>{children}</ServiceProviderLayout>;
}
