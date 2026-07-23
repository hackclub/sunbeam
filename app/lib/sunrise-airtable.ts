import "server-only";

export type ScreenshotUpload = {
	/** base64-encoded file contents, with no `data:` URI prefix */
	file: string;
	filename: string;
	contentType: string;
};

export function isScreenshotUpload(value: unknown): value is ScreenshotUpload {
	return (
		!!value &&
		typeof value === "object" &&
		typeof (value as ScreenshotUpload).file === "string" &&
		(value as ScreenshotUpload).file.length > 0 &&
		typeof (value as ScreenshotUpload).filename === "string" &&
		typeof (value as ScreenshotUpload).contentType === "string"
	);
}

/**
 * Uploads a base64 image to an attachment field on an existing record using
 * Airtable's upload-attachment content API. Returns true on success.
 */
export async function uploadScreenshotAttachment(opts: {
	baseId: string;
	recordId: string;
	pat: string;
	screenshot: ScreenshotUpload;
	fieldName?: string;
}): Promise<boolean> {
	const field = opts.fieldName ?? "Screenshot";

	const res = await fetch(
		`https://content.airtable.com/v0/${opts.baseId}/${opts.recordId}/${encodeURIComponent(field)}/uploadAttachment`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${opts.pat}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contentType: opts.screenshot.contentType,
				file: opts.screenshot.file,
				filename: opts.screenshot.filename,
			}),
		},
	);

	if (!res.ok) {
		const err = await res.text();
		console.error("[sunrise-airtable] screenshot upload failed:", res.status, err);
		return false;
	}

	return true;
}
