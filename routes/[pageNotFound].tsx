import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { HeadElement } from "../components/HeadElement.tsx";
import { Header } from "../components/Header.tsx";
import PageNotFoundCounter from "../islands/PageNotFoundCounter.tsx";
import { graphqlClient } from "../utils/graphql.ts";

const q = `query {
    page (id:"UGFnZTox") {
      title
      content
    }
  }`;

export const handler: Handlers = {
	async GET(_req, ctx) {
		const data = await graphqlClient(q);
		return ctx.render(data);
	},
};

export default function RandomPage(ctx: PageProps) {
	const {
		data: {
			page: { title, content },
		},
		url,
	} = ctx;

	const formattedContent = JSON.parse(content);
	const notFoundMessage = formattedContent.blocks[0]?.data?.text;

	return (
		<div>
			<HeadElement description="Demo for Saleor Merch, powered by Deno" image={url.href + "og-image.png"} title="Saleor + Deno merch demo" url={url} />
			<Header />
			<div class="w-11/12 max-w-5xl mx-auto mt-28">
				<div class="text-center">
					<span class="text-bold text-2xl">{title}</span>
				</div>
				<div class="text-center mt-6">
					<span class="text-bold text-1xl">{notFoundMessage ?? "You are not supposed to be here"}</span>
				</div>
				<div class="flex justify-center mt-12">
					<PageNotFoundCounter initialSeconds={15}  />
				</div>
			</div>
			<Footer />
		</div>
	);
}
