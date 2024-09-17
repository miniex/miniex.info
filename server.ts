import { serve } from "bun";
import { join } from "path";
import { readFileSync } from "fs";

const publicDir = join(import.meta.dir, "dist");

serve({
    fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;

        // Serve index.html for root path
        if (path === "/") {
            path = "/index.html";
        }

        const filePath = join(publicDir, path);

        try {
            const file = readFileSync(filePath);
            const ext = path.split(".").pop();
            const contentType =
                {
                    html: "text/html",
                    css: "text/css",
                    js: "application/javascript",
                    png: "image/png",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    gif: "image/gif",
                    svg: "image/svg+xml",
                }[ext] || "application/octet-stream";

            return new Response(file, {
                headers: { "Content-Type": contentType },
            });
        } catch (e) {
            return new Response("Not Found", { status: 404 });
        }
    },
    port: 80,
});

console.log("Server running on http://localhost:80");
