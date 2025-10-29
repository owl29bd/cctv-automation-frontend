import { Button, Typography } from "@mui/material";

import { RouteUrls } from "@/lib/constants/url.config";
import Link from "next/link";

export function Hero() {
  return (
    <div className="bg-gray-50/90">
      <div className="flex flex-col justify-between gap-6 p-6 md:flex-row-reverse md:px-20">
        {/* <object
          data="/onlineLearning.svg"
          type="image/svg+xml"
          className="max-w-2xl"
        /> */}
        {/* <div className="flex max-w-4xl flex-col justify-center gap-4">
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize={{ xs: "2.25rem", sm: "3rem", xl: "3.75rem" }}
          >
            Lorem ipsum dolor sit amet consectetur.
          </Typography>

          <Typography
            variant="subtitle1"
            fontSize={"1.25rem"}
            fontWeight={600}
            color="text.secondary"
            sx={{
              maxWidth: "600px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
            sunt?
          </Typography>

          <Button
            variant="contained"
            LinkComponent={Link}
            href={RouteUrls.dashboard.index}
            fullWidth
            sx={{
              maxWidth: {
                sm: "100%",
                md: 300,
              },
            }}
          >
            Get Started
          </Button>
        </div> */}
      </div>
      {/* <div className="border-gray-200 grid gap-12 border-y px-4 py-10 text-center md:grid-cols-2 md:px-6 lg:grid-cols-3 xl:gap-16 xl:py-16">
        <div className="space-y-2">
          <Typography variant="h5" fontWeight={600}>
            Lorem ipsum dolor sit amet
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.secondary"
          >
            lorem
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography variant="h5" fontWeight={600}>
            Expert Tutors
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.secondary"
          >
            Our tutors are top students from the best universities. They know
            what it takes to succeed and will help you excel.
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography variant="h5" fontWeight={600}>
            Flexible Scheduling
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.secondary"
          >
            Book sessions at your convenience. Whether you need help during the
            day or late at night, we&apos;ve got you covered.
          </Typography>
        </div>
      </div> */}
      <div className="mx-auto flex flex-col items-center gap-2 px-6 py-32 text-center">
        <Typography
          variant="h2"
          fontWeight={700}
          fontSize={{
            xs: "2.25rem",
            sm: "3rem",
            xl: "3.75rem",
          }}
        >
          Start your journey to CCTV Automation
        </Typography>

        <Typography
          variant="subtitle1"
          fontSize={"1.25rem"}
          fontWeight={600}
          color="text.secondary"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          sunt?
        </Typography>

        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          href={RouteUrls.dashboard.index}
          sx={{
            mt: 4,
            maxWidth: 400,
          }}
        >
          Get Started
        </Button>
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi nulla
          quibusdam error non necessitatibus pariatur ea fuga odio fugit beatae,
          natus blanditiis sequi debitis, unde maiores cumque sit tempore
          repellat. Vitae quis expedita debitis, quisquam quaerat esse, libero
          inventore officiis doloribus ducimus similique voluptas nobis eveniet
          reiciendis quibusdam dolores fuga suscipit itaque qui quae. Sapiente
          itaque recusandae vero blanditiis nisi! Est a perspiciatis quos! Quis
          saepe magni quibusdam commodi voluptates dignissimos voluptate quia
          excepturi. Veniam esse, facere, rerum explicabo quasi laborum minus,
          eius nobis exercitationem vel commodi minima et. Id? Cumque laudantium
          maiores expedita quasi repudiandae impedit sequi alias ex deserunt
          fugit corporis nobis, quos et. Nemo tenetur quasi eum temporibus
          repellendus sunt? Officiis esse ex ea sint, pariatur fugit? A nulla
          doloremque aut vel incidunt, ratione aspernatur recusandae
          repudiandae. Eligendi sint ea excepturi atque vel molestias quae quo
          magni reprehenderit provident! Sequi veniam eveniet, tenetur ex
          perferendis cumque aspernatur?
        </Typography>
      </div>
    </div>
  );
}
