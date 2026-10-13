import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const OPTS = { resource_type: "raw", type: "authenticated" } as const;

export const pdfStore = {
    // Upload PDF File
    async put(key: string, bytes: Uint8Array): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { ...OPTS, public_id: key, overwrite: true, invalidate: true },
                (err) => (err ? reject(err) : resolve())
            )
                .end(Buffer.from(bytes))
        });
    },

    // Get PDF File
    async get(key: string): Promise<Uint8Array | null> {
        const url = cloudinary.url(key, { ...OPTS, sign_url: true });
        const res = await fetch(url);

        if (res.status == 404) return null;
        if (!res.ok) throw new Error(`Cloudinary fetch failed: ${res.status}`);

        return new Uint8Array(await res.arrayBuffer());
    },

    // Delete PDF File
    async delete(key: string): Promise<void> {
        await cloudinary.uploader.destroy(key, { ...OPTS, invalidate: true });
    }
}