import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Art Glass — автоскло у Києві",
    short_name: "Art Glass",
    description:
      "Ремонт сколів і тріщин, полірування скла та фар, захисна плівка у Києві.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C0E",
    theme_color: "#0B0C0E",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
